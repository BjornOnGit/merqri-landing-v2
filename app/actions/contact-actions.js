"use server"

import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

// Initialize Supabase client with service role key
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Generate a unique contact reference number
function generateContactNumber() {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CONT-${timestamp}-${random}`
}

export async function submitContactForm(formData) {
  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    console.log("Processing contact form submission for:", rawData.email)

    // Validate the data
    const validatedData = contactSchema.parse(rawData)

    // Check for duplicate submissions in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

    const { data: existingMessage } = await supabase
      .from("contact_messages")
      .select("id")
      .eq("email", validatedData.email)
      .gte("created_at", fiveMinutesAgo)
      .limit(1)

    if (existingMessage && existingMessage.length > 0) {
      return {
        success: false,
        message: "You've already submitted a message recently. Please wait before submitting again.",
      }
    }

    // Generate contact reference number
    const contactNumber = generateContactNumber()

    // Insert contact message into Supabase
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          contact_number: contactNumber,
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          message: validatedData.message,
          source: "contact_form",
          status: "new",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error("Failed to save contact message")
    }

    console.log("Contact message saved successfully:", data[0].id)

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you as soon as possible.",
      contactNumber: contactNumber,
      messageId: data[0].id,
    }
  } catch (error) {
    console.error("Contact form submission error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      }
    }

    return {
      success: false,
      message: "Failed to send your message. Please try again later.",
    }
  }
}

// Function to get contact messages (for future admin dashboard)
export async function getContactMessages(limit = 50, offset = 0) {
  try {
    const { data, error, count } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return {
      success: true,
      data,
      total: count,
    }
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return {
      success: false,
      message: "Failed to fetch contact messages",
    }
  }
}

// Function to update message status (for admin dashboard)
export async function updateContactMessageStatus(messageId, status) {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", messageId)
      .select()

    if (error) throw error

    return {
      success: true,
      data: data[0],
    }
  } catch (error) {
    console.error("Error updating message status:", error)
    return {
      success: false,
      message: "Failed to update message status",
    }
  }
}
