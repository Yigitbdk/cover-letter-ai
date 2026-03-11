import React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative w-full max-w-xs rounded-xl',
        'p-1.5 shadow-xl backdrop-blur-xl',
        'border',
        className,
      )}
      style={{ backgroundColor: '#1a1614', borderColor: '#3d3430' }}
      {...props}
    />
  );
}

function Header({
  className,
  children,
  glassEffect = true,
  ...props
}: React.ComponentProps<'div'> & { glassEffect?: boolean }) {
  return (
    <div
      className={cn('relative mb-4 rounded-xl border p-4', className)}
      style={{ backgroundColor: '#2d2420', borderColor: '#3d3430' }}
      {...props}
    >
      {glassEffect && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 rounded-[inherit]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0) 100%)',
          }}
        />
      )}
      {children}
    </div>
  );
}

function Plan({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mb-8 flex items-center justify-between', className)} {...props} />;
}

function Description({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-xs', className)} style={{ color: '#9c8880' }} {...props} />;
}

function PlanName({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn("flex items-center gap-2 text-sm font-medium", className)}
      style={{ color: '#9c8880' }}
      {...props}
    />
  );
}

function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('rounded-full border px-2 py-0.5 text-xs', className)}
      style={{ borderColor: '#f97316', color: '#f97316' }}
      {...props}
    />
  );
}

function Price({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mb-3 flex items-end gap-1', className)} {...props} />;
}

function MainPrice({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('text-3xl font-extrabold tracking-tight text-white', className)} {...props} />;
}

function Period({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('pb-1 text-sm', className)} style={{ color: '#9c8880' }} {...props} />;
}

function OriginalPrice({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('mr-1 ml-auto text-lg line-through', className)} style={{ color: '#9c8880' }} {...props} />;
}

function Body({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('space-y-6 p-3', className)} {...props} />;
}

function List({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={cn('space-y-3', className)} {...props} />;
}

function ListItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('flex items-start gap-3 text-sm', className)} style={{ color: '#9c8880' }} {...props} />;
}

function Separator({
  children = 'Upgrade to access',
  className,
  ...props
}: React.ComponentProps<'div'> & { children?: string }) {
  return (
    <div className={cn('flex items-center gap-3 text-sm', className)} style={{ color: '#9c8880' }} {...props}>
      <span className="h-[1px] flex-1" style={{ backgroundColor: '#3d3430' }} />
      <span className="shrink-0">{children}</span>
      <span className="h-[1px] flex-1" style={{ backgroundColor: '#3d3430' }} />
    </div>
  );
}

export { Card, Header, Description, Plan, PlanName, Badge, Price, MainPrice, Period, OriginalPrice, Body, List, ListItem, Separator };