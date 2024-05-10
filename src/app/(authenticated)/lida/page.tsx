// pages/lida.tsx
import React from 'react';
import LidaEmbed from '@/features/lida-page/LidaEmbed'; // Make sure the path is correct

const LidaPage: React.FC = () => {
  const lidaAppUrl = 'https://patitolida.azurewebsites.net'; // The actual URL of your Lida web app

  return (
    <div>
      <h1>Lida Integration</h1>
      <LidaEmbed src={lidaAppUrl} />
    </div>
  );
};

export default LidaPage;
