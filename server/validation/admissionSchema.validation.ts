import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  emailId: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().regex(/^[0-9]{10}$/, { message: "Mobile must be exactly 10 digits." }),
  programName: z.enum(["MBA", "MCA", "BBA", "BCA"], { message: "Please select a program." }),
  
  streamName: z.string().min(2, { message: "Stream is required." }),
  schoolName: z.string().min(2, { message: "School name is required." }),
  tenthPercentage: z.string().min(1, { message: "10th percentage is required." }),
  twelfthPercentage: z.string().min(1, { message: "12th percentage is required." }),
  
  fatherName: z.string().min(2, { message: "Father's name is required." }),
  fatherMobile: z.string().regex(/^[0-9]{10}$/, { message: "Mobile must be exactly 10 digits." }),
  
  state: z.string().min(2, { message: "Please select a state." }),
  districtName: z.string().min(2, { message: "District is required." }),
  city: z.string().min(2, { message: "City is required." }),
  
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to receive information."
  })
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;