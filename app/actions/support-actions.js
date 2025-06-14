"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function createSupportTicket(formData) {
  try {
    // Extract and validate form data
    const ticketData = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      category: formData.get("category")?.toString(),
      priority: formData.get("priority")?.toString(),
      message: formData.get("message")?.toString().trim(),
      order_number: formData.get("orderNumber")?.toString().trim() || null,
    }

    console.log("Processing support ticket:", ticketData)

    // Basic validation
    if (!ticketData.name || !ticketData.email || !ticketData.message || !ticketData.category || !ticketData.priority) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(ticketData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Check for duplicate submissions (same email and message in last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { data: existingTicket } = await supabase
      .from("support_tickets")
      .select("id")
      .eq("email", ticketData.email)
      .eq("message", ticketData.message)
      .gte("created_at", fiveMinutesAgo)
      .maybeSingle()

    if (existingTicket) {
      return {
        success: false,
        message: "A similar ticket was recently submitted. Please wait before submitting again.",
      }
    }

    // Generate a unique ticket number
    const ticketNumber = `MERQ-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    // Store in Supabase database
    const { data, error } = await supabase
      .from("support_tickets")
      .insert([
        {
          ...ticketData,
          ticket_number: ticketNumber,
          status: "open",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database insertion error:", error)
      return {
        success: false,
        message: "Failed to save ticket. Please try again later.",
      }
    }

    console.log("Support ticket created successfully:", data)

    return {
      success: true,
      message: `Support ticket #${ticketNumber} created successfully! We'll get back to you within 24 hours.`,
      ticketId: data.id,
      ticketNumber: ticketNumber,
    }
  } catch (error) {
    console.error("Unexpected error creating support ticket:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

// Function to get all support tickets (for future admin dashboard)
export async function getAllSupportTickets() {
  try {
    const { data, error } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching support tickets:", error)
      return {
        success: false,
        message: "Failed to fetch tickets",
        tickets: [],
      }
    }

    return {
      success: true,
      tickets: data,
    }
  } catch (error) {
    console.error("Unexpected error fetching tickets:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
      tickets: [],
    }
  }
}

// Function to update ticket status (for future admin dashboard)
export async function updateTicketStatus(ticketId, status) {
  try {
    const { data, error } = await supabase
      .from("support_tickets")
      .update({
        status: status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", ticketId)
      .select()
      .single()

    if (error) {
      console.error("Error updating ticket status:", error)
      return {
        success: false,
        message: "Failed to update ticket status",
      }
    }

    return {
      success: true,
      message: "Ticket status updated successfully",
      ticket: data,
    }
  } catch (error) {
    console.error("Unexpected error updating ticket:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}
