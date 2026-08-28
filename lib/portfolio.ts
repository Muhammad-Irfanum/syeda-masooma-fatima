export type Education = { degree: string; org: string; year: string; result: string };
export type Credential = { title: string; issuer: string; image: string };
export type GalleryImage = { title: string; image: string };
export type SkillGroup = { title: string; subtitle: string; items: string[] };

export type PortfolioData = {
  hero: { tagline: string; photo: string };
  about: string;
  contact: { email: string; phone: string; location: string };
  personal: [string, string][];
  skills: SkillGroup[];
  responsibilities: string[];
  education: Education[];
  credentials: Credential[];
  gallery: GalleryImage[];
};

export const STORAGE_KEY = "smf-portfolio-data-v2";

export const defaults: PortfolioData = {
  hero: {
    tagline: "10+ years of experience empowering children with special needs through patient, individualised education.",
    photo: "",
  },
  about: "Dedicated and experienced Special Education Teacher with over 10 years of teaching experience at Army Special Education School (ASES), Kohat Cantt. Skilled in inclusive education, classroom management, MS Office, and educational administration. Passionate about supporting children with special needs and committed to professional excellence.",
  contact: {
    email: "syedafatima2106@gmail.com",
    phone: "0334-7957005",
    location: "Mohallah Lado Village, P/O Usterzai Payan, District Kohat",
  },
  personal: [
    ["Date of birth", "21 June 1993"],
    ["Gender", "Female"],
    ["Nationality", "Pakistani"],
    ["Religion", "Islam"],
    ["Domicile", "Kohat"],
    ["Languages", "English, Urdu, Pashto"],
  ],
  skills: [
    { title: "Inclusive Practice", subtitle: "Professional core", items: ["Classroom Management", "Special Education Techniques", "Documentation & Record Keeping", "Communication Skills"] },
    { title: "Digital Fluency", subtitle: "Technical capability", items: ["MS Office", "Office Automation", "One-Year Computer Diploma"] },
    { title: "Human Strengths", subtitle: "Ways of working", items: ["Creative Problem Solving", "Emotional Intelligence", "Collaboration & Teamwork", "Patient and Empathetic"] },
  ],
  responsibilities: [
    "Teaching children with special needs",
    "Preparing Individual Education Plans (IEPs)",
    "Classroom management and student assessment",
    "Parent counselling and progress reporting",
    "Organising educational activities and awareness programs",
  ],
  education: [
    { degree: "M.A Urdu", org: "Kohat University of Science & Technology (KUST)", year: "2021", result: "581/1100 · 53%" },
    { degree: "M.A Special Education", org: "Allama Iqbal Open University (AIOU)", year: "2019", result: "1284/2050 · 64%" },
    { degree: "M.Sc Chemistry", org: "KUST", year: "2015", result: "2.99/4.00 CGPA · 69.83%" },
    { degree: "B.Sc", org: "KUST", year: "2013", result: "330/550 · 60%" },
    { degree: "F.Sc (Pre-Medical)", org: "BISE Kohat", year: "2011", result: "715/1100 · 65%" },
    { degree: "Matric (Science)", org: "BISE Kohat", year: "2009", result: "619/1050 · 59%" },
  ],
  credentials: [
    { title: "Best Teacher Award", issuer: "Army Special Education School, Kohat", image: "" },
    { title: "Certificate of Appreciation", issuer: "Army Special Education School", image: "" },
    { title: "IDPD Participation", issuer: "International Day of Persons with Disabilities", image: "" },
    { title: "Directorate Training", issuer: "FG Educational Institutions", image: "" },
    { title: "Inclusive Education Training", issuer: "Professional Development", image: "" },
    { title: "Child Protection Workshops", issuer: "Educational Development", image: "" },
    { title: "Development Certificates", issuer: "Multiple professional programs", image: "" },
  ],
  gallery: [],
};

export function cloneDefaults(): PortfolioData {
  return JSON.parse(JSON.stringify(defaults)) as PortfolioData;
}

export function readPortfolio(): PortfolioData {
  if (typeof window === "undefined") return cloneDefaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...cloneDefaults(), ...JSON.parse(raw) } : cloneDefaults();
  } catch {
    return cloneDefaults();
  }
}
