"use client"

import { usePathname } from "next/navigation"
import TawkToWidget from "./TawkToWidget"

export default function ConditionalTawkWidget() {
  const pathname = usePathname()

  // Don't show chat widget on certain pages
  const excludedPaths = ["/admin", "/dashboard", "/booking"]
  const shouldShowWidget = !excludedPaths.some((path) => pathname.startsWith(path))

  if (!shouldShowWidget) {
    return null
  }

  return <TawkToWidget />
}
