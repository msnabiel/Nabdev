"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const languageOptions = ["javascript", "typescript", "python", "json"]

export default function EditorPage() {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(`function hello() {\n  console.log("Hello, world!");\n}`)

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mb-4 flex items-center p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-32 justify-between">
              {language.charAt(0).toUpperCase() + language.slice(1)}
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {languageOptions.map((lang) => (
              <DropdownMenuItem
                key={lang}
                onClick={() => setLanguage(lang)}
                className="flex items-center justify-between"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                {language === lang && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[calc(100vh-6rem)] rounded-none border-x-0 border-gray-700">
        <MonacoEditor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: "on",
          }}
        />
      </div>
    </div>
  )
}
