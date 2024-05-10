// features/lida-page/LidaEmbed.tsx
import React from 'react';

interface LidaEmbedProps {
  src: string; // The URL of the Lida web app
}

const LidaEmbed: React.FC<LidaEmbedProps> = ({ src }) => {
  return (
    <iframe
      src={src}
      width="100%"
      height="600" // Adjust the height as needed
      style={{ border: 'none' }}
      title="Lida Embed"
    />
  );
};

export default LidaEmbed;
