import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from 'next/head'
import Script from 'next/script'
// import { Toast } from "./components/ui/toast"
// import TawkToWidget from "./components/TawkToWidget"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MerQri | Book Your Next Move",
  description: "Unlock the best moving experience with our curated list of top-notch moving companies",
  icons: {
    icon: "/fav.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-R94ZEF6Y43" strategy="afterInteractive" />

      <Script id="google-analytics" strategy="afterInteractive">
        {
          `window.dataLayer = window.dataLayer || [];   
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());  

          gtag('config', 'G-R94ZEF6Y43'); `
        }
      </Script>

      {/* Google Maps Places API */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <Script
          id="tawk-to-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/679590b3825083258e0b2163/1iig3qg3v';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
        {/* <Toast />
        <TawkToWidget /> */}
      </body>
    </html>
  );
}
