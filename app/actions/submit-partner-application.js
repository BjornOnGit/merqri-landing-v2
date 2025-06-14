"use server"

import { createServerClient } from "../lib/supabase"
import { z } from "zod"

const partnerApplicationSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  serviceAreas: z.string().min(2, "Please specify your service areas"),
  companySize: z.string().min(1, "Please select your company size"),
  services: z.array(z.string()).min(1, "You must select at least one service"),
  fleetSize: z.string().min(1, "Please select your fleet size"),
  yearsInBusiness: z.string().min(1, "Please select years in business"),
  insurance: z.boolean().refine((val) => val === true, "Insurance is required to partner with MerQri"),
  cacNumber: z.string().min(2, "Please provide your CAC business ID number"),
  additionalInfo: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
})

export async function submitPartnerApplication(formData) {
  try {
    // Validate the form data
    const validatedData = partnerApplicationSchema.parse(formData)

    const supabase = createServerClient()

    // Check if an application with this email already exists
    const { data: existingApplication, error: checkError } = await supabase
      .from("partner_applications")
      .select("id, email")
      .eq("email", validatedData.email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected if no existing application
      console.error("Error checking existing application:", checkError)
      return {
        success: false,
        error: "An error occurred while processing your application. Please try again.",
      }
    }

    if (existingApplication) {
      return {
        success: false,
        error:
          "An application with this email address already exists. Please contact us if you need to update your application.",
      }
    }

    // Insert the new application
    const { data, error } = await supabase
      .from("partner_applications")
      .insert({
        company_name: validatedData.companyName,
        contact_name: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        website: validatedData.website || null,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        zip: validatedData.zip,
        service_areas: validatedData.serviceAreas,
        company_size: validatedData.companySize,
        services: validatedData.services,
        fleet_size: validatedData.fleetSize,
        years_in_business: validatedData.yearsInBusiness,
        has_insurance: validatedData.insurance,
        cac_number: validatedData.cacNumber,
        additional_info: validatedData.additionalInfo || null,
        terms_accepted: validatedData.termsAccepted,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Error inserting application:", error)
      return {
        success: false,
        error: "Failed to submit your application. Please try again.",
      }
    }

    // TODO: Send email notification to admin and applicant
    // You can add email notification logic here

    return {
      success: true,
      data: data,
      message:
        "Thank you for your interest in partnering with MerQri. We'll review your application and contact you soon.",
    }
  } catch (error) {
    console.error("Validation or processing error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Please check your form data and try again.",
        validationErrors: error.errors,
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
