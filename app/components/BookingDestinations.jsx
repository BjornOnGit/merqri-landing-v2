"use client"

import { useState } from "react"
import { useBooking } from "../contexts/BookingContext"
import { createBooking } from "@/app/actions/booking-actions"
import GooglePlacesAutocomplete from "./ui/google-places-autocomplete"

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

const SelectField = ({ label, value, onChange, options, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? "border-red-500" : "border-gray-200"
      } focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
)

const TextAreaField = ({ label, placeholder, value, onChange, error }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? "border-red-500" : "border-gray-200"
      } focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
)

export default function BookingDestinationsForm({ goToNextStep }) {
  const { state, dispatch } = useBooking()
  const { destinations, personalData } = state
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field, value) => {
    dispatch({
      type: "UPDATE_DESTINATIONS",
      payload: { [field]: value },
    })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handlePickupPlaceSelect = (placeData) => {
    dispatch({
      type: "UPDATE_DESTINATIONS",
      payload: {
        pickupCity: placeData.city,
        pickupState: placeData.state,
      },
    })
  }

  const handleDeliveryPlaceSelect = (placeData) => {
    dispatch({
      type: "UPDATE_DESTINATIONS",
      payload: {
        deliveryCity: placeData.city,
        deliveryState: placeData.state,
      },
    })
  }

  const validateForm = () => {
    const newErrors = {}

    const requiredFields = [
      "pickupAddress",
      "pickupCity",
      "pickupState",
      "pickupDate",
      "pickupTime",
      "deliveryAddress",
      "deliveryCity",
      "deliveryState",
      "deliveryDate",
      "deliveryTime",
    ]

    requiredFields.forEach((field) => {
      if (!destinations[field]?.trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").toLowerCase()} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Create booking in Supabase
      const result = await createBooking(personalData, destinations)

      if (result.success) {
        // Store booking ID for payment
        dispatch({ type: "SET_BOOKING_ID", payload: result.data.id })
        goToNextStep()
      } else {
        console.error("Booking creation failed:", result.error)
        // You might want to show an error toast here
      }
    } catch (error) {
      console.error("Error creating booking:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const moveTypeOptions = [
    { value: "local", label: "Local Move" },
    { value: "interstate", label: "Interstate Move" },
    { value: "international", label: "International Move" },
  ]

  return (
    <div className="max-w-xl mx-auto pt-16 px-8">
      <div className="flex justify-end mb-12">
        <div className="text-sm">
          Having issues?{" "}
          <a href="/support" className="text-[#FF7A00] font-medium">
            Get Help
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Booking Details</h1>
          <p className="text-gray-500">Provide pickup and delivery information</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Pickup Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pickup Information</h3>

            <GooglePlacesAutocomplete
              label="Pickup Address"
              placeholder="Enter pickup address"
              value={destinations.pickupAddress}
              onChange={(value) => handleInputChange("pickupAddress", value)}
              onPlaceSelect={handlePickupPlaceSelect}
              error={errors.pickupAddress}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="City"
                placeholder="Enter city"
                value={destinations.pickupCity}
                onChange={(value) => handleInputChange("pickupCity", value)}
                error={errors.pickupCity}
              />
              <InputField
                label="State"
                placeholder="Enter state"
                value={destinations.pickupState}
                onChange={(value) => handleInputChange("pickupState", value)}
                error={errors.pickupState}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Pickup Date"
                type="date"
                value={destinations.pickupDate}
                onChange={(value) => handleInputChange("pickupDate", value)}
                error={errors.pickupDate}
              />
              <InputField
                label="Pickup Time"
                type="time"
                value={destinations.pickupTime}
                onChange={(value) => handleInputChange("pickupTime", value)}
                error={errors.pickupTime}
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h3>

            <GooglePlacesAutocomplete
              label="Delivery Address"
              placeholder="Enter delivery address"
              value={destinations.deliveryAddress}
              onChange={(value) => handleInputChange("deliveryAddress", value)}
              onPlaceSelect={handleDeliveryPlaceSelect}
              error={errors.deliveryAddress}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="City"
                placeholder="Enter city"
                value={destinations.deliveryCity}
                onChange={(value) => handleInputChange("deliveryCity", value)}
                error={errors.deliveryCity}
              />
              <InputField
                label="State"
                placeholder="Enter state"
                value={destinations.deliveryState}
                onChange={(value) => handleInputChange("deliveryState", value)}
                error={errors.deliveryState}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Delivery Date"
                type="date"
                value={destinations.deliveryDate}
                onChange={(value) => handleInputChange("deliveryDate", value)}
                error={errors.deliveryDate}
              />
              <InputField
                label="Delivery Time"
                type="time"
                value={destinations.deliveryTime}
                onChange={(value) => handleInputChange("deliveryTime", value)}
                error={errors.deliveryTime}
              />
            </div>
          </div>

          {/* Additional Information */}
          <SelectField
            label="Move Type"
            value={destinations.moveType}
            onChange={(value) => handleInputChange("moveType", value)}
            options={moveTypeOptions}
            error={errors.moveType}
          />

          <TextAreaField
            label="Items Description (Optional)"
            placeholder="Describe the items you're moving..."
            value={destinations.itemsDescription}
            onChange={(value) => handleInputChange("itemsDescription", value)}
            error={errors.itemsDescription}
          />

          <TextAreaField
            label="Special Instructions (Optional)"
            placeholder="Any special instructions for the movers..."
            value={destinations.specialInstructions}
            onChange={(value) => handleInputChange("specialInstructions", value)}
            error={errors.specialInstructions}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF7A00] text-white py-3 rounded-lg mt-4 hover:bg-[#e66f00] transition-colors disabled:opacity-50"
          />
        </form>
      </div>
    </div>
  )
}
