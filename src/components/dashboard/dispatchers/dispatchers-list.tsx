import { Search, SlidersHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

import type { Shipment } from './shipment-data'
import { Badge } from '#/components/ui/badge.tsx'

type ShipmentCardProps = {
  active?: boolean
  onSelectShipment: (shipmentId: Shipment['id']) => void
  shipment: Shipment
}

type ShipmentListProps = {
  onSelectShipment: (shipmentId: Shipment['id']) => void
  selectedShipmentId: Shipment['id'] | null
  shipments: Shipment[]
}

function ShipmentCard({
  shipment,
  active,
  onSelectShipment,
}: ShipmentCardProps) {
  return (
    <Card
      aria-pressed={active}
      onClick={(event) => {
        event.currentTarget.blur()
        onSelectShipment(shipment.id)
      }}
      className={cn(
        'flex w-full flex-col gap-5 border text-left transition-colors',
        'hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50',
        active && 'border-primary bg-muted/60',
      )}
    >
      <CardHeader className="flex items-center justify-between px-3">
        <div className="flex items-center gap-2"># {shipment.id} </div>

        <div className="flex items-center gap-1">
          <Badge variant={'default'}>{shipment.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-between px-3">
        <div className="flex items-center">
          <div
            className={cn(
              `flag:${shipment.origin.countryCode.toUpperCase()}`,
              'rounded-xs text-3xl outline',
            )}
          />
          <div className="flex flex-col gap-0.5">
            <div className="font-medium text-xs leading-none">
              {shipment.origin.country}
            </div>
            <div className="text-muted-foreground text-xs">
              {shipment.origin.display}
            </div>
          </div>
        </div>

        <div className="flex items-center  text-right">
          <div className="flex flex-col gap-0.5">
            <div className="font-medium text-xs leading-none">
              {shipment.destination.country}
            </div>
            <div className="text-muted-foreground text-xs">
              {shipment.destination.display}
            </div>
          </div>
          <div
            className={cn(
              `flag:${shipment.destination.countryCode.toUpperCase()}`,
              'rounded-xs text-3xl outline',
            )}
          />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-3">
        <div>
          <div className="text-muted-foreground text-xs leading-none">
            Rider
          </div>
          <div className="truncate text-sm tracking-tight">
            {shipment.cargo}
          </div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground text-xs leading-none">
            Starts At
          </div>
          <div className="text-sm tabular-nums tracking-tight">
            {shipment.eta}
            {shipment.etaMeta && (
              <span className="ml-1 font-normal text-muted-foreground text-xs">
                {shipment.etaMeta}
              </span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export function DispatchersList({
  shipments,
  selectedShipmentId,
  onSelectShipment,
}: ShipmentListProps) {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden ring-0">
      <CardHeader className="shrink-0 border-b pb-4">
        <CardTitle className="font-normal text-xl">Shipments</CardTitle>

        <CardAction>
          <Button size="icon-sm" variant="ghost">
            <SlidersHorizontal />
          </Button>
        </CardAction>

        <div className="col-span-2 w-full">
          <InputGroup className="h-8">
            <InputGroupInput
              className="h-8"
              aria-label="Search shipments"
              placeholder="Search shipments..."
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
        <ScrollArea className="h-0 min-h-0 flex-1">
          <div className="flex flex-col gap-4 px-4 py-4">
            {shipments.map((shipment) => (
              <ShipmentCard
                key={shipment.id}
                active={shipment.id === selectedShipmentId}
                shipment={shipment}
                onSelectShipment={onSelectShipment}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
