"use client"

import { useEffect, useRef, useState } from "react"

export default function GooglePlacesAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  onPlaceSelect,
  error,
  className = "",
}) {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if Google Maps is loaded
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      initializeAutocomplete()
      setIsLoaded(true)
    } else {
      // Wait for Google Maps to load
      const checkGoogleMaps = setInterval(() => {
        if (typeof window !== "undefined" && window.google && window.google.maps) {
          initializeAutocomplete()
          setIsLoaded(true)
          clearInterval(checkGoogleMaps)
        }
      }, 100)

      return () => clearInterval(checkGoogleMaps)
    }
  }, [])

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google) return

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "ng" }, // Restrict to Nigeria
    })

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace()

      if (place.formatted_address) {
        onChange(place.formatted_address)

        // Extract city and state from place components
        if (onPlaceSelect && place.address_components) {
          const addressComponents = place.address_components
          let city = ""
          let state = ""

          addressComponents.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name
            }
            if (component.types.includes("administrative_area_level_1")) {
              state = component.long_name
            }
          })

          onPlaceSelect({ city, state, fullAddress: place.formatted_address })
        }
      }
    })
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-200"
        } focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {!isLoaded && <p className="mt-1 text-xs text-gray-500">Loading address suggestions...</p>}
    </div>
  )
}
