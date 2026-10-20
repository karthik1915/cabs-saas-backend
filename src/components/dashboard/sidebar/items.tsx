import { Icons } from '@/lib/icons'
import type { Icon } from '@phosphor-icons/react'

export type NavBadge = 'new' | 'soon'

export interface NavSubItem {
  id: string
  title: string
  url: string
  icon?: Icon
  badge?: NavBadge
  disabled?: boolean
  newTab?: boolean
}

interface NavItemBase {
  id: string
  title: string
  icon?: Icon
  badge?: NavBadge
  disabled?: boolean
  newTab?: boolean
}

export interface NavMainLinkItem extends NavItemBase {
  url: string
  subItems?: never
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[]
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem

export interface NavGroup {
  id: number
  label?: string
  items: NavMainItem[]
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: 'Default',
    items: [
      {
        id: 'default',
        title: 'Default',
        url: '/dashboard/default',
        icon: Icons.Apps,
      },
    ],
  },
  {
    id: 2,
    label: 'Live Ops',
    items: [
      {
        id: 'liveops',
        title: 'Live Map',
        url: '/dashboard/livemap',
        icon: Icons.LiveMap,
      },
      {
        id: 'bookings',
        title: 'Bookings',
        url: '/dashboard/bookings',
        icon: Icons.Booking,
      },
      {
        id: 'dispatchers',
        title: 'Dispatchers',
        url: '/dashboard/dispatchers',
        icon: Icons.Dispatchers,
      },
      {
        id: 'analytics',
        title: 'Analytics',
        url: '/dashboard/analytics',
        icon: Icons.Guage,
      },
    ],
  },
  {
    id: 3,
    label: 'Fleet',
    items: [
      {
        id: 'drivers',
        title: 'Drivers',
        url: '/dashboard/drivers',
        icon: Icons.Drivers,
      },
      {
        id: 'fleet',
        title: 'Fleet',
        url: '/dashboard/academy',
        icon: Icons.Fleet,
      },
      {
        id: 'fleetPricings',
        title: 'Pricings',
        url: '/dashboard/fleet/pricings',
        icon: Icons.FleetPricings,
      },
      {
        id: 'fleetSettings',
        title: 'Settings',
        url: '/dashboard/fleet/settings',
        icon: Icons.FleetServices,
      },
    ],
  },
  {
    id: 4,
    label: 'CRM & Billings',
    items: [
      {
        id: 'users',
        title: 'Users',
        url: '/dashboard/users',
        icon: Icons.Users,
      },
      {
        id: 'finance',
        title: 'Finance',
        url: '/dashboard/finance',
        icon: Icons.Finance,
      },
      {
        id: 'reviews',
        title: 'Reviews',
        url: '/dashboard/reviews',
        icon: Icons.Reviews,
      },
    ],
  },
  {
    id: 5,
    label: 'Support',
    items: [
      {
        id: 'tickets',
        title: 'Tickets',
        url: '/dashboard/tickets',
        icon: Icons.Tickets,
      },
    ],
  },
]
