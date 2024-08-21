import * as React from "react";
import { cn } from "@/utils/utils";
import { badgeVariants, VariantProps } from "../../utils/badge-utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };