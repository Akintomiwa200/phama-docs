export interface Medication {
  id: string;
  name: string;
  category: string;
  dosage: string;
  price: number;
  stock: number;
  expiryDate: string;
  manufacturer: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  medications: PrescriptionItem[];
  status: "pending" | "dispensed" | "cancelled";
}

export interface PrescriptionItem {
  medicationId: string;
  medicationName: string;
  quantity: number;
  dosage: string;
  frequency: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  phone: string;
  email: string;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  profit: number;
}

export interface InventoryData {
  category: string;
  complete: number;
  partial: number;
  missing: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface DashboardStats {
  totalTerms: number;
  monthlyLookups: number;
  libraryArticles: number;
  drugEntries: number;
  termsChange: number;
  lookupsChange: number;
  articlesChange: number;
  drugsChange: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
