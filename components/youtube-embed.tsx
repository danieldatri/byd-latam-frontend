import React from 'react';

interface YoutubeEmbedProps {
  videoId: string;
  caption?: React.ReactNode;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId, caption }) => (
  <div className="my-6 flex flex-col items-center">
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="rounded-lg w-full max-w-2xl h-72"
    ></iframe>
    {caption && (
      <div className="text-primary text-center mt-2 text-sm italic">
        {caption}
      </div>
    )}
  </div>
);

export default YoutubeEmbed;

