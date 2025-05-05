"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface RegisterFormProps {
  onSuccess?: (email: string) => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(registerData),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json()
          throw new Error(data.message || 'Registration failed')
        } else {
          throw new Error('Server returned an invalid response')
        }
      }

      const data = await response.json()
      toast({
        title: "Registration Successful! 🎉",
        description: "Your account has been created. Please login to continue.",
        duration: 3000,
      })

      // Clear form
      setRegisterData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      })

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(registerData.email)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setError(errorMessage)
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) setError(null)
  }

  return (
    <form onSubmit={handleRegister}>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            name="name"
            placeholder="John Doe" 
            value={registerData.name}
            onChange={handleChange}
            required 
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="your.email@example.com" 
            value={registerData.email}
            onChange={handleChange}
            required 
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password"
            type="password" 
            value={registerData.password}
            onChange={handleChange}
            required 
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input 
            id="password_confirmation" 
            name="password_confirmation"
            type="password" 
            value={registerData.password_confirmation}
            onChange={handleChange}
            required 
            disabled={isLoading}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <span>Creating account...</span>
            </div>
          ) : (
            "Register"
          )}
        </Button>
      </CardFooter>
    </form>
  )
} 