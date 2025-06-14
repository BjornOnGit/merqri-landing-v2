"use client"
import { useState } from "react"
import { createSupportTicket } from "../actions/support-actions"
import useToast from "./ui/use-toast"
import { Loader2 } from "lucide-react"
import { Button } from "../components/ui/button"

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low - General Inquiry" },
  { value: "medium", label: "Medium - Service Issue" },
  { value: "high", label: "High - Urgent Problem" },
]

const CATEGORY_OPTIONS = [
  { value: "booking", label: "Booking Issues" },
  { value: "payment", label: "Payment Problems" },
  { value: "service", label: "Service Quality" },
  { value: "technical", label: "Technical Issues" },
  { value: "other", label: "Other" },
]

export default function SupportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.target)
      const response = await createSupportTicket(formData)

      if (response.success) {
        toast({
          title: "Ticket Created Successfully! 🎉",
          description: response.message,
        })
        event.target.reset()
      } else {
        throw new Error(response.message || "Something went wrong")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto pt-16 px-8">
      <div className="flex justify-between items-center mb-12">
        <div className="text-sm">
          Need immediate help?{" "}
          <a href="tel:+1234567890" className="text-[#FF7A00] font-medium">
            Call Us
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Support Request</h1>
          <p className="text-gray-500">We&apos;re here to help you with any issues</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
              Issue Category *
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
            >
              <option value="">Select a category</option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-900 mb-2">
              Priority Level *
            </label>
            <select
              id="priority"
              name="priority"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
            >
              <option value="">Select priority</option>
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
              Description *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
              placeholder="Please describe your issue in detail"
            />
          </div>

          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-900 mb-2">
              Order Number (Optional)
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
              placeholder="Enter your order number if applicable"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FF7A00] text-white py-3 rounded-lg hover:bg-[#e66f00] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Ticket"
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            💬 <strong>Need instant help?</strong> Use our live chat widget in the bottom right corner for immediate
            assistance!
          </p>
        </div>
      </div>
    </div>
  )
}
