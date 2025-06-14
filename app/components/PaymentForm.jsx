"use client"
import { useState } from "react"
import { usePaystackPayment } from "react-paystack"
import { useBooking } from "../contexts/BookingContext"
import { updatePaymentStatus } from "@/app/actions/booking-actions"

const PaymentCard = ({ isSelected, onClick, cardType, lastDigits }) => (
  <div
    onClick={onClick}
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      isSelected ? "border-[#FF7A00] bg-orange-50" : "border-gray-200 hover:border-[#FF7A00]"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 rounded-full border-2 ${isSelected ? "border-[#FF7A00] bg-[#FF7A00]" : "border-gray-300"}`}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{cardType}</span>
        <span className="text-sm text-gray-500">****{lastDigits}</span>
      </div>
    </div>
  </div>
)

const InputField = ({ label, placeholder, type = "text", value, onChange, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? "border-red-500" : "border-gray-200"
      } focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
)

export default function PaymentForm({ goToNextStep }) {
  const { state, dispatch } = useBooking()
  const { personalData, payment, bookingId } = state

  const [paymentMethod, setPaymentMethod] = useState("new")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const config = {
    reference: new Date().getTime().toString(),
    email: personalData.email,
    amount: payment.amount * 100, // Amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  }

  const onSuccess = async (reference) => {
    console.log("Payment successful!", reference)
    setIsProcessing(true)

    try {
      // Update payment status in Supabase
      const result = await updatePaymentStatus(bookingId, {
        status: "completed",
        reference: reference.reference,
        paystackReference: reference.trans,
      })

      if (result.success) {
        dispatch({
          type: "UPDATE_PAYMENT",
          payload: {
            status: "completed",
            reference: reference.reference,
            paystackReference: reference.trans,
          },
        })
        goToNextStep()
      } else {
        console.error("Failed to update payment status:", result.error)
        // Handle error - maybe show a toast
      }
    } catch (error) {
      console.error("Error updating payment status:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const onClose = () => {
    console.log("Payment closed")
    // Handle payment modal close
  }

  const initializePayment = usePaystackPayment(config)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation for new card
    if (paymentMethod === "new") {
      const newErrors = {}
      if (!cardNumber) newErrors.cardNumber = "Card number is required"
      if (!expiryDate) newErrors.expiryDate = "Expiry date is required"
      if (!cvv) newErrors.cvv = "CVV is required"
      if (!cardName) newErrors.cardName = "Cardholder name is required"

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
    }

    // Initialize Paystack payment
    initializePayment(onSuccess, onClose)
  }

  if (isProcessing) {
    return (
      <div className="max-w-xl mx-auto pt-16 px-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment...</h2>
          <p className="text-gray-500">Please wait while we confirm your payment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto pt-16 px-8">
      <div className="flex justify-end mb-12">
        <div className="text-sm">
          Having issues?{" "}
          <a href="#" className="text-[#FF7A00] font-medium">
            Get Help
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Make Payment</h1>
          <p className="text-gray-500">Use Debit or Credit Card</p>
        </div>

        <div className="mb-8 space-y-3">
          <PaymentCard
            isSelected={paymentMethod === "saved"}
            onClick={() => setPaymentMethod("saved")}
            cardType="Visa"
            lastDigits="4242"
          />
          <PaymentCard
            isSelected={paymentMethod === "new"}
            onClick={() => setPaymentMethod("new")}
            cardType="Add new card"
            lastDigits=""
          />
        </div>

        {paymentMethod === "new" && (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Card Number"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={setCardNumber}
              error={errors.cardNumber}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Expiry Date"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={setExpiryDate}
                error={errors.expiryDate}
              />
              <InputField
                label="CVV"
                placeholder="123"
                type="password"
                value={cvv}
                onChange={setCvv}
                error={errors.cvv}
              />
            </div>

            <InputField
              label="Cardholder Name"
              placeholder="Enter cardholder name"
              value={cardName}
              onChange={setCardName}
              error={errors.cardName}
            />

            <div className="mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#FF7A00] focus:ring-[#FF7A00]" />
                <span className="ml-2 text-sm text-gray-600">Save card for future payments</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF7A00] text-white py-3 rounded-lg mb-6 hover:bg-[#e66f00] transition-colors"
            >
              Pay ₦{(payment.amount / 100).toLocaleString()}
            </button>
          </form>
        )}

        <div className="flex justify-between mt-8">
          {paymentMethod === "saved" && (
            <button
              onClick={() => initializePayment(onSuccess, onClose)}
              className="px-6 py-2 bg-[#FF7A00] text-white rounded-lg hover:bg-[#e66f00] transition-colors"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
