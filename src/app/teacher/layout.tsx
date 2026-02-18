import { Header } from "@/components/header";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user data since authentication is bypassed
  const mockUser = {
    displayName: "Dr. Evelyn Reed",
    email: "e.reed@northwood.edu",
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        userName={mockUser.displayName}
        userEmail={mockUser.email} 
        userRole="Teacher" 
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
