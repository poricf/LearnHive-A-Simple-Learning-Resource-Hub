"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const { toast } = useToast()
  const { login, isAuthenticated, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'register') {
      setActiveTab('register')
    }
  }, [searchParams])

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError(null)

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json()
          throw new Error(data.message || 'Login failed')
        } else {
          throw new Error('Server returned an invalid response')
        }
      }

      const data = await response.json()
      
      // Store the token and user data
      login(data.token, data.user)
      
      toast({
        title: "Success",
        description: "Login successful",
      })
      router.push("/dashboard")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setLoginError(errorMessage)
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterError(null)

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

      // Switch to login tab and pre-fill email
      setActiveTab("login")
      setLoginData({
        ...loginData,
        email: registerData.email,
      })
      
      // Clear registration form
      setRegisterData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setRegisterError(errorMessage)
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (loginError) setLoginError(null)
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (registerError) setRegisterError(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-24">
        <Card className="mx-auto max-w-md w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required 
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>Create an account to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {registerError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      placeholder="John Doe" 
                      value={registerData.name}
                      onChange={handleRegisterChange}
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
                      onChange={handleRegisterChange}
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
                      onChange={handleRegisterChange}
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
                      onChange={handleRegisterChange}
                      required 
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    )
  }

  return (
    <div>Welcome {user?.name}</div>
  )
}
