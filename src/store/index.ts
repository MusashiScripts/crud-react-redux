//1. Importar la configuracion de la store
import { configureStore } from '@reduxjs/toolkit'
import { type Middleware } from '@reduxjs/toolkit'
import { type Action } from '@reduxjs/toolkit'

import { toast } from 'sonner'

//Reducer de usersSlice.reducer
import usersReducers from './users/slice'
import { type UserId } from './users/slice'
import { type  UserWithId  } from './users/slice'
import { rollbackUser } from './users/slice'

 type DeleteUserByIdAction = {
  type: 'users/deleteUserById'
  payload: UserId
}

//type KnownActions = DeleteUserByIdAction


// Middlewares en Redux

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  //console.log(store.getState())
  //console.log(action)
  next(action)
  //console.log(store.getState())
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
} 

   const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action: Action) => {
    //fase 1: state antes de ser actualizado por el reducer
     const { type, payload } = action as DeleteUserByIdAction //Linea a tipar correctamente
     const previousState = store.getState()
     
    next(action)
    //fase 2: state luego de ser actualizado por el reducer
     if (type === 'users/deleteUserById') { // <-- Accion de Eliminar usuario
       const userIdToRemove = payload
       const userToRemove = previousState.users.find((user: UserWithId) => user.id === userIdToRemove)
       fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
         method: 'DELETE'
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error al eliminar el usuario: ${userToRemove}`)
          }
          toast.success(`Usuario ${userIdToRemove} eliminado correctamente`)
        })
        .catch(err => {
          toast.error(`Error deleting user: ${userIdToRemove}`)
          if (userToRemove) store.dispatch(rollbackUser(userToRemove))
          console.log(err)
        })
    }
  } 

/* store: Es donde lo guardamos todo, por lo tanto es donde vamos a tenre nuestro estado, las actions, los reducers y todo esto. */

export const store = configureStore({
  reducer: {
    users: usersReducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware)
})

/* Para que podamos utilizar Redux debemos envolver nuestra aplicacion en un Provider, muy similar al ContextProvider, ya que el objetivo es tener un estado global */

//Tipo de la store para el tipado del state
export type RootState = ReturnType<typeof store.getState>

//Tipo del dispatch para el tipado del dispatch
export type AppDispatch = typeof store.dispatch