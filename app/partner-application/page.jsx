import PartnerForm from "../components/PartnerForm"
import Navbar from "../components/Navbar"
import Head from 'next/head'

export default function PartnerApplicationPage() {
  return (
    <div className="flex justify-center w-full">
      <Head>
        <title>MerQri | Partner Application</title>
        <meta 
        name="description" 
        content="Join us as a partner by filling out our application" />
      </Head>
      <Navbar />
      <div className="container max-w-4xl py-20 md:py-28 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#27285C] md:text-4xl">Partner with MerQri</h1>
          <p className="mt-4 text-lg text-[#363E51]">
            Join our network of trusted moving companies and grow your business
          </p>
        </div>
        <PartnerForm />
      </div>
    </div>
  )
}
