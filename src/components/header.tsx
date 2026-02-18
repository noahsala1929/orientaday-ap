import { Logo } from './logo';
import { UserNav } from './user-nav';

export function Header({ userName, userEmail, userRole }: { userName: string; userEmail: string; userRole: string; }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
        <Logo />
        <UserNav name={userName} email={userEmail} role={userRole} />
      </div>
    </header>
  );
}
