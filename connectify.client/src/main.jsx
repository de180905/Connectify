import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import MyApp from './MyApp';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MyApp />
    </StrictMode>
)
z