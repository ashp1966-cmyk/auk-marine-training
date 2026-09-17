import { PrismaClient } from "@prisma/client";
import { aukSpm015 } from "./courses/auk-spm-015";
import { us252437 } from "./courses/us-252437";
import { aukS40 } from "./courses/auk-s-40";
import { auk499 } from "./courses/auk-499";
import { aukSpm018 } from "./courses/auk-spm-018";
import { aukSpm023 } from "./courses/auk-spm-023";
import { aukSpm001 } from "./courses/auk-spm-001";
import { us252414 } from "./courses/us-252414";
import { us242987 } from "./courses/us-242987";
const prisma = new PrismaClient();

/**
 * RETIRED COURSES — never recreate these.
 *
 * `db:seed` is a catalogue RESTORE, not an additive load: upsertCourse() creates
 * any course whose row is missing. So deleting a course in the admin UI and then
 * running db:seed to load something else silently resurrects it.
 *
 * Deleting a course is therefore TWO steps:
 *   1. delete the row (admin UI, or prisma/delete-courses.ts)
 *   2. add its code here
 *
 * Without step 2 the deletion is temporary. Codes listed here are skipped by
 * upsertCourse() even if they are still present in the arrays below.
 */
const RETIRED = new Set<string>([
  "AUK S 7",     // Computer Literacy
  "AUK S 9",     // SAP/ERP
  "AUK S 50",    // Digital Transformation & IR 4.0
  "AUK S 55",    // Development Platform
  "AUK S 56",    // Oracle Database & Design with SQL
  "AUK S 58",    // VLSI Design Training & Manufacturing
  "AUK S 60",    // Hybrid, Mobile & Web App Development
  "AUK AUT01",   // Robotics
  "AUK AUT03",   // Mechatronics
  "AUK AUT05",   // Advanced Tool Maintenance & Repair
  "AUK AUT07",   // 3D Design & Printing
  "AUK B12",     // Lean Six Sigma
  "AUK FIN01",   // Financial & Derivative Modelling
  "AUK SK04",    // Presentation Skills (5 P's)
  "AUK SK06",    // Lean Co-creation
  "AUK SK15",    // Confidence & Empathy
  "AUK FIN06",   // Asset Risk Modelling — retired 11 Sep 2026
]);

// Prices in cents (ZAR). Learnership / NQF unit standards = 0 (state-funded).
// Short-skill workshops priced by typical duration.
const P = {
  half:  50000,   // 2-hour session  R 500
  day1:  200000,  // 1 day           R 2 000
  day2:  420000,  // 2 days          R 4 200
  day3:  620000,  // 3 days          R 6 200
  day4:  880000,  // 4 days          R 8 800
  day5: 1050000,  // 5 days          R10 500   <- CHECK: extrapolated, set your own
  free:  0,       // learnership / sponsored
};

async function main() {
  // ─── Provider ────────────────────────────────────────────────────────────────
  const auk = await prisma.provider.upsert({
    where: { id: "auk-marine" },
    update: {},
    create: {
      id: "auk-marine",
      name: "AUK Marine Training",
      tagline: "Accredited training provider · Est. 2012 & 2017",
      location: "Johannesburg, South Africa",
      color: "#12808c",
      verified: true,
    },
  });

  // ─── Site settings ────────────────────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      heroTitle: "Train with people who've",
      heroAccent: "actually done it.",
      heroLead:
        "AUK Marine Training runs the whole journey — browse a course, enrol online, pay securely, and learn through a full LMS. Plus a home for our research lab and a place for facilitators anywhere to teach.",
      badge: "Accredited training provider",
      footerAbout:
        "TETA-accredited service provider · Est. 2012 & 2017. Maritime, mining, logistics, business, IT and soft-skills training delivered fully online from Johannesburg.",
      whatsapp: "+27 61 078 5253",
      fromEmail: "training@auk-maritime.com",
      notifyEmail: "training@auk-maritime.com",
      orgName: "AUK Marine and Mining (Pty) Ltd",
    },
  });

  // ─── Helper ───────────────────────────────────────────────────────────────────
  async function upsertCourse(data: {
    code: string; category: string; title: string; durationLabel: string;
    price: number; featured?: boolean; nqfLevel?: string; credits?: number;
    summary?: string; modes?: string[];
  }) {
    if (RETIRED.has(data.code)) return;   // deliberately removed from the catalogue
    const existing = await prisma.course.findFirst({ where: { code: data.code } });
    if (existing) return;
    await prisma.course.create({
      data: {
        code: data.code,
        title: data.title,
        category: data.category,
        providerId: auk.id,
        durationLabel: data.durationLabel,
        price: data.price,
        nqfLevel: data.nqfLevel || null,
        credits: data.credits || null,
        modes: data.modes || ["virtual", "classroom"],
        featured: data.featured || false,
        published: true,
        summary: data.summary || `${data.title} — a practitioner-led programme from AUK Marine's training team, blending theory with real-world cases and hands-on application.`,
        outcomes: [
          "Understand core concepts and industry context",
          "Apply skills directly to real workplace scenarios",
          "Meet compliance and best-practice standards in the field",
        ],
        modules: [
          { title: "Foundations & context", content: "Orientation, terminology, regulatory landscape, and why this matters in the field today." },
          { title: "Core methods & tools", content: "Step-by-step methods and tools worked through with live examples and case studies." },
          { title: "Applied practice", content: "Exercises, case studies and a practical demonstration walkthrough with group discussion." },
        ],
        practical: { title: "Applied demonstration", description: `Learners complete a guided practical for ${data.title.toLowerCase()}.` },
        photos: [], videos: [], materials: [], quiz: [],
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // SHIPPING, PORT & MARITIME
  // ═══════════════════════════════════════════════════════════════════════════════
  const maritime = [
    { code: "AUK-499",     title: "HELM (Ships) — Management Level",                    durationLabel: "5 days", price: P.day5, featured: true  },
    { code: "AUK SPM 001", title: "Shipping, Port & Ships Agency",                      durationLabel: "3 days", price: P.day3, featured: true  },
    { code: "AUK SPM 011", title: "Smart & Green Shipping",                              durationLabel: "2 days", price: P.day2, featured: true  },
    { code: "AUK SPM 012", title: "Maritime Risk Management",                            durationLabel: "3 days", price: P.day3, featured: true  },
    { code: "AUK S 27",    title: "Marine Salvage",                                      durationLabel: "3 days", price: P.day3                   },
    { code: "AUK SPM 016", title: "On-Board Training — PSC & RightShip Preparation",    durationLabel: "4 days", price: P.day4, featured: true  },
    { code: "AUK S 40",    title: "HELM (Ships)",                                        durationLabel: "2 days", price: P.day2                   },
    { code: "AUK S 41",    title: "Port Operations",                                     durationLabel: "2 days", price: P.day2, featured: true  },
    { code: "AUK SPM 015", title: "ISM, MLC & ISPS Auditor",                            durationLabel: "3 days", price: P.day3                   },
    { code: "AUK S 43",    title: "Ships Pilotage",                                      durationLabel: "4 days", price: P.day4                   },
    { code: "AUK SPM 018", title: "Condition Inspection & Pre-purchase Inspection",      durationLabel: "4 days", price: P.day4                   },
    { code: "AUK S 49",    title: "Port Services",                                       durationLabel: "2 days", price: P.day2                   },
    { code: "AUK SPM 020", title: "Maritime Environmental Management & Marine Salvage",  durationLabel: "2 days", price: P.day2                   },
    { code: "AUK SPM 021", title: "Ocean Economy",                                       durationLabel: "2 days", price: P.day2                   },
    { code: "AUK SPM 022", title: "Vessel Chartering",                                   durationLabel: "2 days", price: P.day2                   },
    { code: "AUK SPM 023", title: "Freight Forwarding",                                  durationLabel: "2 days", price: P.day2                   },
  ];
  for (const c of maritime) await upsertCourse({ ...c, category: "Maritime" });

  // ─── Real content for AUK SPM 015 (overwrites the generic placeholder) ───────
  await prisma.course.updateMany({
    where: { code: "AUK SPM 015" },
    data: {
      modules: aukSpm015.modules,
      quiz: aukSpm015.quiz,
      practical: {
        title: "Practical Demonstration: A Real Car Carrier Audit",
        description: "Grade and report on a real ISM/MLC/ISPS internal audit — plan the audit, sequence a checklist, grade nine real observations, and identify which is not a finding at all.",
      },
    },
  });

  // ─── Real content for US-242987 (overwrites the generic placeholder) ────────
  // Dangerous Goods by Air. Source manual (2009) omits lithium batteries entirely
  // and misstates Class 4. Both corrected. NOTE: this course does NOT qualify a
  // learner to offer dangerous goods for air transport — see Module 15. Do not
  // market it as DG certification.
  await prisma.course.updateMany({
    where: { code: us242987.code },
    data: {
      summary: us242987.summary,
      outcomes: us242987.outcomes,
      modules: us242987.modules,
      quiz: us242987.quiz,
      practical: us242987.practical,
    },
  });

  // ─── Real content for US-252414 (overwrites the generic placeholder) ────────
  // Calculate Customs Values. Source manual (2009) applies VAT at 14%, calls the
  // ATV the "actual" rather than "added" tax value, cites GATT rather than WTO,
  // and carries a transposed-digit error in its mark-up example. All corrected —
  // see the notes in the course file.
  await prisma.course.updateMany({
    where: { code: us252414.code },
    data: {
      summary: us252414.summary,
      outcomes: us252414.outcomes,
      modules: us252414.modules,
      quiz: us252414.quiz,
      practical: us252414.practical,
    },
  });

  // ─── Real content for AUK SPM 001 (overwrites the generic placeholder) ──────
  // Shipping, Port & Ships Agency. Source guide was written for one named client
  // and carried a competitor list and a third party's rate card — all removed.
  // See the source-handling note in the course file.
  await prisma.course.updateMany({
    where: { code: aukSpm001.code },
    data: {
      summary: aukSpm001.summary,
      outcomes: aukSpm001.outcomes,
      modules: aukSpm001.modules,
      quiz: aukSpm001.quiz,
      practical: aukSpm001.practical,
    },
  });

  // ─── Real content for AUK SPM 018 (overwrites the generic placeholder) ──────
  // Condition & pre-purchase inspection. Source guide names an individual
  // learner and cites a second unit standard (SPM 019) — see notes in the file.
  await prisma.course.updateMany({
    where: { code: aukSpm018.code },
    data: {
      summary: aukSpm018.summary,
      outcomes: aukSpm018.outcomes,
      modules: aukSpm018.modules,
      quiz: aukSpm018.quiz,
      practical: aukSpm018.practical,
    },
  });

  // ─── Real content for AUK SPM 023 (overwrites the generic placeholder) ──────
  // Freight Forwarding. Built on SAQA US 252439 but updated throughout — the
  // source manual (2009) teaches liner conferences and Tremcards, and omits
  // VGM, ISPM 15 and the CTU Code. See notes in the course file.
  await prisma.course.updateMany({
    where: { code: aukSpm023.code },
    data: {
      summary: aukSpm023.summary,
      outcomes: aukSpm023.outcomes,
      modules: aukSpm023.modules,
      quiz: aukSpm023.quiz,
      practical: aukSpm023.practical,
    },
  });

  // ─── Real content for AUK S 40 (overwrites the generic placeholder) ──────────
  // HELM Operational Level, IMO Model Course 1.39, STCW A-II/1 & A-III/1.
  // durationLabel corrected: IMO 1.39 is 21 contact hours, not 2 days.
  await prisma.course.updateMany({
    where: { code: aukS40.code },
    data: {
      title: aukS40.title,
      summary: aukS40.summary,
      outcomes: aukS40.outcomes,
      modules: aukS40.modules,
      quiz: aukS40.quiz,
      practical: aukS40.practical,
      durationLabel: aukS40.durationLabel,
    },
  });

  // ─── Real content for AUK-499 (overwrites the generic placeholder) ──────────
  // HELM Management Level, IMO Model Course 1.40, STCW A-II/2 & A-III/2.
  // Prerequisite: AUK S 40 (HELM Operational).
  await prisma.course.updateMany({
    where: { code: auk499.code },
    data: {
      title: auk499.title,
      summary: auk499.summary,
      outcomes: auk499.outcomes,
      modules: auk499.modules,
      quiz: auk499.quiz,
      practical: auk499.practical,
      durationLabel: auk499.durationLabel,
    },
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // INFORMATION TECHNOLOGY
  // ═══════════════════════════════════════════════════════════════════════════════
  const it = [
    { code: "AUK S 12", title: "Data Analytics & AI",                                                         durationLabel: "2 days", price: P.day2, featured: true },
    { code: "AUK S 37", title: "Basic & Advanced Excel",                                                      durationLabel: "1 day",  price: P.day1, featured: true },
    { code: "AUK S 52", title: "Arduino / Raspberry Pi",                                                      durationLabel: "2 days", price: P.day2 },
    { code: "AUK S 54", title: "Introduction to Python",                                                      durationLabel: "2 days", price: P.day2 },
    { code: "AUK S 61", title: "Program Logic Controller Including IOT, SCADA & Human Machine Interface",     durationLabel: "2 days", price: P.day2 },
  ];
  for (const c of it) await upsertCourse({ ...c, category: "IT" });

  // ═══════════════════════════════════════════════════════════════════════════════
  // AUTOMATION & IoT
  // ═══════════════════════════════════════════════════════════════════════════════
  const automation = [
    { code: "AUK AUT02", title: "Automation & IoT",                                       durationLabel: "3 days", price: P.day3, featured: true },
    { code: "AUK AUT04", title: "Process Control Techniques",                             durationLabel: "2 days", price: P.day2 },
    { code: "AUK AUT06", title: "Handling Robotics & Drones",                            durationLabel: "2 days", price: P.day2 },
    { code: "AUK AUT08", title: "Artificial Intelligence / Machine Learning / Data Science / Data Engineering", durationLabel: "2 days", price: P.day2, featured: true },
  ];
  for (const c of automation) await upsertCourse({ ...c, category: "Automation" });

  // ═══════════════════════════════════════════════════════════════════════════════
  // BUSINESS & ENTERPRISE DEVELOPMENT
  // ═══════════════════════════════════════════════════════════════════════════════
  const business = [
    { code: "AUK B01", title: "New Business Model & Value Chain Integration",            durationLabel: "1 day",  price: P.day1 },
    { code: "AUK B02", title: "Green Manufacturing",                                     durationLabel: "2 days", price: P.day2 },
    { code: "AUK B03", title: "Business Management",                                     durationLabel: "4 days", price: P.day4, featured: true },
    { code: "AUK B04", title: "Tariff Modelling",                                        durationLabel: "4 days", price: P.day4 },
    { code: "AUK B05", title: "PPP Process, Technical Assistance & Contractual Documentation", durationLabel: "3 days", price: P.day3 },
    { code: "AUK B06", title: "Business Feasibility",                                    durationLabel: "2 days", price: P.day2 },
    { code: "AUK B07", title: "Entrepreneurship, Business Incubation & Innovation",      durationLabel: "2 days", price: P.day2, featured: true },
    { code: "AUK B08", title: "Market Research, Branding, Marketing & Sales Strategy",   durationLabel: "3 days", price: P.day3 },
    { code: "AUK B09", title: "Product Development & Improvement",                       durationLabel: "2 days", price: P.day2 },
    { code: "AUK B10", title: "Product Export & Compliance",                             durationLabel: "2 days", price: P.day2 },
    { code: "AUK B11", title: "Project Management Skills & Introduction to Scrum",       durationLabel: "2 days", price: P.day2 },
    { code: "AUK B13", title: "Smart Business Models",                                   durationLabel: "1 day",  price: P.day1 },
    { code: "AUK B14", title: "Fund Raising & Investor Readiness",                       durationLabel: "2 days", price: P.day2 },
    { code: "AUK B15", title: "Sector-specific Business Development",                    durationLabel: "2 days", price: P.day2 },
    { code: "AUK B16", title: "Personal Development & Leadership",                       durationLabel: "2 days", price: P.day2 },
  ];
  for (const c of business) await upsertCourse({ ...c, category: "Business" });

  // ═══════════════════════════════════════════════════════════════════════════════
  // FINANCE, CAPITAL & PROJECTS
  // ═══════════════════════════════════════════════════════════════════════════════
  const finance = [
    { code: "AUK S 30",  title: "Financial Sustainability",                              durationLabel: "2 days", price: P.day2 },
    { code: "AUK S 36",  title: "Finance for Non-Finance",                               durationLabel: "1 day",  price: P.day1, featured: true },
    { code: "AUK S 45",  title: "Fund Raising for Small Business",                       durationLabel: "2 days", price: P.day2 },
    { code: "AUK FIN02", title: "Basic & Advanced Excel for Finance",                    durationLabel: "2 days", price: P.day2 },
    { code: "AUK FIN03", title: "Project Finance",                                       durationLabel: "3 days", price: P.day3 },
    { code: "AUK FIN04", title: "Capital Markets",                                       durationLabel: "2 days", price: P.day2 },
    { code: "AUK FIN05", title: "Risk Analysis, Audits & Reporting",                     durationLabel: "2 days", price: P.day2 },
    { code: "AUK FIN07", title: "Equity Valuation & Data Modelling",                     durationLabel: "3 days", price: P.day3 },
  ];
  for (const c of finance) await upsertCourse({ ...c, category: "Finance" });

  // ═══════════════════════════════════════════════════════════════════════════════
  // MINING & OFFSHORE
  // ═══════════════════════════════════════════════════════════════════════════════
  const mining = [
    { code: "AUK S 1",   title: "Mineral Resource Evaluation: Estimation & Reporting",  durationLabel: "2 days", price: P.day2, featured: true },
    { code: "AUK S 4",   title: "Mineral Beneficiation",                                durationLabel: "2 days", price: P.day2 },
    { code: "AUK S 5",   title: "Mining for Non-Mining Executives",                     durationLabel: "2 days", price: P.day2, featured: true },
    { code: "AUK MIN01", title: "Sampling & QAQC of Mine",                              durationLabel: "2 days", price: P.day2 },
    { code: "AUK MIN02", title: "Mine to Mill Reconciliation",                          durationLabel: "2 days", price: P.day2 },
    { code: "AUK MIN03", title: "Oil & Gas",                                            durationLabel: "2 days", price: P.day2 },
    { code: "AUK MIN04", title: "Alloy Manufacturing",                                  durationLabel: "2 days", price: P.day2 },
  ];
  for (const c of mining) await upsertCourse({ ...c, category: "Mining" });

  // ═══════════════════════════════════════════════════════════════════════════════
  // SAFETY, HEALTH & ENVIRONMENT (SHE)
  // ═══════════════════════════════════════════════════════════════════════════════
  const she = [
    { code: "AUK SHE01", title: "Occupational Health & Safety",                         durationLabel: "1 day",  price: P.day1, featured: true },
    { code: "AUK SHE02", title: "Waste Disposal",                                       durationLabel: "2 days", price: P.day2 },
    { code: "AUK SHE03", title: "Environmental Management",                             durationLabel: "2 days", price: P.day2 },
  ];
  for (const c of she) await upsertCourse({ ...c, category: "SHE" });

  // ═══════════════════════════════════════════════════════════════════════════════
  // SOFT SKILLS
  // ═══════════════════════════════════════════════════════════════════════════════
  const softSkills = [
    { code: "AUK SK01", title: "Judgement & Decision Making",                            durationLabel: "1 day",    price: P.day1 },
    { code: "AUK SK02", title: "Art of Assertiveness & Active Listening",                durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK03", title: "Stress Management",                                      durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK05", title: "Negotiation Skills",                                     durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK07", title: "Design & Innovative Thinking",                          durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK08", title: "Mental Well-being for Everyone",                        durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK09", title: "Communication Skills",                                   durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK10", title: "Virtual Management for Success",                         durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK11", title: "Emotional Intelligence, Creativity & Innovation",        durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK12", title: "Growth Mindset & Problem Solving",                      durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK13", title: "Public Speaking",                                        durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK14", title: "Goal Setting, Personal Branding & Image Management",    durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK16", title: "Social Awareness & Interpersonal Skills",               durationLabel: "2 hours",  price: P.half },
    { code: "AUK SK17", title: "Critical Thinking & Creativity",                        durationLabel: "2 hours",  price: P.half },
  ];
  for (const c of softSkills) await upsertCourse({ ...c, category: "Soft Skills" });

  // ═══════════════════════════════════════════════════════════════════════════════
  // TRANSPORT & LOGISTICS (LEARNERSHIP — NQF Level 3 & 4)
  // ═══════════════════════════════════════════════════════════════════════════════
  const logistics = [
    { code: "AUK L01",  title: "Freight Forwarding & Custom Clearance",                  durationLabel: "NQF Level 3 & 4 Learnership", price: P.free, nqfLevel: "Level 3 & 4" },
    { code: "AUK L02",  title: "Rail, Road & Air Transportation",                         durationLabel: "NQF Level 3 & 4 Learnership", price: P.free, nqfLevel: "Level 3 & 4" },
    { code: "AUK L03",  title: "Occupational Health & Safety (Transport)",                durationLabel: "Short course", price: P.day1, nqfLevel: "Level 3" },
    { code: "AUK L04",  title: "Suppliers Development",                                   durationLabel: "Short course", price: P.day2 },
    // Freight Forwarding Unit Standards (from the slides)
    { code: "US-252435", title: "Apply Basic Invoicing & Accounting Principles",          durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6  },
    { code: "US-252417", title: "Apply Geographic Principles in Mapping a Trade Route",   durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 5  },
    { code: "US-252416", title: "Describe & Apply the Customs & Excise Act",             durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6  },
    { code: "US-252413", title: "Regulations & Documentary Requirements for International Trade", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 8 },
    { code: "US-252423", title: "Administration of Freight Forwarding & Clearing Operations", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 5 },
    { code: "US-252429", title: "Explain the Concept of International Trade",            durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6  },
    { code: "US-252415", title: "Equipment & Infrastructure Used in International Transport", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 5 },
    { code: "US-252427", title: "Structure of the Airfreight Forwarding Environment",    durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 4  },
    { code: "US-252424", title: "Structure of the Surface Freight Forwarding Environment", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 4 },
    { code: "US-252440", title: "Carry Out Intermodal Surface Costings",                 durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 5  },
    { code: "US-252434", title: "Classify Commodities According to Customs Tariff",      durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 8  },
    { code: "US-252436", title: "Document & Handle Export Airfreight General Non-hazardous Cargo", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6 },
    { code: "US-252433", title: "Document & Handle Export Surface General Non-hazardous Cargo", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6 },
    { code: "US-252430", title: "Explain & Identify Sea Freight Carriers & Agents",     durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 4  },
    { code: "US-252431", title: "Facilitate Airfreight Clearance & Delivery",           durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 5  },
    { code: "US-252425", title: "Frame & Submit Customs Declarations & Carrier Release Documentation", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 8 },
    { code: "US-252439", title: "Handle Cargo for Import & Export",                     durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6  },
    { code: "US-252418", title: "Administration of Export Transactions",                 durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6  },
    { code: "US-252432", title: "Administration of Import Transactions",                 durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6  },
    { code: "US-252428", title: "Secure Cargo for Airfreight",                          durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 6  },
    { code: "US-252414", title: "Calculate Customs Values",                              durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 7  },
    { code: "US-252421", title: "Calculate Duties on Tax Payable on Internationally Traded Goods", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 5 },
    { code: "US-252422", title: "Calculate Cost of Airfreighting Goods",                durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 5  },
    { code: "US-252437", title: "Interpret & Apply International Commercial Terms (Incoterms)", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 3", credits: 3 },
    { code: "US-242986", title: "Accept & Process Dangerous Goods for Transportation by Air", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 4", credits: 6 },
    { code: "US-120020", title: "Apply Knowledge of Insurance to the Transportation of a Consignment", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 4", credits: 3 },
    { code: "US-242991", title: "Facilitate the Forwarding & Clearing of Dangerous Goods for Transportation", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 4", credits: 4 },
    { code: "US-242996", title: "Handle Dangerous Goods During Warehousing & Storage",  durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 4", credits: 4  },
    { code: "US-242987", title: "Identify, Pack, Mark & Label Dangerous Goods for Transportation by Air", durationLabel: "Unit Standard", price: P.free, nqfLevel: "Level 4", credits: 2 },
  ];
  for (const c of logistics) await upsertCourse({ ...c, category: "Logistics", modes: ["online"] });

  // ─── Real content for US-252437 (overwrites the generic placeholder) ─────────
  // Incoterms 2020, with a legacy annex covering the 13 Incoterms 2000 terms.
  // nqfLevel and credits are already set by the logistics array above.
  await prisma.course.updateMany({
    where: { code: us252437.code },
    data: {
      summary: us252437.summary,
      outcomes: us252437.outcomes,
      modules: us252437.modules,
      quiz: us252437.quiz,
      practical: us252437.practical,
    },
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // FACILITATORS
  // ═══════════════════════════════════════════════════════════════════════════════
  const facilitators = [
    {
      id: "capt-ashwani",
      name: "Captain Ashwani Pathak",
      role: "Lead Facilitator, Mentor & Assessor",
      country: "South Africa",
      years: 37,
      expertise: ["Maritime", "Business", "Finance", "Oil & Gas", "Mining", "Ports"],
      bio: "MBA-Marketing (University of Luton, UK), B-Tech Business (Natal Technikon), Class-1 Master F.G., Certificate of Competency, Marine Pilotage, Graduate Nautical Science (T.S. Rajendra), Accredited Assessor. Over 37 years of extensive experience across maritime, shipping, logistics, transport, ports, oil & gas, mining, power, and skills development. Survived two air crashes — making his life experience genuinely unparalleled.",
    },
    {
      id: "kalpana-pathak",
      name: "Kalpana Pathak",
      role: "Training Coordinator",
      country: "South Africa",
      years: 5,
      expertise: ["Business", "Soft Skills", "Administration"],
      bio: "Coordinates all bookings, learner onboarding, scheduling, and programme administration across AUK Marine's training programmes.",
    },
    {
      id: "sello-mathudi",
      name: "Sello Mathudi",
      role: "Business Consultant & Market Strategy Expert",
      country: "South Africa",
      years: 20,
      expertise: ["Business", "Marketing", "Sales", "Entrepreneurship"],
      bio: "PGDM – Marketing. Professional entrepreneur and expert salesman with over 20 years of experience in sales, marketing and training. Sello provides training and skills development in marketing, sales and entrepreneurship.",
    },
    {
      id: "ronnie-mabena",
      name: "Ronnie Wilfred Sipho Mabena",
      role: "Public Management & Digital Marketing Specialist",
      country: "South Africa",
      years: 25,
      expertise: ["Business", "Digital Marketing", "Public Administration", "Cyber Security"],
      bio: "Post Graduate Wits School of Governance (MAP 32), Digital Marketing Academy UK, Google Digital Marketing Skills Africa, Public Management & DM Wits School of Governance. Professional entrepreneur with decades of rich experience in politics, public administration, business and cyber security.",
    },
    {
      id: "deepak-reddy",
      name: "Deepak Reddy",
      role: "IT & IoT Expert",
      country: "USA",
      years: 20,
      expertise: ["IT", "IoT", "Automation", "Finance Systems"],
      bio: "BE Electronics, MBA in Finance & Systems (USA). Highly knowledgeable IT expert with 20+ years of high-level global experience in the IT field. Currently based in the United States. Partner in 3CIoT Solutions along with AUK Marine and Mining.",
    },
    {
      id: "shawn-mahashi",
      name: "Shawn Mahashi",
      role: "International & Technical Sales Expertise",
      country: "South Africa",
      years: 4,
      expertise: ["Business", "Sales", "Marketing", "Logistics"],
      bio: "B. Mechanical Engineering (Nilai University), Entrepreneurship Mentee at AUK Marine Research & Training Academy. Over 4 years of expertise in international technical sales and marketing, with experience in transport logistics, trading, training and marketing.",
    },
  ];
  for (const f of facilitators) {
    await prisma.facilitator.upsert({
      where: { id: f.id },
      update: {},
      create: { ...f, availability: ["virtual", "classroom"], status: "active" },
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // RESEARCH LAB — all AUK sectors
  // ═══════════════════════════════════════════════════════════════════════════════
  const researchProjects = [
    {
      title: "Maritime Decarbonisation & Green Shipping in Africa",
      field: "Maritime · Ocean Economy",
      status: "Active",
      abstract: "Investigating pathways for African shipping companies to transition to low-emission fuels and green port operations, aligned with IMO 2050 targets. Focused on practical implementation for South African ports.",
      lead: "Captain Ashwani Pathak",
      seeking: "Data partners, shipping lines, port operators, academic collaborators",
    },
    {
      title: "Port Digitalisation & Smart Port Development",
      field: "Maritime · IT",
      status: "Active",
      abstract: "Research into the adoption of digital tools — IoT sensors, automated cargo tracking, and AI-based scheduling — in Southern African port operations to increase efficiency and reduce turnaround times.",
      lead: "AUK Marine Training",
      seeking: "Port operators, technology partners, funding institutions",
    },
    {
      title: "Mineral Beneficiation & Value-addition in the African Mining Sector",
      field: "Mining",
      status: "Recruiting",
      abstract: "Examining the economic and technical viability of processing raw minerals closer to the point of extraction across sub-Saharan Africa, reducing raw commodity export dependency and increasing local value creation.",
      lead: "AUK Marine Training",
      seeking: "Mining companies, metallurgical engineers, government partners",
    },
    {
      title: "Freight Forwarding Skills Gap & Learnership Outcomes",
      field: "Logistics · Transport",
      status: "Active",
      abstract: "Measuring the employment impact and skills retention outcomes of TETA NQF Level 3 & 4 learnerships in freight forwarding and customs clearing, specifically in the Gauteng and KZN corridors.",
      lead: "AUK Marine Training",
      seeking: "Employers in freight, customs, and logistics; SETA data partners",
    },
    {
      title: "SMME Export Readiness & Global Market Entry",
      field: "Business · Export & Import",
      status: "Active",
      abstract: "Assessing barriers to export for South African SMMEs across sectors including agriculture, automotive, and manufacturing. Developing a practical export readiness framework based on DTIC programme outcomes.",
      lead: "AUK Marine Training",
      seeking: "SMMEs willing to participate, DTIC, trade facilitation bodies",
    },
    {
      title: "4IR & Automation Adoption in African Manufacturing",
      field: "Automation · IT · IoT",
      status: "Planning",
      abstract: "Studying the pace and nature of Industry 4.0 technology adoption (IoT, robotics, AI, 3D printing) in South African manufacturing, automotive, and mining sectors, and developing training responses to the resulting skills gap.",
      lead: "AUK Marine Training",
      seeking: "Manufacturing firms, technology vendors, academic partners",
    },
    {
      title: "Oil & Gas Skills Development for the East African Energy Sector",
      field: "Mining · Oil & Gas",
      status: "Planning",
      abstract: "With significant offshore discoveries in Mozambique and Tanzania, this project maps the skills requirements of the emerging East African energy sector and develops training frameworks to build local capacity.",
      lead: "AUK Marine Training",
      seeking: "Energy companies, government bodies, regional training institutions",
    },
    {
      title: "Infrastructure Finance & PPP Models in African Transport",
      field: "Finance · Infrastructure",
      status: "Recruiting",
      abstract: "Analysing Public-Private Partnership structures applied to road, rail, and port infrastructure in sub-Saharan Africa — specifically evaluating risk allocation, funding mechanisms, and long-term outcomes.",
      lead: "Captain Ashwani Pathak",
      seeking: "Development finance institutions, infrastructure project sponsors, government",
    },
    {
      title: "Entrepreneurship & Business Incubation Success Factors",
      field: "Business · Entrepreneurship",
      status: "Active",
      abstract: "Longitudinal study tracking the outcomes of business incubation mentorship programmes delivered through AUK Marine, the Durban University of Technology, and SEFA, measuring enterprise survival, revenue growth, and job creation.",
      lead: "AUK Marine Training",
      seeking: "Incubation programme graduates, funding partners, universities",
    },
    {
      title: "Agricultural Export Supply Chain Efficiency",
      field: "Logistics · Agriculture",
      status: "Planning",
      abstract: "Investigating bottlenecks in the agricultural export supply chain from smallholder farm to port, with specific attention to cold chain logistics, customs compliance, and PPECB certification requirements.",
      lead: "AUK Marine Training",
      seeking: "Agricultural exporters, cold chain logistics providers, customs agents",
    },
    {
      title: "Cyber Security Readiness in African Maritime & Ports",
      field: "Maritime · IT · Cyber Security",
      status: "Planning",
      abstract: "Assessing cyber security preparedness across Southern African port authorities, shipping companies, and freight forwarders in light of growing threat exposure, with recommendations for training and policy.",
      lead: "Ronnie Wilfred Sipho Mabena",
      seeking: "Port authorities, shipping companies, IT security firms",
    },
    {
      title: "Ships Pilotage Competency Standards for African Waters",
      field: "Maritime",
      status: "Active",
      abstract: "Developing evidence-based competency standards for marine pilots operating in uniquely challenging African ports and waterways, including recommendations for simulation-based training methodologies.",
      lead: "Captain Ashwani Pathak",
      seeking: "Port authorities, SAMSA, marine pilots, harbour masters",
    },
  ];

  for (const r of researchProjects) {
    const existing = await prisma.research.findFirst({ where: { title: r.title } });
    if (!existing) {
      await prisma.research.create({
        data: { ...r, collaborators: [], providerId: auk.id },
      });
    }
  }

  // ─── Count summary ────────────────────────────────────────────────────────────
  const courseTotals = await prisma.course.groupBy({ by: ["category"], _count: { id: true } });
  console.log("\n✓ Seed complete.\n");
  if (RETIRED.size) console.log(`(${RETIRED.size} retired course codes skipped)\n`);
  console.log("Courses seeded by category:");
  courseTotals.forEach((c) => console.log(`  ${c.category.padEnd(16)} ${c._count.id}`));
  const total = courseTotals.reduce((s, c) => s + c._count.id, 0);
  console.log(`  ${"TOTAL".padEnd(16)} ${total}`);
  const resCount = await prisma.research.count();
  const facCount = await prisma.facilitator.count();
  console.log(`\nResearch projects: ${resCount}`);
  console.log(`Facilitators:      ${facCount}`);

  // Hand-authored content — confirms the updateMany blocks actually landed.
  // A row with 3 modules is still on the generic placeholder.
  const authored = await prisma.course.findMany({
    where: { code: { in: [aukSpm001.code, aukSpm015.code, us252414.code, us242987.code, aukSpm018.code, aukSpm023.code, us252437.code, aukS40.code, auk499.code] } },
    select: { code: true, modules: true, quiz: true },
  });
  console.log("\nHand-authored content:");
  for (const c of authored) {
    const m = Array.isArray(c.modules) ? c.modules.length : 0;
    const q = Array.isArray(c.quiz) ? c.quiz.length : 0;
    console.log(`  ${c.code.padEnd(14)} ${m} modules, ${q} quiz questions`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
