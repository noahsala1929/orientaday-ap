import { Header } from "@/components/header";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userName="Jane Smith" userEmail="jane.s@innovate.com" userRole="Company HR" />
      <main className="flex-1 bg-muted/20">{children}</main>
    </div>
  );
}
