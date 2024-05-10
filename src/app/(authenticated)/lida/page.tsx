// pages/lida.tsx
import React from 'react';
import LidaEmbed from '@/features/lida-page/LidaEmbed';

const LidaPage: React.FC = () => {
  const lidaAppUrl = 'https://patitolida.azurewebsites.net';

  return (
    <div style={{ width: '100%', height: '100vh' }}> {/* This div takes up the full height of the viewport */}
      <h1>Lida Integration</h1>
      <LidaEmbed src={lidaAppUrl} />
    </div>
  );
};

export default LidaPage;
