import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '#/components/ui/sidebar.tsx'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { cn } from '#/lib/utils.ts'
import { getCurrentSession } from '#/lib/session.ts'
import { Separator } from '#/components/ui/separator.tsx'
import { ThemeSwitcher } from '#/components/theme-switcher.tsx'
import { UserAvatar } from '#/components/dashboard/sidebar/userAvatar.tsx'
import { AppSidebar } from '#/components/dashboard/sidebar/index.tsx'
import { userQueryOptions } from '#/features/functions/fetchUser.ts'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,

  // This function runs before the route is loaded, allowing you to perform checks or fetch data.
  beforeLoad: async () => {
    const session = await getCurrentSession()

    // If the user is not authenticated, redirect them to the login page.
    if (!session) {
      throw redirect({ to: '/auth/login' })
    }
  },

  loader: async ({ context }) => {
    await context.queryClient.query(userQueryOptions)
  },

  pendingComponent: () => {
    ;<p>Loading...</p>
  },
})

function RouteComponent() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 54)',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset
        className={cn(
          'relative flex min-w-0 flex-1 flex-col bg-muted',
          'md:peer-data-[variant=inset]:m-2',
          'md:peer-data-[variant=inset]:ml-0',
          'md:peer-data-[variant=inset]:rounded-2xl',
          'md:peer-data-[variant=inset]:shadow-sm',
          'md:peer-data-[state=collapsed]:ml-2',
        )}
      >
        <header
          className={cn(
            'sticky top-0 z-50 px-2 before:absolute before:inset-0 before:rounded-t-xl before:mask-[linear-gradient(var(--card),var(--card)_18%,transparent_100%)] before:backdrop-blur-md sm:px-2',
          )}
        >
          <div
            className="bg-card relative z-51 mx-auto flex w-full items-center justify-between rounded-xl border px-4 py-2 max-w-348 shadow-xs"
            style={{ marginTop: '10px' }}
          >
            <div className="flex items-center gap-1 lg:gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
              />
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <UserAvatar />
            </div>
          </div>
        </header>
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden p-4 has-data-[content-padding=false]:p-0 md:p-4 md:has-data-[content-padding=false]:p-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
