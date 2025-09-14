import { redirect } from "next/navigation"

export default function LegacyArticleRedirect({ params }: { params: { slug: string } }) {
  redirect(`/articles/${params.slug}`)
}
