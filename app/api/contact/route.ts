import { NextResponse } from "next/server"
import { connectToDatabase, saveContactMessage } from "@/lib/db"
import { sendContactNotification } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate the request
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Connect to MongoDB
    const db = await connectToDatabase()
    if (!db) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Save the message to MongoDB
    const savedMessage = await saveContactMessage(db, {
      name,
      email,
      message,
      createdAt: new Date(),
      read: false,
    })

    // Send email notifications
    const emailSent = await sendContactNotification(name, email, message)

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully",
        emailSent,
        messageId: savedMessage.insertedId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}

// GET endpoint to retrieve messages (would be protected in a real app)
export async function GET(request: Request) {
  try {
    // In a real app, you would authenticate this request
    // and only allow authorized users to access messages

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const db = await connectToDatabase()
    if (!db) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    const messages = await db.collection("messages").find({}).limit(limit).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ messages }, { status: 200 })
  } catch (error) {
    console.error("Error retrieving messages:", error)
    return NextResponse.json({ error: "Failed to retrieve messages" }, { status: 500 })
  }
}

