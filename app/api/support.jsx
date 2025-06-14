export async function createTicket(formData) {
  try {
    // Extract form data
    const ticket = {
      name: formData.get("name"),
      email: formData.get("email"),
      category: formData.get("category"),
      priority: formData.get("priority"),
      message: formData.get("message"),
      orderNumber: formData.get("orderNumber"),
      timestamp: new Date().toISOString(),
    }

    // Create ticket in tawk.to
    const tawkResponse = await fetch(`${process.env.TAWK_TO_BASE_URL}/tickets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TAWK_TO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propertyId: process.env.TAWK_TO_PROPERTY_ID,
        subject: `${ticket.category.toUpperCase()}: Support Request from ${ticket.name}`,
        message: ticket.message,
        requesterName: ticket.name,
        requesterEmail: ticket.email,
        priority: ticket.priority,
        tags: [ticket.category, ticket.priority],
        customFields: {
          orderNumber: ticket.orderNumber || "N/A",
          category: ticket.category,
          submittedAt: ticket.timestamp,
        },
      }),
    })

    if (!tawkResponse.ok) {
      const errorData = await tawkResponse.json()
      throw new Error(`tawk.to API error: ${errorData.message || "Unknown error"}`)
    }

    const tawkData = await tawkResponse.json()

    // Store backup in your database (optional)
    try {
      const backupResponse = await fetch("/api/support/backup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...ticket,
          tawkTicketId: tawkData.id,
        }),
      })
    } catch (backupError) {
      console.warn("Failed to create backup:", backupError)
      // Don't fail the main request if backup fails
    }

    return {
      success: true,
      message: "Support ticket created successfully",
      ticketId: tawkData.id,
    }
  } catch (error) {
    console.error("Error creating ticket:", error)
    return {
      success: false,
      message: "Failed to create ticket. Please try again later.",
    }
  }
}
