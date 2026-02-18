import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="bg-primary rounded-full p-2">
        <GraduationCap className="h-8 w-8 text-primary-foreground" />
      </div>
      <span className="text-3xl font-bold tracking-tight">OrientaDay</span>
    </div>
  );
}
