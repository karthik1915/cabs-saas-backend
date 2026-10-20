import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { Icons } from '@/lib/icons'
import { Link } from '@tanstack/react-router'
import { APP_CONFIG } from '@/config/app-config'
import { sidebarItems } from '#/components/dashboard/sidebar/navigation.tsx'

import { NavMain } from './nav-main'

import { useSuspenseQuery } from '@tanstack/react-query'
import { userQueryOptions } from '#/features/functions/fetchUser.ts'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: dashboardData } = useSuspenseQuery(userQueryOptions)

  return (
    <Sidebar
      {...props}
      variant={'floating'}
      collapsible={'icon'}
      className="bg-muted "
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/dashboard" className="flex items-center gap-2">
              <SidebarMenuButton>
                <Icons.Car />
                <span className="text-xl font-semibold">
                  {dashboardData.memberships[0].tenant.name ||
                    APP_CONFIG['name']}
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
    </Sidebar>
  )
}
