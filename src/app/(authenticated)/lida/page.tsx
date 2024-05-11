// pages/lida.tsx
import React from 'react';
import LidaEmbed from '@/features/lida-page/LidaEmbed';

const LidaPage: React.FC = () => {
  const lidaAppUrl = 'process.env.LIDA_ENDPOINT';

  return (
    // Use Tailwind CSS classes to set the full viewport width and height, remove default margin and padding
    <div className="w-full h-screen p-0 m-0">
      <LidaEmbed src={lidaAppUrl} />
    </div>
  );
};

export default LidaPage;
