import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="my-6">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Imagen del artículo'}
          width={800}
          height={450}
          className="rounded-lg w-full h-auto"
        />
        {value.caption && (
          <p className="text-sm text-gray-500 mt-2 text-center italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    normal: ({ children }: any) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mb-4 mt-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mb-3 mt-5">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-semibold mb-2 mt-4">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {children}
      </a>
    ),
    internalLink: ({ value, children }: any) => {
      // Defensive: check reference and slug
      const slug = value?.reference?.slug?.current
      return slug ? (
        <a
          href={`/article/${slug}`}
          className="text-primary underline hover:text-primary/80"
        >
          {children}
        </a>
      ) : (
        <span className="text-gray-400 cursor-not-allowed">{children}</span>
      )
    },
  },
}

interface PortableTextRendererProps {
  content: any
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return <PortableText value={content} components={components} />
}
