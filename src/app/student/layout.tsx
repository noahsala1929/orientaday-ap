import { Header } from "@/components/header";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user data since authentication is bypassed
  const mockUser = {
    displayName: "Alex Doe",
    email: "alex.doe@example.com",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        userName={mockUser.displayName} 
        userEmail={mockUser.email} 
        userRole="Student" 
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
