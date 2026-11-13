import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import { ResourcesProvider } from './context/ResourcesProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ResourcesProvider>
        <App />
      </ResourcesProvider>
    </BrowserRouter>
  </StrictMode>,
);
