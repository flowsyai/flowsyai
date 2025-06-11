import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Safety check for React availability
const safeForwardRef = React?.forwardRef || ((render: any) => render);

const labelVariants = cva(
  'text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' // Changed font-medium to font-normal
);

const Label = safeForwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
