import { Loader2 } from "lucide-react"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-gray-800" />
    </div>
  )
}
