import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  if (!body.name || !body.email) {
    return NextResponse.json({ ok: false, error: "Name and email are required" }, { status: 400 });
  }

  const project = await prisma.research.findUnique({ where: { id: params.id } });
  if (!project) return NextResponse.json({ ok: false, error: "Project not found" }, { status: 404 });

  const interest = await prisma.researchInterest.create({
    data: {
      projectId: params.id,
      name: body.name,
      email: body.email,
      org: body.org || "",
      message: body.message || "",
    },
  });

  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (settings?.notifyEmail) {
    sendEmail({
      to: settings.notifyEmail,
      subject: `Research collaboration interest — ${project.title}`,
      html: `<div style="font-family:sans-serif;max-width:520px">
        <h2 style="color:#0B2A3D">New collaboration interest</h2>
        <p><b>${body.name}</b> (${body.email}${body.org ? `, ${body.org}` : ""}) expressed interest in:</p>
        <p style="background:#f2f6f7;padding:12px;border-radius:8px"><b>${project.title}</b></p>
        ${body.message ? `<p>Message: ${body.message}</p>` : ""}
        <p>Review in Admin → Research.</p>
      </div>`,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, interest });
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const interests = await prisma.researchInterest.findMany({
    where: { projectId: params.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok: true, interests });
}
