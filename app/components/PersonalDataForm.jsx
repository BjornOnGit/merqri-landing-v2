"use client"

import { useState } from "react"
import { useBooking } from "../contexts/BookingContext"

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

export default function PersonalDataForm({ goToNextStep }) {
  const { state, dispatch } = useBooking()
  const { personalData } = state
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    dispatch({
      type: "UPDATE_PERSONAL_DATA",
      payload: { [field]: value },
    })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!personalData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!personalData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!personalData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(personalData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!personalData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (personalData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (validateForm()) {
      goToNextStep()
    }
  }

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
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Personal Data</h1>
          <p className="text-gray-500">Setup Your Personal Details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First name"
              placeholder="Enter first name"
              value={personalData.firstName}
              onChange={(value) => handleInputChange("firstName", value)}
              error={errors.firstName}
            />
            <InputField
              label="Last name"
              placeholder="Enter last name"
              value={personalData.lastName}
              onChange={(value) => handleInputChange("lastName", value)}
              error={errors.lastName}
            />
          </div>

          <InputField
            label="Email"
            placeholder="Enter email"
            type="email"
            value={personalData.email}
            onChange={(value) => handleInputChange("email", value)}
            error={errors.email}
          />

          <InputField
            label="Phone Number"
            placeholder="Enter number"
            type="tel"
            value={personalData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            error={errors.phone}
          />

          <button
            type="submit"
            className="w-full bg-[#FF7A00] text-white py-3 rounded-lg mt-4 hover:bg-[#e66f00] transition-colors"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  )
}
