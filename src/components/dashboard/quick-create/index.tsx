import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '#/components/ui/drawer'
import { SidebarMenuButton } from '#/components/ui/sidebar.tsx'
import { Button } from '#/components/ui/button'
import { useIsMobile } from '#/hooks/use-mobile'
import {
  PlusCircleIcon,
  CalendarPlus,
  UserRoundPlus,
  CarFront,
  Users,
  MapPinned,
  ReceiptText,
  type LucideIcon,
} from 'lucide-react'

type QuickCreateAction = {
  label: string
  description: string
  icon: LucideIcon
}

const quickCreateActions: QuickCreateAction[] = [
  {
    label: 'Booking',
    description: 'Create a booking',
    icon: CalendarPlus,
  },
  {
    label: 'Driver',
    description: 'Add a driver',
    icon: UserRoundPlus,
  },
  {
    label: 'Vehicle',
    description: 'Register a vehicle',
    icon: CarFront,
  },
  {
    label: 'Customer',
    description: 'Add a customer',
    icon: Users,
  },
  {
    label: 'Trip',
    description: 'Schedule a trip',
    icon: MapPinned,
  },
  {
    label: 'Invoice',
    description: 'Create an invoice',
    icon: ReceiptText,
  },
]

function QuickCreateGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
      {quickCreateActions.map(({ label, description, icon: Icon }) => (
        <Button
          key={label}
          type="button"
          variant="outline"
          className="group flex h-auto min-h-28 flex-col items-start justify-start gap-3 rounded-xl p-3 text-left whitespace-normal"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5" />
          </span>

          <span className="flex flex-col items-start gap-1">
            <span className="font-medium">{label}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {description}
            </span>
          </span>
        </Button>
      ))}
    </div>
  )
}

export function QuickCreate() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          render={
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            />
          }
        >
          <PlusCircleIcon />
          <span>Quick Create</span>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Quick Create</DrawerTitle>
            <DrawerDescription>
              Choose what you'd like to create.
            </DrawerDescription>
          </DrawerHeader>

          <QuickCreateGrid />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <SidebarMenuButton
            tooltip="Quick Create"
            className="min-w-8 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
          />
        }
      >
        <PlusCircleIcon />
        <span>Quick Create</span>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0 sm:max-w-xl">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Quick Create</DialogTitle>
          <DialogDescription>
            Choose what you'd like to create.
          </DialogDescription>
        </DialogHeader>

        <QuickCreateGrid />
      </DialogContent>
    </Dialog>
  )
}
