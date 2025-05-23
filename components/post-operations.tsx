"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

async function deletePost(postId: string) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your post was not deleted. Please try again.",
      variant: "destructive",
    })
  }

  return true
}

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">
}

export function PostOperations({ post }: PostOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted md:h-10 md:w-10">
          <Icons.ellipsis className="h-4 w-4 md:h-5 md:w-5" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] md:w-[220px]">
          <DropdownMenuItem>
            <Link href={`/editor/${post.id}`} className="flex w-full py-2 md:py-2.5">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center py-2 text-destructive focus:text-destructive md:py-2.5"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="mx-auto w-[95%] sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg md:text-xl">
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm md:text-base">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deletePost(post.id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="w-full bg-red-600 focus:ring-red-600 sm:w-auto"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
