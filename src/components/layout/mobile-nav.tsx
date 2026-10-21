import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'
import { DocsSidebar } from './docs-sidebar'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>{siteConfig.name}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-3">
          <DocsSidebar onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
