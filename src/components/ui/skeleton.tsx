import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

const SVGSkeleton = ({ className }: { className: string }) => (
  <svg className={className + " animate-pulse rounded bg-gray-300"} />
);

export { Skeleton, SVGSkeleton };
