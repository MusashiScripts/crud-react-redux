import { addNewUser, deleteUserById, editUserById } from '../store/users/slice'
import { useAppDispatch } from './store'
import type { User, UserId, UserWithId } from '../store/users/slice'

export function useUserActions() {
  const dispatch = useAppDispatch()
  
  const addUser = ({name, email, github}: User): void => { 
    dispatch(addNewUser({ name, email, github }))
  }

  const editUser = ({ id, name, email, github }: UserWithId) => {
    dispatch(editUserById({id, name, email, github}))
  } 

  const removeUser = (id: UserId): void => {
    dispatch(deleteUserById(id))
  }

  return { addUser, editUser ,removeUser }
}