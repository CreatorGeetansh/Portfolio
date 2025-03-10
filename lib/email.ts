// Email service for sending notifications
// In a real app, you would use a service like SendGrid, Mailgun, etc.

interface EmailOptions {
  to: string
  subject: string
  body: string
  isHtml?: boolean
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  // This is a mock implementation
  // In a real app, you would integrate with an email service

  console.log("Sending email:")
  console.log("To:", options.to)
  console.log("Subject:", options.subject)
  console.log("Body:", options.body)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulate success (or you could randomly fail for testing)
  return Math.random() > 0.1 // 90% success rate
}

export const sendContactNotification = async (name: string, email: string, message: string): Promise<boolean> => {
  // Email to the site owner
  const ownerNotification = await sendEmail({
    to: "geetansh@example.com", // Site owner's email
    subject: `New contact form submission from ${name}`,
    body: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    isHtml: true,
  })

  // Confirmation email to the sender
  const senderConfirmation = await sendEmail({
    to: email,
    subject: "Thank you for contacting Geetansh",
    body: `
      <h2>Thank you for reaching out!</h2>
      <p>Hi ${name},</p>
      <p>I've received your message and will get back to you as soon as possible.</p>
      <p>Here's a copy of your message:</p>
      <p><em>${message}</em></p>
      <p>Best regards,<br>Geetansh</p>
    `,
    isHtml: true,
  })

  return ownerNotification && senderConfirmation
}

export const sendSubscriptionConfirmation = async (email: string): Promise<boolean> => {
  return sendEmail({
    to: email,
    subject: "Welcome to Geetansh's Newsletter",
    body: `
      <h2>Thank you for subscribing!</h2>
      <p>You'll now receive updates about my latest projects, blog posts, and more.</p>
      <p>If you didn't subscribe to this newsletter, please ignore this email.</p>
      <p>Best regards,<br>Geetansh</p>
    `,
    isHtml: true,
  })
}

