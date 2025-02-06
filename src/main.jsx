import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import App from './App.jsx'
import Fonts from "./assets/fonts/fonts";
import { SongsProvider } from "./context/songs";
import { Provider } from "./components/ui/provider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <Fonts />
      <SongsProvider >
        <App />
      </SongsProvider>
    </Provider>
  </StrictMode>
)
