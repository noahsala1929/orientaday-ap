import { Header } from "@/components/header";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userName="Alex Doe" userEmail="alex.doe@example.com" userRole="Student" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
