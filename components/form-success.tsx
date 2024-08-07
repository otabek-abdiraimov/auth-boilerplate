import { CheckCircle2Icon } from 'lucide-react'
import React from 'react'
interface FormSuccessProps {
  message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle2Icon className="size-4" />
      <p>{message}</p>
    </div>
  )
}
