import React from 'react';

interface YoutubeEmbedProps {
  videoId: string;
  caption?: React.ReactNode;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId, caption }) => (
  <div className="my-6 flex flex-col items-center">
    <div className="w-full aspect-video max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    {caption && (
      <div className="text-primary text-center mt-2 text-sm italic">
        {caption}
      </div>
    )}
  </div>
);

export default YoutubeEmbed;
