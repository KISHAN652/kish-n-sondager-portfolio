import * as React from 'react';
import {cn} from '@/lib/utils';

type HeaderProps = React.HTMLAttributes<HTMLElement>;

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({className, ...props}, ref) => (
    <header
      ref={ref}
      className={cn(
        'sticky top-0 z-40 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  )
);
Header.displayName = 'Header';

const HeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'container mx-auto flex h-16 items-center justify-between px-4 md:px-6',
      className
    )}
    {...props}
  />
));
HeaderContent.displayName = 'HeaderContent';

export {Header, HeaderContent};
