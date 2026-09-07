import type { Medication, SalesData, InventoryData, DashboardStats, ChartDataPoint } from "./types";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Medications", href: "/medications" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
] as const;

export const DASHBOARD_STATS: DashboardStats = {
  totalRevenue: 284520,
  totalOrders: 1842,
  totalPatients: 4521,
  totalMedications: 312,
  revenueChange: 12.5,
  ordersChange: 8.3,
  patientsChange: 15.2,
  medicationsChange: -2.1,
};

export const SALES_DATA: SalesData[] = [
  { date: "Jan", revenue: 18500, orders: 142, profit: 5200 },
  { date: "Feb", revenue: 22300, orders: 168, profit: 6800 },
  { date: "Mar", revenue: 19800, orders: 155, profit: 5900 },
  { date: "Apr", revenue: 24100, orders: 189, profit: 7200 },
  { date: "May", revenue: 21600, orders: 172, profit: 6400 },
  { date: "Jun", revenue: 28900, orders: 215, profit: 8700 },
  { date: "Jul", revenue: 26400, orders: 198, profit: 7900 },
  { date: "Aug", revenue: 30200, orders: 231, profit: 9100 },
  { date: "Sep", revenue: 27800, orders: 208, profit: 8300 },
  { date: "Oct", revenue: 32500, orders: 248, profit: 9800 },
  { date: "Nov", revenue: 29100, orders: 220, profit: 8700 },
  { date: "Dec", revenue: 35800, orders: 272, profit: 10800 },
];

export const INVENTORY_DATA: InventoryData[] = [
  { category: "Antibiotics", inStock: 45, lowStock: 12, outOfStock: 3 },
  { category: "Analgesics", inStock: 62, lowStock: 8, outOfStock: 1 },
  { category: "Cardiovascular", inStock: 38, lowStock: 15, outOfStock: 5 },
  { category: "Dermatology", inStock: 29, lowStock: 6, outOfStock: 2 },
  { category: "Gastrointestinal", inStock: 41, lowStock: 10, outOfStock: 4 },
  { category: "Respiratory", inStock: 35, lowStock: 9, outOfStock: 2 },
];

export const CATEGORY_DISTRIBUTION: ChartDataPoint[] = [
  { name: "Antibiotics", value: 28, fill: "#6366f1" },
  { name: "Analgesics", value: 22, fill: "#8b5cf6" },
  { name: "Cardiovascular", value: 18, fill: "#a78bfa" },
  { name: "Dermatology", value: 12, fill: "#c4b5fd" },
  { name: "Gastrointestinal", value: 10, fill: "#ddd6fe" },
  { name: "Respiratory", value: 10, fill: "#ede9fe" },
];

export const TOP_MEDICATIONS: ChartDataPoint[] = [
  { name: "Amoxicillin", value: 1240 },
  { name: "Paracetamol", value: 1180 },
  { name: "Omeprazole", value: 980 },
  { name: "Metformin", value: 870 },
  { name: "Amlodipine", value: 760 },
  { name: "Cetirizine", value: 690 },
  { name: "Azithromycin", value: 620 },
  { name: "Losartan", value: 580 },
];

export const WEEKLY_TRAFFIC: ChartDataPoint[] = [
  { name: "Mon", value: 420 },
  { name: "Tue", value: 380 },
  { name: "Wed", value: 510 },
  { name: "Thu", value: 460 },
  { name: "Fri", value: 590 },
  { name: "Sat", value: 720 },
  { name: "Sun", value: 340 },
];

export const MONTHLY_PRESCRIPTIONS: ChartDataPoint[] = [
  { name: "Week 1", value: 320 },
  { name: "Week 2", value: 280 },
  { name: "Week 3", value: 350 },
  { name: "Week 4", value: 290 },
];

export const PERFORMANCE_DATA = [
  { name: "Q1", target: 40000, actual: 38500 },
  { name: "Q2", target: 45000, actual: 47200 },
  { name: "Q3", target: 50000, actual: 48900 },
  { name: "Q4", target: 55000, actual: 52100 },
];

export const PATIENT_AGE_DISTRIBUTION: ChartDataPoint[] = [
  { name: "0-18", value: 320, fill: "#22d3ee" },
  { name: "19-35", value: 890, fill: "#06b6d4" },
  { name: "36-50", value: 1240, fill: "#0891b2" },
  { name: "51-65", value: 980, fill: "#0e7490" },
  { name: "65+", value: 1090, fill: "#155e75" },
];

export const SUPPLIER_RELIABILITY = [
  { name: "Supplier A", score: 92, fill: "#22c55e" },
  { name: "Supplier B", score: 78, fill: "#eab308" },
  { name: "Supplier C", score: 85, fill: "#22c55e" },
  { name: "Supplier D", score: 65, fill: "#ef4444" },
  { name: "Supplier E", score: 88, fill: "#22c55e" },
];

export const SAMPLE_MEDICATIONS: Medication[] = [
  { id: "1", name: "Amoxicillin 500mg", category: "Antibiotics", dosage: "500mg", price: 12.99, stock: 245, expiryDate: "2025-06-15", manufacturer: "PharmaCorp" },
  { id: "2", name: "Paracetamol 500mg", category: "Analgesics", dosage: "500mg", price: 5.49, stock: 520, expiryDate: "2025-12-20", manufacturer: "MediLab" },
  { id: "3", name: "Omeprazole 20mg", category: "Gastrointestinal", dosage: "20mg", price: 15.99, stock: 180, expiryDate: "2025-09-10", manufacturer: "GastroPharm" },
  { id: "4", name: "Metformin 850mg", category: "Cardiovascular", dosage: "850mg", price: 8.99, stock: 310, expiryDate: "2025-08-25", manufacturer: "CardioMed" },
  { id: "5", name: "Amlodipine 5mg", category: "Cardiovascular", dosage: "5mg", price: 11.49, stock: 22, expiryDate: "2025-07-30", manufacturer: "CardioMed" },
  { id: "6", name: "Cetirizine 10mg", category: "Respiratory", dosage: "10mg", price: 7.99, stock: 410, expiryDate: "2026-01-15", manufacturer: "AllergyFree" },
  { id: "7", name: "Azithromycin 250mg", category: "Antibiotics", dosage: "250mg", price: 18.99, stock: 8, expiryDate: "2025-11-05", manufacturer: "PharmaCorp" },
  { id: "8", name: "Losartan 50mg", category: "Cardiovascular", dosage: "50mg", price: 13.49, stock: 195, expiryDate: "2025-10-20", manufacturer: "CardioMed" },
  { id: "9", name: "Ibuprofen 400mg", category: "Analgesics", dosage: "400mg", price: 6.99, stock: 380, expiryDate: "2026-03-10", manufacturer: "MediLab" },
  { id: "10", name: "Pantoprazole 40mg", category: "Gastrointestinal", dosage: "40mg", price: 14.99, stock: 155, expiryDate: "2025-09-28", manufacturer: "GastroPharm" },
];

export const CHART_COLORS = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  tertiary: "#a78bfa",
  success: "#22c55e",
  warning: "#eab308",
  danger: "#ef4444",
  info: "#06b6d4",
  muted: "#94a3b8",
};
