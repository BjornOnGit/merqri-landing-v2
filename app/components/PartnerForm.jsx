"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Truck, Building2, MapPin, Phone, Mail, FileCheck } from "lucide-react"
import { useToast } from "../hooks/use-toast"
import { submitPartnerApplication } from "@/app/actions/submit-partner-application"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  website: z
    .string()
    .url({
      message: "Please enter a valid website URL.",
    })
    .optional()
    .or(z.literal("")),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip: z.string().min(5, {
    message: "ZIP code must be at least 5 characters.",
  }),
  serviceAreas: z.string().min(2, {
    message: "Please specify your service areas.",
  }),
  companySize: z.string({
    required_error: "Please select your company size.",
  }),
  services: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one service.",
  }),
  fleetSize: z.string({
    required_error: "Please select your fleet size.",
  }),
  yearsInBusiness: z.string({
    required_error: "Please select years in business.",
  }),
  insurance: z.boolean().refine((val) => val === true, {
    message: "Insurance is required to partner with MerQri.",
  }),
  cacNumber: z.string().min(2, {
    message: "Please provide your CAC business ID number.",
  }),
  additionalInfo: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

const services = [
  { id: "local", label: "Local Moving" },
  { id: "longDistance", label: "Long Distance Moving" },
  { id: "commercial", label: "Commercial Moving" },
  { id: "packing", label: "Packing Services" },
  { id: "storage", label: "Storage Solutions" },
  { id: "specialty", label: "Specialty Items Moving" },
  { id: "junk", label: "Junk Removal" },
  { id: "cleaning", label: "Cleaning Services" },
]

export default function PartnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      serviceAreas: "",
      companySize: "",
      services: [],
      fleetSize: "",
      yearsInBusiness: "",
      insurance: false,
      cacNumber: "",
      additionalInfo: "",
      termsAccepted: false,
    },
  })

  async function onSubmit(values) {
    setIsSubmitting(true)

    try {
      const result = await submitPartnerApplication(values)

      if (result.success) {
        toast({
          title: "Application Submitted",
          description: result.message,
        })
        form.reset()
      } else {
        toast({
          title: "Submission Failed",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Something went wrong",
        description: "Your application couldn't be submitted. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full border-[#D9D9D9] bg-white mx-auto">
      <CardHeader className="border-b border-[#D9D9D9] bg-[#F8F9FA]">
        <CardTitle className="flex items-center gap-2 text-[#27285C]">
          <Truck className="h-6 w-6 text-[#F2800A]" />
          <span>Moving Company Partnership Application</span>
        </CardTitle>
        <CardDescription className="text-[#363E51]">
          Fill out the form below to apply to become a MerQri partner. We'll review your application and contact you
          within 2-3 business days.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Company Information section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#F2800A]" />
                <h3 className="text-lg font-medium text-[#27285C]">Company Information</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#363E51]">Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Moving Company"
                          {...field}
                          className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                        />
                      </FormControl>
                      <FormMessage className="text-[#FF0000]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#363E51]">Website (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourcompany.com"
                          {...field}
                          className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                        />
                      </FormControl>
                      <FormMessage className="text-[#FF0000]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#363E51]">Contact Person</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          {...field}
                          className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                        />
                      </FormControl>
                      <FormMessage className="text-[#FF0000]" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#363E51]">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="contact@company.com"
                            {...field}
                            className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#363E51]">Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 123-4567"
                            {...field}
                            className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Location & Service Areas section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#F2800A]" />
                <h3 className="text-lg font-medium text-[#27285C]">Location & Service Areas</h3>
              </div>

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#363E51]">Street Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Moving St"
                          {...field}
                          className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                        />
                      </FormControl>
                      <FormMessage className="text-[#FF0000]" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#363E51]">City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City"
                            {...field}
                            className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#363E51]">State</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="State"
                            {...field}
                            className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#363E51]">ZIP Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="12345"
                            {...field}
                            className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="serviceAreas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#363E51]">Service Areas</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the cities, counties, or regions you serve"
                          className="min-h-[80px] border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[#363E51]">
                        Specify the geographic areas where you provide moving services
                      </FormDescription>
                      <FormMessage className="text-[#FF0000]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Services & Capabilities section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#F2800A]" />
                <h3 className="text-lg font-medium text-[#27285C]">Services & Capabilities</h3>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#363E51]">Company Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} name="companySize">
                        <SelectTrigger className="border-[#D9D9D9] focus:ring-[#F2800A]">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 employees</SelectItem>
                          <SelectItem value="6-20">6-20 employees</SelectItem>
                          <SelectItem value="21-50">21-50 employees</SelectItem>
                          <SelectItem value="51-100">51-100 employees</SelectItem>
                          <SelectItem value="100+">100+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[#FF0000]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fleetSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#363E51]">Fleet Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} name="fleetSize">
                        <SelectTrigger className="border-[#D9D9D9] focus:ring-[#F2800A]">
                          <SelectValue placeholder="Select fleet size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3">1-3 vehicles</SelectItem>
                          <SelectItem value="4-10">4-10 vehicles</SelectItem>
                          <SelectItem value="11-20">11-20 vehicles</SelectItem>
                          <SelectItem value="21-50">21-50 vehicles</SelectItem>
                          <SelectItem value="50+">50+ vehicles</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[#FF0000]" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-[#363E51]">Services Offered</FormLabel>
                      <FormDescription className="text-[#363E51]">
                        Select all the services your company provides
                      </FormDescription>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {services.map((service) => (
                        <FormField
                          key={service.id}
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem key={service.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, service.id])
                                        : field.onChange(field.value?.filter((value) => value !== service.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-[#363E51]">{service.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsInBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#363E51]">Years in Business</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} name="yearsInBusiness">
                      <SelectTrigger className="border-[#D9D9D9] focus:ring-[#F2800A]">
                        <SelectValue placeholder="Select years in business" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1">Less than 1 year</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="4-7">4-7 years</SelectItem>
                        <SelectItem value="8-15">8-15 years</SelectItem>
                        <SelectItem value="15+">15+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
            </div>

            {/* Business Verification section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-[#F2800A]" />
                <h3 className="text-lg font-medium text-[#27285C]">Business Verification</h3>
              </div>

              <FormField
                control={form.control}
                name="insurance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-[#363E51]">
                        My company has liability insurance and cargo insurance
                      </FormLabel>
                      <FormDescription className="text-[#363E51]">
                        MerQri requires all partners to maintain appropriate insurance coverage
                      </FormDescription>
                    </div>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cacNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#363E51]">CAC Business ID Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your CAC business ID number"
                        className="border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[#363E51]">
                      This will be used to verify that your business is properly registered
                    </FormDescription>
                    <FormMessage className="text-[#FF0000]" />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Information section */}
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#363E51]">Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share any additional information about your company that would be helpful for us to know"
                      className="min-h-[100px] border-[#D9D9D9] focus-visible:ring-[#F2800A]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[#363E51]">
                    Tell us anything else that makes your company stand out
                  </FormDescription>
                  <FormMessage className="text-[#FF0000]" />
                </FormItem>
              )}
            />

            {/* Terms and Conditions section */}
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-[#363E51]">I agree to MerQri's Partner Terms and Conditions</FormLabel>
                    <FormDescription className="text-[#363E51]">
                      By checking this box, you agree to our{" "}
                      <a href="#" className="text-[#F2800A] underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#F2800A] underline">
                        Privacy Policy
                      </a>
                    </FormDescription>
                  </div>
                  <FormMessage className="text-[#FF0000]" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-[#F2800A] hover:bg-[#E67300] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t border-[#D9D9D9] bg-[#F8F9FA] px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-[#363E51]">
          <Phone className="h-4 w-4 text-[#F2800A]" />
          <span>Questions? Call us at (800) 555-MOVE</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#363E51]">
          <Mail className="h-4 w-4 text-[#F2800A]" />
          <span>Or email us at partners@merqri.com</span>
        </div>
      </CardFooter>
    </Card>
  )
}
