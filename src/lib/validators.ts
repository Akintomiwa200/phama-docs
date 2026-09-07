import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const medicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  dosage: z.string().min(1, "Dosage is required"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().nonnegative("Stock cannot be negative"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
});

export const prescriptionSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  doctorName: z.string().min(1, "Doctor name is required"),
  medications: z.array(z.object({
    medicationId: z.string(),
    medicationName: z.string(),
    quantity: z.number().positive(),
    dosage: z.string(),
    frequency: z.string(),
  })).min(1, "At least one medication is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type MedicationInput = z.infer<typeof medicationSchema>;
export type PrescriptionInput = z.infer<typeof prescriptionSchema>;
