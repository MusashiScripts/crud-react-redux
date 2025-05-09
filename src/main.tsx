import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { store } from './store/index.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

/* El Provider es el que nos permitira desde cualquier parte de nuestra aplicacion leer la store y mandar acciones a la store para que genere nuevos estados */
