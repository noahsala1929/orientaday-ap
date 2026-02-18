import { Header } from "@/components/header";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user data since authentication is bypassed
  const mockUser = {
    displayName: "Jane Smith",
    email: "jane.s@innovate.com",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        userName={mockUser.displayName} 
        userEmail={mockUser.email} 
        userRole="Company HR" 
      />
      <main className="flex-1 bg-muted/20">{children}</main>
    </div>
  );
}
