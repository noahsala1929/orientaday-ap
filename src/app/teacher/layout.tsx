import { Header } from "@/components/header";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userName="Dr. Evelyn Reed" userEmail="e.reed@northwood.edu" userRole="Teacher" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
