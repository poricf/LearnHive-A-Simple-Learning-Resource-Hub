"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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
      toast({
        title: "Success",
        description: "Login successful",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : 'An error occurred',
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
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
  }

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
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
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
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="John Doe" 
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required 
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
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Creating account...
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
