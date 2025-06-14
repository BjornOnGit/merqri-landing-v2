const Step = ({ number, title, subtitle, active, completed }) => (
  <div className="flex items-start gap-3 mb-8">
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
      ${completed ? "bg-green-500 text-white" : active ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-400"}`}
    >
      {completed ? "✓" : number}
    </div>
    <div>
      <h3 className={`text-sm font-medium ${completed ? "text-green-500" : active ? "text-[#FF7A00]" : "text-gray-400"}`}>
        {title}
      </h3>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  </div>
);

export default function Sidebar({ currentStep }) {
  return (
    <div className="w-72 min-h-screen bg-white p-8 border-r border-gray-100">
      <div className="mb-16">
        <img src="/images/logo.png" alt="MerQri Logo" className="h-8" />
      </div>

      <div className="mb-16">
        <Step number={1} title="Personal Data" subtitle="Setup Your Personal Details" completed={currentStep > 1} active={currentStep === 1} />
        <Step number={2} title="Booking Destinations" subtitle="Select Your Travel Location" completed={currentStep > 2} active={currentStep === 2} />
        <Step number={3} title="Make Payment" subtitle="Use Debit or Credit Card" completed={currentStep > 3} active={currentStep === 3} />
        <Step number={4} title="Completed" subtitle="Booking and Payment" completed={currentStep === 4} active={currentStep === 4} />
      </div>

      <div className="mt-auto">
        <img src="/images/illustration-1.png" alt="Illustration" className="w-full" />
      </div>
    </div>
  );
}
