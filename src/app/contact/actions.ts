"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.string().min(1),
  budget: z.string().optional(),
  description: z.string().min(10),
});

type FormValues = z.infer<typeof formSchema>;

export async function createServiceRequest(data: FormValues) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid data provided.",
    };
  }

  // In a real application, you would save this to a database (e.g., using Convex, Prisma, etc.)
  console.log("New service request received:", validation.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate potential server-side errors
  // if (validation.data.email.includes("testfail")) {
  //   return {
  //     success: false,
  //     message: "This email address is blocked.",
  //   };
  // }
  
  return {
    success: true,
    message: "Service request submitted successfully.",
  };
}
