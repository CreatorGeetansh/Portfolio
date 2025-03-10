import { NextResponse } from "next/server"
import { createChatSession, getChatSession, addMessageToChatSession } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, message } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get or create chat session
    let session
    if (sessionId) {
      session = getChatSession(sessionId)
      if (!session) {
        session = createChatSession()
      }
    } else {
      session = createChatSession()
    }

    // Add user message to session
    addMessageToChatSession(session.id, "user", message)

    // Query the FastAPI server
    try {
      const fastApiResponse = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
          session_id: session.id,
        }),
      })

      if (!fastApiResponse.ok) {
        throw new Error(`FastAPI server responded with status: ${fastApiResponse.status}`)
      }

      const data = await fastApiResponse.json()
      const botResponse = data.answer || "Sorry, I couldn't process your request."

      // Add bot response to session
      addMessageToChatSession(session.id, "bot", botResponse)

      return NextResponse.json(
        {
          response: botResponse,
          sessionId: session.id,
        },
        { status: 200 },
      )
    } catch (error) {
      console.error("Error querying FastAPI server:", error)
      const fallbackResponse = "I'm having trouble connecting to my knowledge base. Please try again later."

      // Add fallback response to session
      addMessageToChatSession(session.id, "bot", fallbackResponse)

      return NextResponse.json(
        {
          response: fallbackResponse,
          sessionId: session.id,
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Error in chatbot API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

// GET endpoint to retrieve chat history
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    const session = getChatSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    return NextResponse.json({ session }, { status: 200 })
  } catch (error) {
    console.error("Error retrieving chat session:", error)
    return NextResponse.json({ error: "Failed to retrieve chat session" }, { status: 500 })
  }
}

