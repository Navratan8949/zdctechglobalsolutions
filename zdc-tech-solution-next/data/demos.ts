export interface DemoCredential {
  role: string;
  username: string;
  password: string;
  notes?: string;
}

export interface DemoItem {
  id?: string;
  _id?: string;
  title: string;
  demoType?: string;
  description: string;
  image?: {
    public_id?: string;
    url?: string;
  } | string;
  liveUrl: string;
  credentials: DemoCredential[];
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const fallbackDemos: DemoItem[] = [
  {
    _id: "demo-ecommerce-pro",
    id: "demo-ecommerce-pro",
    title: "Multi-Vendor E-Commerce Platform",
    demoType: "E-Commerce Marketplace",
    description: "Full-scale online store featuring multi-vendor catalog, cart, checkout, payment gateway integration, and order management dashboard.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    },
    liveUrl: "https://demo-ecommerce.zdctechglobalsolutions.com",
    credentials: [
      {
        role: "Super Admin",
        username: "admin@zdc.com",
        password: "Admin@2026",
        notes: "Storewide controls, payouts & settings",
      },
      {
        role: "Customer / Buyer",
        username: "customer@zdc.com",
        password: "Customer@2026",
        notes: "Front-end buyer experience & orders",
      },
    ],
    order: 1,
    isActive: true,
  },
  {
    _id: "demo-enterprise-one-erp",
    id: "demo-enterprise-one-erp",
    title: "Enterprise Cloud ERP Suite",
    demoType: "ERP & Accounting",
    description: "Integrated business management suite covering finance, ledger accounts, inventory warehouse stock, and automated billing.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    liveUrl: "https://demo-erp.zdctechglobalsolutions.com",
    credentials: [
      {
        role: "Finance Director",
        username: "finance@zdc.com",
        password: "Finance@2026",
        notes: "P&L access & financial reports",
      },
      {
        role: "Warehouse Manager",
        username: "warehouse@zdc.com",
        password: "Stock@2026",
        notes: "Stock allocation & purchase orders",
      },
    ],
    order: 2,
    isActive: true,
  },
  {
    _id: "demo-medicare-portal",
    id: "demo-medicare-portal",
    title: "Hospital & Healthcare Management Portal",
    demoType: "Healthcare Portal",
    description: "Clinical management system with doctor appointment booking, patient health records (EHR), OPD queues, and pharmacy billing.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    },
    liveUrl: "https://demo-medicare.zdctechglobalsolutions.com",
    credentials: [
      {
        role: "Doctor",
        username: "doctor@zdc.com",
        password: "Doctor@2026",
        notes: "Patient records & digital prescriptions",
      },
      {
        role: "Reception / Billing",
        username: "reception@zdc.com",
        password: "Clinic@2026",
        notes: "Token queue & billing desk",
      },
    ],
    order: 3,
    isActive: true,
  },
  {
    _id: "demo-hrms-payroll-hub",
    id: "demo-hrms-payroll-hub",
    title: "HRMS & Global Payroll Hub",
    demoType: "HR & Payroll",
    description: "Workforce software that automates monthly salaries, attendance clocking, leave requests, appraisals, and employee self-service.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    },
    liveUrl: "https://demo-hrms.zdctechglobalsolutions.com",
    credentials: [
      {
        role: "HR Administrator",
        username: "hrmanager@zdc.com",
        password: "HrAdmin@2026",
        notes: "Payroll run & employee management",
      },
      {
        role: "Employee",
        username: "john.doe@zdc.com",
        password: "Employee@2026",
        notes: "Leave requests & payslip downloads",
      },
    ],
    order: 4,
    isActive: true,
  },
  {
    _id: "demo-educampus-lms",
    id: "demo-educampus-lms",
    title: "School & University Campus LMS",
    demoType: "EdTech & Education",
    description: "Academic administration portal with student admission, examination grading, fee collection, timetables, and teacher/parent access.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    },
    liveUrl: "https://demo-educampus.zdctechglobalsolutions.com",
    credentials: [
      {
        role: "Principal / Admin",
        username: "principal@zdc.com",
        password: "Campus@2026",
        notes: "Academic administration & fee reports",
      },
      {
        role: "Teacher / Faculty",
        username: "teacher@zdc.com",
        password: "Class@2026",
        notes: "Attendance & grading",
      },
    ],
    order: 5,
    isActive: true,
  },
  {
    _id: "demo-leadpulse-crm",
    id: "demo-leadpulse-crm",
    title: "Intelligent Sales CRM & Lead Pipeline",
    demoType: "CRM & Sales",
    description: "Customer relationship management system featuring lead Kanban boards, automated WhatsApp follow-ups, and sales team KPI tracking.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    },
    liveUrl: "https://demo-crm.zdctechglobalsolutions.com",
    credentials: [
      {
        role: "Sales Head",
        username: "saleshead@zdc.com",
        password: "Sales@2026",
        notes: "Pipeline revenue & team KPIs",
      },
      {
        role: "Sales Executive",
        username: "rep@zdc.com",
        password: "Pipeline@2026",
        notes: "Assigned leads & call logs",
      },
    ],
    order: 6,
    isActive: true,
  },
];
