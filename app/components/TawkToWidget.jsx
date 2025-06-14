"use client"

import Script from "next/script"
import { useEffect } from "react"

export default function TawkToWidget() {
  useEffect(() => {
    // Optional: Configure tawk.to settings
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.onLoad = () => {
        console.log("Tawk.to chat widget loaded")
      }

      // Customize the widget appearance
      window.Tawk_API.customStyle = {
        visibility: {
          desktop: {
            position: "br", // bottom right
            xOffset: 20,
            yOffset: 20,
          },
          mobile: {
            position: "br",
            xOffset: 10,
            yOffset: 10,
          },
        },
      }
    }
  }, [])

  return (
    <Script
      id="tawk-to-widget"
      strategy="afterInteractive"
      onLoad={() => {
        console.log("Tawk.to script loaded successfully")
      }}
      onError={(e) => {
        console.error("Failed to load Tawk.to script:", e)
      }}
    >
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/679590b3825083258e0b2163/1iig3qg3v';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  )
}
