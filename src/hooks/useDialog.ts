import { type UserId } from '../store/users/slice'
import { useState } from 'react'

export const useDialog = () => {
  //states para editar
  const [openDialog, setOpenDialog] = useState(false)
  const [userIdToEdit, setUserIdToEdit] = useState<UserId | null>()

  const openModal = ({ id }: { id: UserId}) => {
    setUserIdToEdit(id)
    setOpenDialog(true)
  }

  const closeModal = () => {
    setUserIdToEdit(null)
    setOpenDialog(false)
  }
  
  return { openDialog, userIdToEdit, openModal, closeModal }
}