'use client'

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import BackButton from './back-button'
import { Header } from './header'
import { Social } from './social'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  showSocial,
  headerLabel,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <Header label={headerLabel} />
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardHeader>
          <Social />
        </CardHeader>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
