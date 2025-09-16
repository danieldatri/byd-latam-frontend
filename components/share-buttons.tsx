"use client";
import React, { useState } from "react";

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string;
    image?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({url, title, description = "", image}) => {
    const [copied, setCopied] = useState(false);
    const descShort = description.length > 120 ? description.slice(0, 117) + "..." : description;
    const whatsappText = `${title}\n${descShort}\n${url}`;
    const whatsapp = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    const xText = `${title}\n${descShort}`;
    const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(url)}`;
    const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    return (
        <div className="flex flex-col gap-2 my-8">
            <span className="font-semibold text-base mb-2">Compartir este artículo:</span>
            <div className="flex gap-4">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" title="Compartir por WhatsApp"
                   className="share-btn whatsapp">
                    {/* WhatsApp SVG icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.468-.148-.666.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.666-1.611-.912-2.207-.242-.579-.487-.5-.666-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.711.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.271-.198-.568-.347z" fill="#6b7280"/><path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.962.572 3.872 1.653 5.522L2 22l4.59-1.627A9.96 9.96 0 0 0 12.004 22C17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2zm0 18.165c-1.627 0-3.217-.438-4.59-1.27l-.328-.194-2.724.966.583-2.844-.213-.328A8.163 8.163 0 0 1 3.835 12.004c0-4.515 3.654-8.169 8.169-8.169 4.515 0 8.169 3.654 8.169 8.169 0 4.515-3.654 8.169-8.169 8.169z" fill="#6b7280"/></svg>
                </a>
                <a href={x} target="_blank" rel="noopener noreferrer" title="Compartir en X" className="share-btn x">
                    {/* X SVG icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.53 3H21.5L14.36 10.66L22.75 21H16.44L11.37 14.68L5.77 21H1.8L9.37 12.82L1.25 3H7.73L12.33 8.72L17.53 3ZM16.46 19.13H18.29L7.59 4.76H5.63L16.46 19.13Z" fill="#6b7280"/></svg>
                </a>
                <a href={facebook} target="_blank" rel="noopener noreferrer" title="Compartir en Facebook" className="share-btn facebook">
                    {/* Facebook SVG icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0" fill="#6b7280"/><path d="M16.671 24v-9.294h3.12l.467-3.622h-3.587V8.771c0-1.048.293-1.763 1.797-1.763l1.918-.001v-3.24c-.334-.044-1.472-.143-2.797-.143-2.766 0-4.659 1.688-4.659 4.788v2.171h-3.13v3.622h3.13V24h3.841" fill="#fff"/></svg>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" title="Compartir en LinkedIn" className="share-btn linkedin">
                    {/* LinkedIn SVG icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.9 1.637-1.848 3.37-1.848 3.602 0 4.267 2.369 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.272V1.723C24 .771 23.2 0 22.225 0z" fill="#6b7280"/></svg>
                </a>
                <a
                    href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n" + url)}`}
                    title="Compartir por Email"
                    className="share-btn email"
                >
                    {/* Email SVG icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm8 6l8-6H4l8 6zm0 2l-8-6v12h16V8l-8 6z" fill="#6b7280"/></svg>
                </a>
                <button
                    type="button"
                    title="Copiar enlace"
                    className="share-btn copy relative"
                    onClick={() => {
                        navigator.clipboard.writeText(url);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }}
                >
                    {/* Copy SVG icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" fill="#6b7280"/></svg>
                    {copied && (
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs text-gray-500 bg-white border border-gray-200 rounded shadow transition-opacity duration-200">Copiado</span>
                    )}
                </button>
            </div>

        </div>
    );
};
