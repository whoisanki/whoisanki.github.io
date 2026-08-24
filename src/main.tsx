import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'

// Active Favicon registration to bust browser persistent SQLite favicon cache
function registerFavicons() {
  if (typeof document === 'undefined') return;
  const favicons = [
    { rel: 'icon', type: 'image/svg+xml', href: './favicon.svg?v=3' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: './favicon-32x32.png?v=3' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: './favicon-16x16.png?v=3' },
    { rel: 'shortcut icon', href: './favicon.ico?v=3' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: './apple-touch-icon.png?v=3' }
  ];

  favicons.forEach(({ rel, type, sizes, href }) => {
    let link = document.querySelector(`link[rel="${rel}"][sizes="${sizes || ''}"]`) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      if (type) link.type = type;
      if (sizes) link.sizes = sizes;
      document.head.appendChild(link);
    }
    link.href = href;
  });
}

registerFavicons();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)


