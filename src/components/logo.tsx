import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Logo({ size = 'md', className }: LogoProps) {
  const sizeClasses = {
    sm: {
      icon: 'h-6 w-6',
      text: 'text-lg',
    },
    md: {
      icon: 'h-8 w-8',
      text: 'text-xl',
    },
    lg: {
      icon: 'h-10 w-10',
      text: 'text-3xl',
    },
  };

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Briefcase className={cn(sizeClasses[size].icon, 'text-primary')} />
      <span className={cn(sizeClasses[size].text, 'font-bold font-headline text-primary-foreground bg-gradient-primary px-2 rounded-md')}>
        OrientaDay
      </span>
    </Link>
  );
}
