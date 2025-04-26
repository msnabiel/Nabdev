"use client"

import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface DocsSearchProps extends React.HTMLAttributes<HTMLFormElement> {
  onSearch?: (query: string) => void;
}

export function DocsSearch({ className, onSearch, ...props }: DocsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    if (!searchQuery.trim()) {
      return toast({
        title: "Empty Search",
        description: "Please enter a search term",
        variant: "destructive"
      })
    }

    if (onSearch) {
      onSearch(searchQuery)
    } else {
      // Fallback if no onSearch prop is provided
      toast({
        title: "Search Submitted",
        description: `Searching for: ${searchQuery}`,
      })
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative w-full", className)}
      {...props}
    >
      <Input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search documentation..."
        className="h-8 w-full sm:w-64 sm:pr-12"
      />
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </form>
  )
}
