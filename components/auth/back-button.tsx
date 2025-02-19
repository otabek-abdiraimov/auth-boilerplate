'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

interface BackButtonProps {
  href: string
  label: string
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant={'link'} className="font-normal w-full" asChild size={'sm'}>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
