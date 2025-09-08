export function AdBanner({
  size = "banner",
  className = "",
}: {
  size?: "banner" | "sidebar" | "mobile"
  className?: string
}) {
  const dimensions = {
    banner: "h-24 w-full",
    sidebar: "h-64 w-full",
    mobile: "h-16 w-full",
  }

  return (
    <div
      className={`bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center ${dimensions[size]} ${className}`}
    >
      <div className="text-center text-gray-700">
        <p className="text-sm font-medium">Espacio Publicitario</p>
        <p className="text-xs">{size === "banner" ? "728x90" : size === "sidebar" ? "300x250" : "320x50"}</p>
      </div>
    </div>
  )
}
