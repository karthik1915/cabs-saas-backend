import { signOut } from '#/lib/auth.ts'
import { getInitials } from '#/lib/utils.ts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  BookOpenIcon,
  CreditCardIcon,
  LifeBuoyIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react'

import { useSuspenseQuery } from '@tanstack/react-query'
import { userQueryOptions } from '#/features/functions/fetchUser.ts'
import { useNavigate } from '@tanstack/react-router'

export function UserAvatar() {
  const navigate = useNavigate()
  const { data: userData } = useSuspenseQuery(userQueryOptions)

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-8">
            <AvatarFallback>{getInitials(userData.userName)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-center gap-2 py-2">
              <Avatar className="size-8">
                <AvatarFallback>
                  {getInitials(userData.userName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-foreground text-sm font-medium">
                  {userData.userName}
                </span>
                <span className="text-muted-foreground text-xs font-normal">
                  {userData.userEmail}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => navigate({ to: '/dashboard/me/profile' })}
              >
                <UserIcon aria-hidden="true" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate({ to: '/dashboard/me/billing' })}
              >
                <CreditCardIcon aria-hidden="true" />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LifeBuoyIcon aria-hidden="true" />
                Support
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpenIcon aria-hidden="true" />
                Documentation
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={signOut}>
              <LogOutIcon aria-hidden="true" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
