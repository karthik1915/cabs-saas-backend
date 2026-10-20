export type UserData = {
  id: string
  userName: string
  userPhone: string | null
  userEmail: string
  memberships: {
    role: 'ADMIN' | 'DRIVER' | 'USER'
    status: 'ACTIVE' | 'INVITED' | 'REMOVED' | 'SUSPENDED'
    tenant: {
      id: string
      name: string
      alias: string
      status: 'ACTIVE' | 'CANCELLED' | 'SUSPENDED' | 'TRIAL'
    }
  }[]
}
