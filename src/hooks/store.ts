/* En este archivo iran todos los hooks de nuestra store tipados */

import type { AppDispatch, RootState } from '../store'
import type { TypedUseSelectorHook } from 'react-redux'

/* useSelector para leer el state, useDispatch para enviar acciones */
import { useSelector, useDispatch } from 'react-redux'

//Es una forma de renombrar los hooks a la par que darle el tipado para no hacerlo constantemente
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch