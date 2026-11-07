import { DataTable } from '#/components/data-table/index'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '#/components/ui/input-group.tsx'

import { SearchIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Select, SelectTrigger, SelectValue } from '#/components/ui/select.tsx'
import type { User } from '#/types/Users.ts'
import { userColumns } from './columns'

export function UsersTable({ data }: { data: User[] }) {
  const formatters: ReactNode = (
    <div className="flex items-center justify-start gap-4">
      <InputGroup className="max-w-48">
        <InputGroupInput placeholder="Search Users" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={'Status'} />
        </SelectTrigger>
      </Select>
    </div>
  )

  return <DataTable formatters={formatters} columns={userColumns} data={data} />
}
