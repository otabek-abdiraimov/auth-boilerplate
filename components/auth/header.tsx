import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const font = Poppins({ weight: '600', subsets: ['latin'] })

interface HeaderProps {
  label: string
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn('text-6xl font-semibold drop-shadow-2xl', font.className)}
      >
        Auth
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}
