// features/lida-page/LidaEmbed.tsx
import React from 'react';

interface LidaEmbedProps {
  src: string;
}

const LidaEmbed: React.FC<LidaEmbedProps> = ({ src }) => {
  return (
    // Use inline styles or Tailwind CSS classes if you prefer
    <iframe
      src={src}
      className="w-full h-full border-none"
      title="Lida Embed"
    />
  );
};

export default LidaEmbed;
