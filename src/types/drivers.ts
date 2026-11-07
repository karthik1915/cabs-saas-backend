export type DriversList = {
  id: string
  driverName: string
  driverCode: string
  driverPhone: string | null
  licenseNumber: string | null
  licenseExpiryDate: string | null
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
}[]

export type Driver = any
