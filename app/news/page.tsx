import { redirect } from "next/navigation"

export default function LegacyNewsRedirect() {
  redirect('/articles')
}
