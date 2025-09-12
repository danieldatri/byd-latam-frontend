import Link from "next/link"
import React from "react"

type InternalLink = {
  name: string
  href: string
}

type SocialLink = {
  name: string
  url: string
  handle?: string
  icon?: React.ComponentType<any> | (() => JSX.Element)
}

type Props = {
  title?: string
  items: Array<InternalLink | SocialLink>
  variant?: "internal" | "social"
}

export default function LinksList({ title, items, variant = "internal" }: Props) {
  return (
    <div>
      {title && <h3 className="font-semibold mb-4 text-header-footer-text">{title}</h3>}
      {variant === "internal" ? (
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={(item as InternalLink).href}>
              <Link
                href={(item as InternalLink).href}
                className="text-header-footer-text/80 hover:text-header-footer-text transition-colors"
              >
                {(item as InternalLink).name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const social = item as SocialLink
            const Icon = social.icon
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-header-footer-text/80 hover:text-header-footer-text transition-colors group"
              >
                {Icon ? <Icon /> : null}
                <div className="text-sm">
                  <div className="font-medium">{social.name}</div>
                  {social.handle ? <div className="text-xs text-header-footer-text/60">{social.handle}</div> : null}
                </div>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
