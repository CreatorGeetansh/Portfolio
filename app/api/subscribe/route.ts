import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { sendSubscriptionConfirmation } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate the request
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
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

    // Check if email already exists
    const existingSubscriber = await db.collection("subscribers").findOne({ email })

    let subscriberId

    if (existingSubscriber) {
      subscriberId = existingSubscriber._id
    } else {
      // Add subscriber to database
      const result = await db.collection("subscribers").insertOne({
        email,
        createdAt: new Date(),
      })
      subscriberId = result.insertedId
    }

    // Send confirmation email
    const emailSent = await sendSubscriptionConfirmation(email)

    return NextResponse.json(
      {
        success: true,
        message: "Subscription successful",
        emailSent,
        subscriberId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing subscription:", error)
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 })
  }
}

// GET endpoint to retrieve subscribers (would be protected in a real app)
export async function GET() {
  try {
    // In a real app, you would authenticate this request
    // and only allow authorized users to access subscriber list

    const db = await connectToDatabase()
    if (!db) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    const subscribers = await db.collection("subscribers").find({}).toArray()

    return NextResponse.json(
      {
        count: subscribers.length,
        subscribers,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error retrieving subscribers:", error)
    return NextResponse.json({ error: "Failed to retrieve subscribers" }, { status: 500 })
  }
}

