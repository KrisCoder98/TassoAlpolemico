import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import background from '../public/img/AppBG.jpg';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <div style={{backgroundImage: `url(${background})`}} className='bg-cover bg-center m-0 p-0'>
    <StrictMode>
      <App />
    </StrictMode>
  </div>
)
