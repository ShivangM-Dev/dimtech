'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, GraduationCap, MapPin, Globe, Building2 } from 'lucide-react';

// Standalone Shadcn Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Data & Actions
import { enquirySchema, type EnquiryFormValues } from '@/server/validation/enquirySchema.validation';
import { submitEnquiry } from '@/server/actions/submitQuery';

export default function AdmissionForm() {
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema as any),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "India",
      state: "",
      city: "",
      agreement: false,
    },
  });

  async function onSubmit(data: EnquiryFormValues) {
    setStatusMessage({ type: '', text: '' });

    try {
      const response = await submitEnquiry(data);
      
      if (response.success) {
        setStatusMessage({ type: 'success', text: response.message });
        reset(); 
      } else {
        setStatusMessage({ type: 'error', text: response.message });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'An unexpected error occurred.' });
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-card border border-border shadow-lg p-8 sm:p-12 rounded-3xl font-sans">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
          Admissions Open <span className="text-primary">2026</span>
        </h2>
        <p className="text-muted-foreground mt-2">Fill out the form below and our counseling team will reach out to you.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        
        {/* Name Field */}
        <div>
          <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
              <User className="w-5 h-5 text-primary/70" />
            </div>
            <Input 
              {...register("name")} 
              placeholder="Enter Name *" 
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" 
            />
          </div>
          {errors.name && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
              <Mail className="w-5 h-5 text-primary/70" />
            </div>
            <Input 
              {...register("email")} 
              placeholder="Enter Email *" 
              type="email" 
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" 
            />
          </div>
          {errors.email && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.email.message}</p>}
        </div>

        {/* Phone Field Group */}
        <div className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-6">
          <div className="flex bg-background border border-border rounded-xl overflow-hidden h-14">
            <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
              <Phone className="w-5 h-5 text-primary/70" />
            </div>
            <div className="flex-1 flex items-center justify-center px-3 text-foreground font-medium bg-transparent">
              +91
            </div>
          </div>

          <div>
            <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border hidden md:flex">
                <Phone className="w-5 h-5 text-primary/70" />
              </div>
              <Input 
                {...register("phone")} 
                placeholder="Phone Number *" 
                type="tel" 
                maxLength={10} 
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" 
              />
            </div>
            {errors.phone && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Programs Dropdown */}
        <Controller
          control={control}
          name="program"
          render={({ field, fieldState }) => (
            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <GraduationCap className="w-5 h-5 text-primary/70" />
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="border-0 focus:ring-0 focus:ring-offset-0 bg-transparent text-foreground h-14 rounded-none shadow-none text-base">
                    <SelectValue placeholder="Select Programs *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MBA">Master of Business Administration (MBA)</SelectItem>
                    <SelectItem value="MCA">Master of Computer Applications (MCA)</SelectItem>
                    <SelectItem value="BBA">Bachelor of Business Administration (BBA)</SelectItem>
                    <SelectItem value="BCA">Bachelor of Computer Applications (BCA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {fieldState.error && <p className="text-destructive text-sm mt-1.5 ml-1">{fieldState.error.message}</p>}
            </div>
          )}
        />

        {/* Country Dropdown */}
        <Controller
          control={control}
          name="country"
          render={({ field, fieldState }) => (
            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <MapPin className="w-5 h-5 text-primary/70" />
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="border-0 focus:ring-0 focus:ring-offset-0 bg-transparent text-foreground h-14 rounded-none shadow-none text-base">
                    <SelectValue placeholder="Select Country *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {fieldState.error && <p className="text-destructive text-sm mt-1.5 ml-1">{fieldState.error.message}</p>}
            </div>
          )}
        />

        {/* State and City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            control={control}
            name="state"
            render={({ field, fieldState }) => (
              <div>
                <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                    <Globe className="w-5 h-5 text-primary/70" />
                  </div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border-0 focus:ring-0 focus:ring-offset-0 bg-transparent text-foreground h-14 rounded-none shadow-none text-base">
                      <SelectValue placeholder="Select State *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {fieldState.error && <p className="text-destructive text-sm mt-1.5 ml-1">{fieldState.error.message}</p>}
              </div>
            )}
          />

          <div>
            <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                <Building2 className="w-5 h-5 text-primary/70" />
              </div>
              <Input 
                {...register("city")} 
                placeholder="Enter City *" 
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" 
              />
            </div>
            {errors.city && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.city.message}</p>}
          </div>
        </div>

        {/* Agreement Checkbox */}
        <Controller
          control={control}
          name="agreement"
          render={({ field, fieldState }) => (
            <div className="flex flex-col mt-4 border-t border-border/50 pt-6">
              <div className="flex flex-row items-start space-x-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="agreement-checkbox"
                  className="mt-1"
                />
                <label htmlFor="agreement-checkbox" className="text-muted-foreground text-sm cursor-pointer select-none leading-relaxed hover:text-foreground transition-colors">
                  I agree to receive information regarding my enquiry and authorize DIMTECH to contact me.
                </label>
              </div>
              {fieldState.error && <p className="text-destructive text-sm mt-2 ml-7">{fieldState.error.message}</p>}
            </div>
          )}
        />

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-6 mx-auto w-full sm:w-auto min-w-[200px] bg-primary text-primary-foreground font-bold py-6 px-12 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </Button>

        {/* Status Messages */}
        {statusMessage.text && (
          <div className={`text-center p-4 rounded-xl mt-2 text-sm font-medium border ${statusMessage.type === 'success' ? 'bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
            {statusMessage.text}
          </div>
        )}

      </form>
    </div>
  );
}