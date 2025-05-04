"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Check, ChevronDown, Play, Loader2 } from "lucide-react"
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
  const [code, setCode] = useState(`function hello() {\n  console.log("Hello, world!");\n}\n\nhello();`)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    if (language !== "javascript") {
      setOutput("Code execution is only supported for JavaScript.")
      return
    }

    setIsRunning(true)
    setOutput("")

    // Set timeout to simulate the "Running..." animation for 1 second
    setTimeout(() => {
      setIsRunning(false)

      try {
        const log: string[] = []
        const originalConsoleLog = console.log
        console.log = (...args: any[]) => log.push(args.join(" "))

        eval(code)

        console.log = originalConsoleLog
        setOutput(log.join("\n"))
      } catch (err: any) {
        setOutput(`Error: ${err.message}`)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mb-4 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-32 justify-between">
              {language.charAt(0).toUpperCase() + language.slice(1)}
              <ChevronDown className="ml-2 size-4 opacity-50" />
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
                {language === lang && <Check className="ml-2 size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={runCode}
          disabled={language !== "javascript"}
          className={`transition-all duration-150 ${isRunning ? "scale-95" : "scale-100"}`}
        >
          {isRunning ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Play className="mr-2 size-4" />
          )}
          {isRunning ? "Running..." : "Run"}
        </Button>
      </div>
      <div className="h-[calc(100vh-14rem)] overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
        <MonacoEditor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: "on",
          }}
        />
      </div>
      <div className="mt-4 rounded-xl border border-gray-300 bg-muted p-4 font-mono text-sm dark:border-gray-700">
        <strong className="mb-2 block">Output:</strong>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  )
}
