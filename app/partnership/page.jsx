
import WhyPartnerMerQri from '../sections/WhyPartnerMerQri'
import  PartnerHero  from '../sections/PartnerHero'
import React from 'react'
import Partner from '../sections/Partner'
import BecomeAVendor from '../sections/BecomeAVendor'
import Subscribe from '../sections/Subscribe'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Head from 'next/head'

const Partnership = () => {
  return (
    <div>
      <Head>
        <title>MerQri | Partners</title>
        <meta 
        name="description" 
        content="Join us as a valuable partner and watch your business gain ground" 
        />
      </Head>
      <section>
      <Navbar />
      <PartnerHero />
      <WhyPartnerMerQri />
      <Partner />
      <BecomeAVendor />
      <Subscribe />
      <Footer />
    </section>
    </div>
    
  )
}

export default Partnership