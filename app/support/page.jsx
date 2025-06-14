import React from 'react'
import { ToastContextProvider } from "../components/ui/toast-context";
import SupportForm from '../components/SupportForm'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Head from 'next/head'

const Support = () => {
    return (
        <div>
            <Head>
                <title>MerQri | Support </title>
                <meta 
                name="description" 
                content="We provide 24/7 support, just drop a ticket and we will get back to you." 
                />
            </Head>
            <Navbar />
            <ToastContextProvider>
                <SupportForm />
            </ToastContextProvider>
            <Footer />
        </div>
    )
}

export default Support