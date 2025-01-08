
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App'
import '../i18n';




createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
  </BrowserRouter>,
)
