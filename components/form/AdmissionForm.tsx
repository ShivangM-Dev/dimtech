'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, Mail, Phone, GraduationCap, MapPin, Globe, 
  Building2, Map, BookOpen, School as SchoolIcon, 
  UserPlus, Percent 
} from 'lucide-react';

// Standalone Shadcn Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Data & Actions
import { enquirySchema, type EnquiryFormValues } from '@/server/validation/admissionSchema.validation';
import { submitEnquiry } from '@/server/actions/submitQuery';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

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
      emailId: "",
      mobile: "",
    //   programName: "",
      streamName: "",
      schoolName: "",
      tenthPercentage: "",
      twelfthPercentage: "",
      fatherName: "",
      fatherMobile: "",
      state: "",
      districtName: "",
      city: "",
      agreement: false,
    },
  });

  async function onSubmit(data: EnquiryFormValues) {
    setStatusMessage({ type: '', text: '' });

    try {
      const response = await submitEnquiry(data as any);
      
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
    <div className="w-full max-w-4xl mx-auto bg-card border border-border shadow-lg p-8 sm:p-12 rounded-3xl font-sans">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
          Admissions Open <span className="text-primary">2026</span>
        </h2>
        <p className="text-muted-foreground mt-2">Fill out your complete details below to proceed.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        
        {/* --- SECTION 1: PERSONAL DETAILS --- */}
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-foreground border-b border-border/50 pb-2">Personal Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <User className="w-5 h-5 text-primary/70" />
                </div>
                <Input {...register("name")} placeholder="Applicant Name *" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.name && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.name.message as string}</p>}
            </div>

            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <Mail className="w-5 h-5 text-primary/70" />
                </div>
                <Input {...register("emailId")} placeholder="Email Address *" type="email" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.emailId && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.emailId.message as string}</p>}
            </div>
          </div>

          <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all md:w-1/2 md:pr-3">
            <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
              <Phone className="w-5 h-5 text-primary/70" />
            </div>
            <div className="flex items-center justify-center px-3 text-foreground font-medium bg-transparent border-r border-border/50">
              +91
            </div>
            <Input {...register("mobile")} placeholder="Applicant Mobile *" type="tel" maxLength={10} className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
          </div>
          {errors.mobile && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.mobile.message as string}</p>}
        </div>

        {/* --- SECTION 2: PARENT DETAILS --- */}
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-foreground border-b border-border/50 pb-2">Parent / Guardian Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <UserPlus className="w-5 h-5 text-primary/70" />
                </div>
                <Input {...register("fatherName")} placeholder="Father's Name *" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.fatherName && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.fatherName.message as string}</p>}
            </div>

            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <Phone className="w-5 h-5 text-primary/70" />
                </div>
                <div className="flex items-center justify-center px-3 text-foreground font-medium bg-transparent border-r border-border/50">
                  +91
                </div>
                <Input {...register("fatherMobile")} placeholder="Father's Mobile *" type="tel" maxLength={10} className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.fatherMobile && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.fatherMobile.message as string}</p>}
            </div>
          </div>
        </div>

        {/* --- SECTION 3: ACADEMIC DETAILS --- */}
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-foreground border-b border-border/50 pb-2">Academic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              control={control}
              name="programName"
              render={({ field, fieldState }) => (
                <div>
                  <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                      <GraduationCap className="w-5 h-5 text-primary/70" />
                    </div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-0 focus:ring-0 focus:ring-offset-0 bg-transparent text-foreground h-14 rounded-none shadow-none text-base">
                        <SelectValue placeholder="Select Program *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MBA">MBA</SelectItem>
                        <SelectItem value="MCA">MCA</SelectItem>
                        <SelectItem value="BBA">BBA</SelectItem>
                        <SelectItem value="BCA">BCA</SelectItem>
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
                  <BookOpen className="w-5 h-5 text-primary/70" />
                </div>
                <Input {...register("streamName")} placeholder="Stream (e.g., Science, Commerce) *" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.streamName && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.streamName.message as string}</p>}
            </div>
          </div>

          <div>
            <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                <SchoolIcon className="w-5 h-5 text-primary/70" />
              </div>
              <Input {...register("schoolName")} placeholder="Previous School/College Name *" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
            </div>
            {errors.schoolName && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.schoolName.message as string}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <Percent className="w-5 h-5 text-primary/70" />
                </div>
                <Input {...register("tenthPercentage")} placeholder="10th Percentage *" type="number" step="0.01" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.tenthPercentage && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.tenthPercentage.message as string}</p>}
            </div>

            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <Percent className="w-5 h-5 text-primary/70" />
                </div>
                <Input {...register("twelfthPercentage")} placeholder="12th Percentage *" type="number" step="0.01" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.twelfthPercentage && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.twelfthPercentage.message as string}</p>}
            </div>
          </div>
        </div>

        {/* --- SECTION 4: ADDRESS DETAILS --- */}
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-foreground border-b border-border/50 pb-2">Location Details</h3>

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
                    <SelectContent className="max-h-60">
                      {INDIAN_STATES.map((stateName) => (
                        <SelectItem key={stateName} value={stateName}>{stateName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {fieldState.error && <p className="text-destructive text-sm mt-1.5 ml-1">{fieldState.error.message}</p>}
              </div>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <Map className="w-5 h-5 text-primary/70" />
                </div>
                <Input {...register("districtName")} placeholder="District Name *" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.districtName && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.districtName.message as string}</p>}
            </div>

            <div>
              <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="bg-muted/30 px-4 flex items-center justify-center border-r border-border">
                  <Building2 className="w-5 h-5 text-primary/70" />
                </div>
                <Input {...register("city")} placeholder="Enter City *" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground bg-transparent h-14 rounded-none placeholder:text-muted-foreground/70 text-base" />
              </div>
              {errors.city && <p className="text-destructive text-sm mt-1.5 ml-1">{errors.city.message as string}</p>}
            </div>
          </div>
        </div>

        {/* --- AGREEMENT & SUBMIT --- */}
        <Controller
          control={control}
          name="agreement"
          render={({ field, fieldState }) => (
            <div className="flex flex-col mt-2 border-t border-border/50 pt-6">
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

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-4 mx-auto w-full sm:w-auto min-w-[250px] bg-primary text-primary-foreground font-bold py-6 px-12 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </Button>

        {statusMessage.text && (
          <div className={`text-center p-4 rounded-xl mt-2 text-sm font-medium border ${statusMessage.type === 'success' ? 'bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
            {statusMessage.text}
          </div>
        )}

      </form>
    </div>
  );
}