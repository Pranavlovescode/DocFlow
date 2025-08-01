import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/layouts/LoginForm"
import { Link } from "react-router"

export default function LoginPage() {
  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          DocFlow
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
