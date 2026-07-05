import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const auk = await prisma.provider.upsert({
    where: { id: "auk-marine" },
    update: {},
    create: {
      id: "auk-marine",
      name: "AUK Marine Training",
      tagline: "Accredited training provider · Est. 2012",
      location: "Johannesburg, ZA",
      color: "#12808c",
      verified: true,
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      heroLead:
        "The AUK Marine platform runs the whole journey — browse a course, book it virtual or in-classroom, pay, and learn — plus a home for our research lab and a place for facilitators anywhere to teach.",
      footerAbout:
        "Accredited training service provider · Est. 2012 & 2017. Maritime, mining, logistics, business, IT and soft-skills training delivered online, in-classroom, and on site.",
    },
  });

  const courses = [
    { code: "AUK SPM 001", category: "Maritime", title: "Shipping, Port & Ships Agency", durationLabel: "3 days", price: 620000, featured: true },
    { code: "AUK SPM 012", category: "Maritime", title: "Maritime Risk Management", durationLabel: "3 days", price: 600000, featured: true },
    { code: "AUK SPM 016", category: "Maritime", title: "On-Board Training — PSC & RightShip Preparation", durationLabel: "4 days", price: 980000, featured: true },
    { code: "AUK S 41", category: "Maritime", title: "Port Operations", durationLabel: "2 days", price: 420000, featured: true },
    { code: "AUK S 12", category: "IT", title: "Data Analytics & AI", durationLabel: "2 days", price: 520000, featured: true },
    { code: "AUK S 37", category: "IT", title: "Basic & Advanced Excel", durationLabel: "1 day", price: 200000, featured: true },
    { code: "AUK AUT02", category: "Automation", title: "Automation & IoT", durationLabel: "3 days", price: 640000, featured: true },
    { code: "AUK B03", category: "Business", title: "Business Management", durationLabel: "4 days", price: 880000, featured: true },
    { code: "AUK B07", category: "Business", title: "Entrepreneurship, Business Incubation & Innovation", durationLabel: "2 days", price: 460000, featured: true },
    { code: "AUK S 36", category: "Finance", title: "Finance for Non-Finance", durationLabel: "1 day", price: 280000, featured: true },
    { code: "AUK S 1", category: "Mining", title: "Mineral Resource Evaluation: Estimation & Reporting", durationLabel: "2 days", price: 540000, featured: true },
    { code: "AUK SHE01", category: "SHE", title: "Occupational Health & Safety", durationLabel: "1 day", price: 220000, featured: true },
  ];

  for (const c of courses) {
    const existing = await prisma.course.findFirst({ where: { code: c.code } });
    if (existing) continue;
    await prisma.course.create({
      data: {
        code: c.code,
        title: c.title,
        category: c.category,
        providerId: auk.id,
        durationLabel: c.durationLabel,
        price: c.price,
        featured: c.featured,
        modes: ["virtual", "classroom"],
        summary: `${c.title} — a practitioner-led programme from AUK Marine's training team, blending theory with real cases and hands-on application.`,
        outcomes: [
          "Understand core concepts and industry context",
          "Apply skills to real workplace scenarios",
          "Meet compliance and best-practice standards",
        ],
        modules: [
          { title: "Foundations & context", content: "Orientation, terminology, and why this matters in the field." },
          { title: "Core methods", content: "Step-by-step methods and tools, worked through with live examples." },
          { title: "Applied practice", content: "Case studies, exercises and a practical demonstration walkthrough." },
        ],
        practical: { title: "Practical demonstration", description: `Learners complete a guided practical for ${c.title.toLowerCase()}.` },
      },
    });
  }

  await prisma.facilitator.upsert({
    where: { id: "capt-ashwani" },
    update: {},
    create: {
      id: "capt-ashwani",
      name: "Captain Ashwani Pathak",
      role: "Lead Facilitator, Mentor & Assessor",
      country: "South Africa",
      years: 37,
      expertise: ["Maritime", "Business", "Finance"],
      availability: ["virtual", "classroom", "onsite"],
      bio: "MBA-Marketing (Luton, UK), Class-1 Master (F.G.), Accredited Assessor. 37+ years across maritime, shipping, ports, oil & gas, mining and power.",
      status: "active",
    },
  });

  await prisma.facilitator.upsert({
    where: { id: "kalpana-pathak" },
    update: {},
    create: {
      id: "kalpana-pathak",
      name: "Kalpana Pathak",
      email: "training@auk-maritime.com",
      role: "Training Coordinator",
      country: "South Africa",
      years: 5,
      expertise: ["Business", "Soft Skills"],
      availability: ["virtual", "classroom"],
      bio: "Coordinates bookings, learner onboarding and scheduling across all AUK Marine training programmes.",
      status: "active",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
