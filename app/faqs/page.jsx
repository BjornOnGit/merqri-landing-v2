import FAQSection from "../sections/FAQSection"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Head from 'next/head'

export default function FAQPage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>MerQri | Frequently Asked Questions</title>
          <meta 
          name="description"
          content="Let's answer all the most common questions you have about MerQri" 
          />
        </Head>
        <Navbar />
        <FAQSection />
        <Footer />
      </div>
    )
  }