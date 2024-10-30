import Footer from './footer'
import Header from './header'
import { cn } from '@/lib/utils'

export default function Layout({
    children,
    className,
    header = true,
    footer = true
  }) {
    return (
      <div className={cn('bg-background flex min-h-screen flex-col', className)}>
        {header && <Header />}
        {children}
        {footer && <Footer />}
      </div>
    )
  }