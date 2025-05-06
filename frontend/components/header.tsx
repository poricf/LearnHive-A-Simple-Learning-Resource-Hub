"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check if user is logged in using localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check localStorage for login state
    const loginState = localStorage.getItem("isLoggedIn")
    setIsLoggedIn(loginState === "true")

    // If user is on dashboard or profile, ensure they're marked as logged in
    if (pathname === "/dashboard" || pathname === "/profile" || pathname.startsWith("/profile/")) {
      localStorage.setItem("isLoggedIn", "true")
      setIsLoggedIn(true)
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleLogout = () => {
    // Clear login state
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-600"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 0 0 1 0-5H20"></path>
            </svg>
            <span className="text-xl font-bold">LearnHive</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={isLoggedIn ? "/dashboard" : "/"}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link href="/resources" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Resources
          </Link>
          {isLoggedIn && (
            <Link href="/bookmarks" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Bookmarks
            </Link>
          )}
          <Link
            href="/suggest"
            className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            Suggest Resource
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-100">
              Soon
            </Badge>
          </Link>
        </nav>

        {/* Desktop Search and Auth */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleSearch}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          {isLoggedIn ? (
            <Link href="/profile">
              <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/login?tab=register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleSearch}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={cn(
          "border-t overflow-hidden transition-all duration-300 ease-in-out",
          isSearchOpen ? "max-h-16" : "max-h-0",
        )}
      >
        <div className="container px-4 py-3 md:px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search for resources..." className="pl-10 pr-10" />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
              onClick={toggleSearch}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link
              href={isLoggedIn ? "/dashboard" : "/"}
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              Resources
            </Link>
            {isLoggedIn && (
              <Link
                href="/bookmarks"
                className="text-sm font-medium hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Bookmarks
              </Link>
            )}
            <Link
              href="/suggest"
              className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-1"
              onClick={toggleMenu}
            >
              Suggest Resource
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-100">
                Soon
              </Badge>
            </Link>
            <div className="border-t pt-4 mt-2 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-1 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium">User Profile</div>
                  </div>
                  <Button variant="outline" size="sm" asChild onClick={toggleMenu}>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout()
                      toggleMenu()
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" asChild onClick={toggleMenu}>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild onClick={toggleMenu}>
                    <Link href="/login?tab=register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
