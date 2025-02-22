import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import App from './App.jsx'
import { SpotifyProvider } from "./context/spotify";
import { Provider } from "./components/ui/provider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <SpotifyProvider >
        <App />
      </SpotifyProvider>
    </Provider>
  </StrictMode>
)
