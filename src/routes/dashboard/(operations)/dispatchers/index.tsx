import { DispatchersList } from '#/components/dashboard/dispatchers/dispatchers-list.tsx'
import { DispatcherDetails } from '#/components/dashboard/dispatchers/dispatchers-details.tsx'
import { shipments } from '#/components/dashboard/dispatchers/shipment-data.ts'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(operations)/dispatchers/')({
  component: Dispatchers,
})

export function Dispatchers() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(
    shipments[0].id,
  )
  const selectedShipment =
    shipments.find((shipment) => shipment.id === selectedShipmentId) ??
    shipments[0]

  function handleSelectShipment(shipmentId: string) {
    setSelectedShipmentId(shipmentId)

    if (window.innerWidth < 1024) {
      setDetailsOpen(true)
    }
  }

  return (
    <>
      <div
        data-content-padding="false"
        className="grid lg:max-h-[calc(100dvh-68px)] min-h-0 grid-cols-1 gap-4 overflow-hidden px-2 py-4 lg:grid-cols-[400px_minmax(0,1fr)]"
      >
        {/* Dispatcher list */}
        <div className="relative min-h-0 min-w-0 max-md:h-[88vh] ">
          <DispatchersList
            shipments={shipments}
            selectedShipmentId={selectedShipmentId}
            onSelectShipment={handleSelectShipment}
          />
        </div>

        {/* Dispatcher details */}
        <div className="hidden min-h-0 min-w-0 overflow-hidden lg:block">
          <DispatcherDetails shipment={selectedShipment} />
        </div>
      </div>

      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent
          side="right"
          className="gap-0 overflow-hidden p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-none data-[side=right]:md:w-3/4"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>
              {selectedShipment
                ? `Shipment ${selectedShipment.id}`
                : 'Shipment details'}
            </SheetTitle>
            <SheetDescription>
              Selected shipment details and route map.
            </SheetDescription>
          </SheetHeader>

          <div className="h-full min-h-0 overflow-hidden">
            <DispatcherDetails shipment={selectedShipment} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
