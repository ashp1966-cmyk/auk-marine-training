import { PRIVACY_HTML } from "@/lib/legalContent";

export const metadata = { title: "Privacy Policy — AUK Marine Training" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <article className="legal" dangerouslySetInnerHTML={{ __html: PRIVACY_HTML }} />
    </main>
  );
}
