export async function sendContactMessage(formData) {
  try {
    // Extract form data
    const message = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      timestamp: new Date().toISOString(),
    }

    // Here you would integrate with your email service or CRM
    // Example using a generic API endpoint:
    const response = await fetch(`https://api.example.com/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      throw new Error("Failed to send message")
    }

    // You might want to store the message in your database as well
    // await prisma.contactMessage.create({ data: message })

    return {
      success: true,
      message: "Message sent successfully",
    }
  } catch (error) {
    console.error("Error sending message:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}

