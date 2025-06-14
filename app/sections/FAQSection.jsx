"use client"

import { useState } from "react"
import { Input } from "../components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Search } from "lucide-react"

const faqs = [
  {
    question: "How do I book a moving service?",
    answer:
      "To book a moving service, simply go to our homepage and click on 'Book Now'. Follow the steps to provide your moving details, choose a service package, and complete the booking process.",
  },
  {
    question: "What types of moves do you handle?",
    answer:
      "We handle various types of moves including residential moves (apartments, houses), commercial moves (offices, stores), and long-distance moves. We also offer specialized services for delicate items like pianos or artwork.",
  },
  {
    question: "How are your prices calculated?",
    answer:
      "Our prices are calculated based on several factors including the distance of the move, the volume of items to be moved, any special handling requirements, and the specific services you choose. You can get a detailed quote by using our online booking system.",
  },
  {
    question: "Do you provide packing services?",
    answer:
      "Yes, we offer professional packing services. Our team can pack all your belongings safely and efficiently. We also provide packing materials if you prefer to pack yourself.",
  },
  {
    question: "Are my belongings insured during the move?",
    answer:
      "Yes, we provide basic insurance coverage for all moves. This covers your items for damage or loss during the moving process. We also offer additional insurance options for high-value items.",
  },
  {
    question: "How far in advance should I book my move?",
    answer:
      "We recommend booking your move as soon as you know your moving date. For local moves, 2-4 weeks in advance is usually sufficient. For long-distance moves or during peak season (summer months), we suggest booking 4-6 weeks in advance.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers. Payment is typically required before the move, but we offer flexible options for larger moves.",
  },
  {
    question: "What if I need to cancel or reschedule my move?",
    answer:
      "We understand that plans can change. Please contact us as soon as possible if you need to cancel or reschedule. Our cancellation policy varies depending on how close to the moving date you cancel, but we always strive to be as accommodating as possible.",
  },
]

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="max-w-3xl mx-auto pt-16 px-8">
      <div className="flex justify-between items-center mb-12">
        {/* <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-01-19%2011-14-09-W3IDb0H53XAdfB3xxtOZ7pgAmSpLo4.png"
          alt="MerQri Logo"
          className="h-8"
        /> */}
        <div className="text-sm">
          Need more help?{" "}
          <a href="/support" className="text-[#FF7A00] font-medium">
            Contact Support
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Frequently Asked Questions</h1>
          <p className="text-gray-500">Find answers to common questions about our services</p>
        </div>

        <div className="mb-8 relative">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No matching FAQs found. Please try a different search term.</p>
        )}
      </div>
    </div>
  )
}

