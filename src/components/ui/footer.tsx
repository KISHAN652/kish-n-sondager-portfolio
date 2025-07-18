import * as React from 'react';

type FooterProps = React.HTMLAttributes<HTMLElement>;

function Footer({className, ...props}: FooterProps) {
  return (
    <footer
      className={cn('w-full py-6 px-4 md:px-6 border-t', className)}
      {...props}
    />
  );
}

const FooterContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'container mx-auto flex items-center justify-center text-center text-sm text-muted-foreground',
      className
    )}
    {...props}
  />
));
FooterContent.displayName = 'FooterContent';

export {Footer, FooterContent};
