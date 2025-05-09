/* 1. Los slices son las porciones de la store */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 5. PayloadAction actua como un generico del valor del payload de la action

export type UserId = string

//3. Estructura del usuario por defecto
export interface User{
  name: string
  email: string
  github: string
}

// El usuario que guardamos en el estado
export interface UserWithId extends User{
  id: UserId
}

const DEFAULT_STATE: UserWithId[] = [
  {
    id: '1',
    name: 'Miguel Angel Duran',
    email: 'miduga@gmail.com',
    github: 'midudev'
  },
  {
    id: '2',
    name: 'Alejandro Arteaga',
    email: 'alexcode@gmail.com',
    github: 'MusashiScripts'
  },
  {
    id: '3',
    name: 'Tony God',
    email: 'tonygod@gmail.com',
    github: 'Atonio Pereira'
  }
]

//IIFE
const storageState: UserWithId[] = (()=> { 
  const persistedState = localStorage.getItem('__redux__state__')
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

/* 2. Los slices necesitan un nombre, un estado inicial, y los reducers */

export const usersSlice = createSlice({
  name: 'users',
  initialState: storageState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const newUser = {
        id: crypto.randomUUID(),
        ...action.payload
      }
      //return [...state, newUser]

      //con Redux Toolkit podemos mutar el state pq usa por detras immer --> (Actualizaciones inmutables)
      state.push(newUser)
    },

    editUserById: (state, action: PayloadAction<UserWithId>) => {
      const { id ,name, email, github } = action.payload
      const userIndex = state.findIndex((user) => user.id === id)
      if (userIndex !== -1) {
        const userUpdated = state[userIndex]
        if(name) userUpdated.name = name
        if(email) userUpdated.email = email
        if (github) userUpdated.github = github
        
        state[userIndex] = userUpdated
      }
    },
    
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefinded = state.some(user => user.id === action.payload.id) 
      if (!isUserAlreadyDefinded) {
        state.push(action.payload)
        //return [...state, action.payload]
      }
    }
  },
})

export default usersSlice.reducer

/* 4. reducers seria un objeto donde le pondrias como key el nombre de la accion y el value seria un metodo para que haga esa accion */


// 6. Exportar la accion en si, usersSlice.actions serian todas las que estan dentro del objeto reducers, mejorando asi el codigo evitando el uso de las magic strings
export const { addNewUser, editUserById ,deleteUserById, rollbackUser } = usersSlice.actions