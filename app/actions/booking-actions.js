"use server"

import { createServerClient } from "../lib/supabase"
import { z } from "zod"

const personalDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
})

const destinationsSchema = z.object({
  pickupAddress: z.string().min(1, "Pickup address is required"),
  pickupCity: z.string().min(1, "Pickup city is required"),
  pickupState: z.string().min(1, "Pickup state is required"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  deliveryCity: z.string().min(1, "Delivery city is required"),
  deliveryState: z.string().min(1, "Delivery state is required"),
  deliveryDate: z.string().min(1, "Delivery date is required"),
  deliveryTime: z.string().min(1, "Delivery time is required"),
  moveType: z.enum(["local", "interstate", "international"]),
  itemsDescription: z.string().optional(),
  specialInstructions: z.string().optional(),
})

export async function createBooking(personalData, destinations) {
  try {
    // Validate the data
    const validatedPersonalData = personalDataSchema.parse(personalData)
    const validatedDestinations = destinationsSchema.parse(destinations)

    const supabase = createServerClient()

    // Create the booking record
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        first_name: validatedPersonalData.firstName,
        last_name: validatedPersonalData.lastName,
        email: validatedPersonalData.email,
        phone: validatedPersonalData.phone,
        pickup_address: validatedDestinations.pickupAddress,
        pickup_city: validatedDestinations.pickupCity,
        pickup_state: validatedDestinations.pickupState,
        pickup_date: validatedDestinations.pickupDate,
        pickup_time: validatedDestinations.pickupTime,
        delivery_address: validatedDestinations.deliveryAddress,
        delivery_city: validatedDestinations.deliveryCity,
        delivery_state: validatedDestinations.deliveryState,
        delivery_date: validatedDestinations.deliveryDate,
        delivery_time: validatedDestinations.deliveryTime,
        move_type: validatedDestinations.moveType,
        items_description: validatedDestinations.itemsDescription || "",
        special_instructions: validatedDestinations.specialInstructions || "",
        booking_status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: "Failed to create booking" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Booking creation error:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid form data", details: error.errors }
    }
    return { success: false, error: "Failed to create booking" }
  }
}

export async function updatePaymentStatus(bookingId, paymentData) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("bookings")
      .update({
        payment_status: paymentData.status,
        payment_reference: paymentData.reference,
        paystack_reference: paymentData.paystackReference,
        booking_status: paymentData.status === "completed" ? "confirmed" : "pending",
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId)
      .select()
      .single()

    if (error) {
      console.error("Payment update error:", error)
      return { success: false, error: "Failed to update payment status" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Payment update error:", error)
    return { success: false, error: "Failed to update payment status" }
  }
}

export async function getBooking(bookingId) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.from("bookings").select("*").eq("id", bookingId).single()

    if (error) {
      console.error("Get booking error:", error)
      return { success: false, error: "Booking not found" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Get booking error:", error)
    return { success: false, error: "Failed to get booking" }
  }
}
