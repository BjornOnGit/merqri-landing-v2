"use client"

import Head from "next/head"
import { BookingProvider } from "../contexts/BookingContext"
import Sidebar from "../components/Sidebar"
import PersonalDataForm from "../components/PersonalDataForm"
import BookingDestinationsForm from "../components/BookingDestinations"
import ConfirmationPage from "../components/ConfirmationPage"
import { useBooking } from "../contexts/BookingContext"
import dynamic from "next/dynamic"

const PaymentForm = dynamic(() => import("../components/PaymentForm"), {
  ssr: false,
})

function BookingContent() {
  const { state, dispatch } = useBooking()
  const { currentStep } = state

  const goToNextStep = () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: currentStep + 1 })
  }

  const goToPreviousStep = () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: currentStep - 1 })
  }

  // Steps data
  const steps = ["Personal Info", "Destinations", "Payment", "Confirmation"]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Head>
        <title>MerQri | Book A Move</title>
        <meta
          name="description"
          content="Book your move with MerQri. Fill out your personal information, select your destinations, and make a payment to confirm your booking."
        />
      </Head>

      {/* Sidebar: Only visible on desktops */}
      <div className="hidden md:flex">
        <Sidebar currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <main className="w-full md:flex-1 px-4 py-6 mt-14 md:p-10">
        {/* Progress Indicator (Only on Mobile) */}
        <div className="md:hidden flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              {/* Step Number */}
              <div
                className={`w-8 h-8 flex items-center justify-center text-white font-bold rounded-full transition ${
                  currentStep > index + 1 ? "bg-green-500" : currentStep === index + 1 ? "bg-[#FF7A00]" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>

              {/* Step Label */}
              <span
                className={`text-xs mt-2 ${
                  currentStep === index + 1 ? "text-[#FF7A00] font-semibold" : "text-gray-500"
                }`}
              >
                {step}
              </span>

              {/* Connector Line (Hidden for Last Step) */}
              {index !== steps.length - 1 && (
                <div className={`h-1 w-full ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Forms Based on Step */}
        {currentStep === 1 && <PersonalDataForm goToNextStep={goToNextStep} />}
        {currentStep === 2 && <BookingDestinationsForm goToNextStep={goToNextStep} />}
        {currentStep === 3 && <PaymentForm goToNextStep={goToNextStep} />}
        {currentStep === 4 && <ConfirmationPage />}

        {/* Navigation Buttons (Hidden on Confirmation Page) */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                onClick={goToPreviousStep}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Previous
              </button>
            )}

            <button
              onClick={goToNextStep}
              className="bg-[#FF7A00] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition ml-auto"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default function Booking() {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  )
}
