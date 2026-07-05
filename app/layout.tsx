import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "AUK Marine Training",
  description: "Accredited maritime, mining, logistics and business training — book, learn, and get certified.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="mt-20 bg-abyss py-10 text-sm text-slate-400">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-slate-200 font-semibold">AUK Marine Training · Research &amp; Training Centre</p>
            <p className="mt-2 max-w-xl">
              Accredited training service provider · Est. 2012 &amp; 2017. Maritime, mining, logistics, business, IT
              and soft-skills training delivered online, in-classroom, and on site.
            </p>
            <p className="mt-4">
              Northlands Corner, North Riding, Johannesburg 2169 · <a href="mailto:training@auk-maritime.com" className="underline">training@auk-maritime.com</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
