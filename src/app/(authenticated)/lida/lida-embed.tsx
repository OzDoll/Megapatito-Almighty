// pages/lida.tsx
import React from 'react';
import LidaEmbed from '../components/LidaEmbed'; // Adjust the import path to where you saved LidaEmbed.tsx

const LidaPage: React.FC = () => {
  const lidaAppUrl = 'https://patitolida.azurewebsites.net/'; // Replace with the actual URL of your web app

  return (
    <div>
      <h1>Lida Integration</h1>
      <LidaEmbed src={lidaAppUrl} />
    </div>
  );
};

export default LidaPage;
