export const CircleSpinner = ({ className }: { className?: string }) => (
  <div
    className={`h-4 w-4 animate-spin rounded-full  border-b-2 border-white ${className} `}
  />
);
