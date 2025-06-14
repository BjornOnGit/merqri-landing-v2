import ContactForm from "../components/ContactForm"
import { ToastContextProvider } from "../components/ui/toast-context"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Head from 'next/head'

export default function ContactPage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>MerQri | Contact Us</title>
          <meta 
          name="description"
          content="Contact us. We appreciate and look forward to your feedback"
          />
        </Head>
        <Navbar />
        <ToastContextProvider>
          <ContactForm />
        </ToastContextProvider>
        <Footer />
      </div>
    )
}