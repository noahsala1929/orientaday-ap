import { cn } from '@/lib/utils';
import Link from 'next/link';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Logo({ size = 'md', className }: LogoProps) {
  const sizeClasses = {
    sm: {
      text: 'text-lg',
    },
    md: {
      text: 'text-xl',
    },
    lg: {
      text: 'text-3xl',
    },
  };

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <span className={cn(sizeClasses[size].text, 'font-bold font-headline text-primary-foreground bg-gradient-primary px-2 rounded-md')}>
        OrientaDay
      </span>
    </Link>
  );
}
