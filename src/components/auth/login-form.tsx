import { cn } from 'cn'
import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '#/lib/auth.ts'
import { toast } from '../ui/toast'
import { useNavigate } from '@tanstack/react-router'

type LoginState = {
  error: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate()
  const [state, formAction, isPending] = useActionState(
    async (
      _previousState: LoginState,
      formData: FormData,
    ): Promise<LoginState> => {
      const email = String(formData.get('email') ?? '').trim()
      const password = String(formData.get('password') ?? '')

      if (!email || !password) {
        const message = 'Email and password are required.'
        toast.add({
          type: 'info',
          description: message,
        })
        return { error: message }
      }

      try {
        const result = await authClient.signIn.email({
          email,
          password,
        })

        if (!result) {
          const message = 'Invalid email or password.'
          toast.add({
            type: 'info',
            description: message,
          })
          return { error: message }
        }

        toast.add({
          type: 'success',
          description: 'Successfully logged in!',
        })

        navigate({ to: '/dashboard', replace: true })

        return { error: '' }
      } catch {
        const message = 'Something went wrong. Please try again.'
        toast.add({
          type: 'error',
          description: message,
        })
        return { error: message }
      }
    },
    { error: '' },
  )

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/auth/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </Field>

              {state.error && (
                <p role="alert" className="text-sm text-destructive">
                  {state.error}
                </p>
              )}

              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Logging in...' : 'Login'}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/auth/register">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Login illustration"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{' '}
        <a href="/terms">Terms of Service</a> and{' '}
        <a href="/privacy">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
