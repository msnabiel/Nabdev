import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex h-20 items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-2 px-2">
          <Icons.logo />
          <p className="text-sm">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Nabiel
            </a>
            . All rights reserved.
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
