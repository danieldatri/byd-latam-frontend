import * as React from "react";

interface NoArticlesProps {
  message?: string;
  subtitle?: string;
  emoji?: string;
}

export const NoArticles: React.FC<NoArticlesProps> = ({
  message = "No hay artículos disponibles",
  subtitle = "Aún no hay contenido publicado. Vuelve pronto para ver las últimas noticias.",
  emoji = "📰",
}) => (
  <div className="text-center py-12">
    <div className="text-gray-400 text-6xl mb-4">{emoji}</div>
    <h3 className="text-xl font-semibold mb-2">{message}</h3>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
  </div>
);

