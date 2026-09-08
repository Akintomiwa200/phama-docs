import type { Medication, SalesData, InventoryData, DashboardStats, ChartDataPoint } from "./types";

export const NAV_ITEMS = [
  { label: "Dictionary", href: "/dashboard" },
  { label: "Drugs", href: "/medications" },
  { label: "Library", href: "/reports" },
  { label: "Insights", href: "/analytics" },
  { label: "Settings", href: "/settings" },
] as const;

export const DASHBOARD_STATS: DashboardStats = {
  totalTerms: 12486,
  monthlyLookups: 92140,
  libraryArticles: 1824,
  drugEntries: 3120,
  termsChange: 12.5,
  lookupsChange: 8.3,
  articlesChange: 15.2,
  drugsChange: 4.6,
};

export const SALES_DATA: SalesData[] = [
  { date: "Jan", revenue: 18500, orders: 1420, profit: 520 },
  { date: "Feb", revenue: 22300, orders: 1680, profit: 680 },
  { date: "Mar", revenue: 19800, orders: 1550, profit: 590 },
  { date: "Apr", revenue: 24100, orders: 1890, profit: 720 },
  { date: "May", revenue: 21600, orders: 1720, profit: 640 },
  { date: "Jun", revenue: 28900, orders: 2150, profit: 870 },
  { date: "Jul", revenue: 26400, orders: 1980, profit: 790 },
  { date: "Aug", revenue: 30200, orders: 2310, profit: 910 },
  { date: "Sep", revenue: 27800, orders: 2080, profit: 830 },
  { date: "Oct", revenue: 32500, orders: 2480, profit: 980 },
  { date: "Nov", revenue: 29100, orders: 2200, profit: 870 },
  { date: "Dec", revenue: 35800, orders: 2720, profit: 1080 },
];

export const INVENTORY_DATA: InventoryData[] = [
  { category: "Cardiology", complete: 45, partial: 12, missing: 3 },
  { category: "Neurology", complete: 62, partial: 8, missing: 1 },
  { category: "Oncology", complete: 38, partial: 15, missing: 5 },
  { category: "Endocrinology", complete: 29, partial: 6, missing: 2 },
  { category: "Infectious Diseases", complete: 41, partial: 10, missing: 4 },
  { category: "Pulmonology", complete: 35, partial: 9, missing: 2 },
];

export const CATEGORY_DISTRIBUTION: ChartDataPoint[] = [
  { name: "Cardiology", value: 28, fill: "#f43f5e" },
  { name: "Neurology", value: 22, fill: "#fb7185" },
  { name: "Oncology", value: 18, fill: "#fda4af" },
  { name: "Endocrinology", value: 12, fill: "#fecdd3" },
  { name: "Infectious Diseases", value: 10, fill: "#ffe4e6" },
  { name: "Pulmonology", value: 10, fill: "#fff1f2" },
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

export const ARTICLES_BY_SPECIALTY: ChartDataPoint[] = [
  { name: "Cardiology", value: 320, fill: "#22d3ee" },
  { name: "Neurology", value: 890, fill: "#06b6d4" },
  { name: "Oncology", value: 1240, fill: "#0891b2" },
  { name: "Endocrinology", value: 980, fill: "#0e7490" },
  { name: "Infectious Diseases", value: 1090, fill: "#155e75" },
];

export const REVIEW_RELIABILITY = [
  { name: "Editor A", score: 92, fill: "#22c55e" },
  { name: "Editor B", score: 78, fill: "#eab308" },
  { name: "Editor C", score: 85, fill: "#22c55e" },
  { name: "Editor D", score: 65, fill: "#ef4444" },
  { name: "Editor E", score: 88, fill: "#22c55e" },
];

export const SAMPLE_MEDICATIONS: Medication[] = [
  { id: "1", name: "Amoxicillin 500mg", category: "Antibiotic", dosage: "500mg", price: 12.99, stock: 245, expiryDate: "2025-06-15", manufacturer: "PharmaCorp" },
  { id: "2", name: "Paracetamol 500mg", category: "Analgesic", dosage: "500mg", price: 5.49, stock: 520, expiryDate: "2025-12-20", manufacturer: "MediLab" },
  { id: "3", name: "Omeprazole 20mg", category: "Proton Pump Inhibitor", dosage: "20mg", price: 15.99, stock: 180, expiryDate: "2025-09-10", manufacturer: "GastroPharm" },
  { id: "4", name: "Metformin 850mg", category: "Biguanide", dosage: "850mg", price: 8.99, stock: 310, expiryDate: "2025-08-25", manufacturer: "CardioMed" },
  { id: "5", name: "Amlodipine 5mg", category: "Calcium Channel Blocker", dosage: "5mg", price: 11.49, stock: 22, expiryDate: "2025-07-30", manufacturer: "CardioMed" },
  { id: "6", name: "Cetirizine 10mg", category: "Antihistamine", dosage: "10mg", price: 7.99, stock: 410, expiryDate: "2026-01-15", manufacturer: "AllergyFree" },
  { id: "7", name: "Azithromycin 250mg", category: "Antibiotic", dosage: "250mg", price: 18.99, stock: 8, expiryDate: "2025-11-05", manufacturer: "PharmaCorp" },
  { id: "8", name: "Losartan 50mg", category: "Angiotensin II Receptor Blocker", dosage: "50mg", price: 13.49, stock: 195, expiryDate: "2025-10-20", manufacturer: "CardioMed" },
  { id: "9", name: "Ibuprofen 400mg", category: "NSAID", dosage: "400mg", price: 6.99, stock: 380, expiryDate: "2026-03-10", manufacturer: "MediLab" },
  { id: "10", name: "Pantoprazole 40mg", category: "Proton Pump Inhibitor", dosage: "40mg", price: 14.99, stock: 155, expiryDate: "2025-09-28", manufacturer: "GastroPharm" },
];

export const CHART_COLORS = {
  primary: "#f43f5e",
  secondary: "#fb7185",
  tertiary: "#fda4af",
  success: "#22c55e",
  warning: "#eab308",
  danger: "#ef4444",
  info: "#06b6d4",
  muted: "#94a3b8",
};