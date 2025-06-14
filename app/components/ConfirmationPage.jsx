export default function ConfirmationPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
        {/* <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-01-20%2001-58-17-B0epvcuofLMF8GW1pOtweeYw5KRzr6.png"
          alt="MerQri Logo"
          className="w-16 h-16 mb-8"
        /> */}
  
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-3">
          Thank You For Choosing MerQri
        </h1>
  
        <p className="text-center text-gray-500 mb-8">
          Your booking details as well as driver information
          <br />
          have been sent to you via email.
        </p>
  
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2.5 bg-[#FF7A00] text-white rounded-lg hover:bg-[#e66f00] transition-colors mb-12"
        >
          Back To Home
        </button>
  
        <div className="w-full max-w-md">
          <img
            src="/images/illustration-2.png"
            alt="Confirmation Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    )
}  