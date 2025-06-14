"use client"

import { createContext, useContext, useReducer } from "react"

const BookingContext = createContext()

const initialState = {
  personalData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  destinations: {
    pickupAddress: "",
    pickupCity: "",
    pickupState: "",
    pickupDate: "",
    pickupTime: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryState: "",
    deliveryDate: "",
    deliveryTime: "",
    moveType: "local",
    itemsDescription: "",
    specialInstructions: "",
  },
  payment: {
    amount: 20000,
    status: "pending",
    reference: "",
    paystackReference: "",
  },
  bookingId: null,
  currentStep: 1,
}

function bookingReducer(state, action) {
  switch (action.type) {
    case "UPDATE_PERSONAL_DATA":
      return {
        ...state,
        personalData: { ...state.personalData, ...action.payload },
      }
    case "UPDATE_DESTINATIONS":
      return {
        ...state,
        destinations: { ...state.destinations, ...action.payload },
      }
    case "UPDATE_PAYMENT":
      return {
        ...state,
        payment: { ...state.payment, ...action.payload },
      }
    case "SET_BOOKING_ID":
      return {
        ...state,
        bookingId: action.payload,
      }
    case "SET_CURRENT_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }
    case "RESET_BOOKING":
      return initialState
    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
