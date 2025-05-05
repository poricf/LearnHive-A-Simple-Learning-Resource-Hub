export function LoadingSpinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${className}`} />
  )
} 