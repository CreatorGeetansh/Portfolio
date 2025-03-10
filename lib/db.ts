import { MongoClient, type Db, ObjectId } from "mongodb"

// MongoDB connection configuration
const MONGODB_URI = "mongodb+srv://geetanshmehta4:Geetansh123@cluster0.fy3z8.mongodb.net/"
const MONGODB_DB = "newtest1"

// Connection cache
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

// Connect to MongoDB
export async function connectToDatabase(): Promise<Db | null> {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return cachedDb
  }

  // Validate connection string
  if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable")
    return null
  }

  if (!MONGODB_DB) {
    console.error("Please define the MONGODB_DB environment variable")
    return null
  }

  try {
    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI, {
      // Add your MongoDB connection options here
    })

    await client.connect()
    const db = client.db(MONGODB_DB)

    // Cache the connection
    cachedClient = client
    cachedDb = db

    return db
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    return null
  }
}

// Contact message functions
export async function saveContactMessage(db: Db, message: any) {
  return await db.collection("messages").insertOne(message)
}

export async function getContactMessages(db: Db, limit = 10) {
  return await db.collection("messages").find({}).limit(limit).sort({ createdAt: -1 }).toArray()
}

export async function markMessageAsRead(db: Db, id: string) {
  return await db.collection("messages").updateOne({ _id: new ObjectId(id) }, { $set: { read: true } })
}

interface Subscriber {
  id: string
  email: string
  createdAt: Date
}

// In-memory chat session storage (could be moved to MongoDB in a production app)
interface ChatMessage {
  role: "user" | "bot"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: Date
  lastActive: Date
}

// In-memory storage for chat sessions
const chatSessions: ChatSession[] = []

// Generate a simple ID
const generateId = () => Math.random().toString(36).substring(2, 15)

// Subscriber functions
export const addSubscriber = (email: string): Subscriber => {
  // Check if already exists
  const existing = db.subscribers.find((s) => s.email === email)
  if (existing) {
    return existing
  }

  const newSubscriber = {
    id: generateId(),
    email,
    createdAt: new Date(),
  }

  db.subscribers.push(newSubscriber)
  return newSubscriber
}

export const getSubscribers = (): Subscriber[] => {
  return [...db.subscribers]
}

// Chat session functions
export const createChatSession = (): ChatSession => {
  const newSession = {
    id: generateId(),
    messages: [
      {
        role: "bot" as const,
        content: "Hi there! I'm Geetansh's AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ],
    createdAt: new Date(),
    lastActive: new Date(),
  }

  chatSessions.push(newSession)
  return newSession
}

export const getChatSession = (id: string): ChatSession | undefined => {
  return chatSessions.find((s) => s.id === id)
}

export const addMessageToChatSession = (
  sessionId: string,
  role: "user" | "bot",
  content: string,
): ChatSession | undefined => {
  const session = chatSessions.find((s) => s.id === sessionId)
  if (session) {
    session.messages.push({
      role,
      content,
      timestamp: new Date(),
    })
    session.lastActive = new Date()
    return session
  }
  return undefined
}

// Initialize with a sample chat session
createChatSession()

// This is a simple in-memory database for demonstration
// In a production app, you would use a real database like MongoDB, PostgreSQL, etc.

interface Message {
  id: string
  name: string
  email: string
  message: string
  createdAt: Date
  read: boolean
}

// In-memory storage
const db = {
  messages: [] as Message[],
  subscribers: [] as Subscriber[],
}

// Message functions
export const saveMessage = (name: string, email: string, message: string): Message => {
  const newMessage = {
    id: generateId(),
    name,
    email,
    message,
    createdAt: new Date(),
    read: false,
  }

  db.messages.push(newMessage)
  return newMessage
}

export const getMessages = (): Message[] => {
  return [...db.messages].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export const markMessageAsReadOld = (id: string): boolean => {
  const message = db.messages.find((m) => m.id === id)
  if (message) {
    message.read = true
    return true
  }
  return false
}

// For demonstration purposes, let's add some initial data
// In a real app, you would load this from a database
const initializeDb = () => {
  // Add some sample messages
  saveMessage(
    "John Doe",
    "john@example.com",
    "I love your portfolio! Would you be interested in collaborating on a project?",
  )
  saveMessage(
    "Jane Smith",
    "jane@example.com",
    "We have an opening for a senior developer position. Would you like to discuss?",
  )

  // Add some sample subscribers
  addSubscriber("subscriber1@example.com")
  addSubscriber("subscriber2@example.com")
}

// Initialize the database with sample data
initializeDb()

