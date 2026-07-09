import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be exactly 10 digits." }),
  
  // FIX: Changed 'required_error' to 'message'
  program: z.enum(["MBA", "MCA", "BBA", "BCA"], { 
    message: "Please select a program." 
  }),
  
  country: z.string().min(1, { message: "Country is required." }),
  state: z.string().min(2, { message: "Please select a state." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to receive information."
  })
});

// Export the inferred type for use in our components and actions
export type EnquiryFormValues = z.infer<typeof enquirySchema>;