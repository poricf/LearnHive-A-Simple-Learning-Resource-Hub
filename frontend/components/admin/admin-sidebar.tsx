"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  BookOpen,
  FolderTree,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquarePlus,
  Settings,
  Users,
} from "lucide-react"

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin",
      active: true,
    },
    {
      title: "Resources",
      icon: <BookOpen className="h-5 w-5" />,
      href: "/admin?tab=resources",
    },
    {
      title: "Categories",
      icon: <FolderTree className="h-5 w-5" />,
      href: "/admin?tab=categories",
    },
    {
      title: "Suggestions",
      icon: <MessageSquarePlus className="h-5 w-5" />,
      href: "/admin?tab=suggestions",
    },
    {
      title: "Users",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
  ]

  return (
    <div
      className={cn(
        "bg-gray-900 text-white h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <Link href="/" className={cn("flex items-center gap-2", collapsed && "justify-center")}>
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
            className="h-6 w-6 text-blue-400"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
          {!collapsed && <span className="text-lg font-bold">LearnHive</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
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
            className={cn("h-5 w-5 transition-transform", collapsed ? "rotate-180" : "")}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                item.active ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                collapsed && "justify-center px-2",
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
            collapsed && "justify-center px-2",
          )}
        >
          <Home className="h-5 w-5" />
          {!collapsed && <span>Back to Site</span>}
        </Link>
        <button
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}
