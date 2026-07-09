'use server'

import { enquirySchema, type EnquiryFormValues } from '@/server/validation/enquirySchema.validation';

export async function submitEnquiry(data: EnquiryFormValues) {
  try {
    // 1. Server-side validation (Security best practice)
    const parsedData = enquirySchema.safeParse(data);
    
    if (!parsedData.success) {
      return { success: false, message: "Invalid form data provided." };
    }

    const { name, email, phone, program, state, city } = parsedData.data;

    // 2. Construct the payload matching the CRM's generic argument list
    const payload = [
      {
        "instituteId": 46,
        "name": name,
        "emailId": email,
        "mobile": phone, // Already validated as exactly 10 digits by Zod
        "programName": program, 
        "specializationName": "",
        "sourceCategory": "8",
        "sourceId": "1",
        "sessionId": "1",
        "campusId": "59",
        "state": state,
        "districtName": city,
        "city": city,
        "streamName": "",
        "schoolName": "",
        "fatherName": "",
        "fatherMobile": "",
        "tenthPercentage": "",
        "twelfthPercentage": ""
      }
    ];

    // 3. Send the POST request to the CRM
    const response = await fetch('https://clientcrmservice.targetx.in/lead/update/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const result = await response.json();
    
    return { success: true, message: "Enquiry submitted successfully!", data: result };

  } catch (error) {
    console.error("Enquiry submission failed:", error);
    return { success: false, message: "Failed to submit enquiry. Please try again." };
  }
}