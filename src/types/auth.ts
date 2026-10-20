import { authClient } from '@/lib/auth'

export type AuthSession = typeof authClient.$Infer.Session
export type AuthUser = typeof authClient.$Infer.Session.user
