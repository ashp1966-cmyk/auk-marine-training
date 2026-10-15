import { TERMS_HTML } from "@/lib/legalContent";

export const metadata = { title: "Terms of Service — AUK Marine Training" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <article className="legal" dangerouslySetInnerHTML={{ __html: TERMS_HTML }} />
    </main>
  );
}
