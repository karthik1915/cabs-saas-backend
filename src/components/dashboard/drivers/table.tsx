import { driversColumn } from './columns'
import { DataTable } from '#/components/data-table/index'
import type { DriversList } from '#/types/drivers.ts'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '#/components/ui/input-group.tsx'

import { SearchIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Select, SelectTrigger, SelectValue } from '#/components/ui/select.tsx'

export function DriversTable({ data }: { data: DriversList }) {
  const formatters: ReactNode = (
    <div className="flex items-center justify-start gap-4">
      <InputGroup className="max-w-48">
        <InputGroupInput placeholder="Search Drivers" />
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

  return (
    <DataTable formatters={formatters} columns={driversColumn} data={data} />
  )
}
