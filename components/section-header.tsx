import * as React from "react";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  name: string;
  icon?: React.ElementType;
  link?: string;
  linkLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ name, icon, link, linkLabel }) => (
  <div className="flex items-center justify-between mb-6 col-span-2 relative">
    {/* Gradient background behind h2 */}
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-red-400 to-gray-50 opacity-30 rounded-lg pointer-events-none" />
    <h2 className="font-playfair text-3xl font-bold flex items-center gap-2 relative z-10 text-byd-light">
      {icon && React.createElement(icon, { className: "h-8 w-8 text-primary" })}
      {name}
    </h2>
    {link && (
      <a
        href={link}
        className="flex items-center gap-2 px-0 py-0 bg-transparent border-none shadow-none text-inherit hover:bg-transparent hover:text-inherit focus:outline-none focus:ring-0 focus:border-0"
        style={{ boxShadow: "none" }}
      >
        {linkLabel || "Ver todas"}
        <ArrowRight className="h-4 w-4" />
      </a>
    )}
  </div>
);