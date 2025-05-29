import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Badge,
  Card
} from '@tremor/react'
import { DeleteIcon, EditIcon } from './Icons'

//Custom Hook para leer la store
import { useAppSelector } from '../hooks/store'
import { useUserActions } from '../hooks/useUserActions'
import { EditUserDialog } from './EditUserDialaog'
import { useDialog } from '../hooks/useDialog'


export function ListOfUsers() {
  //Hook personalizado para editar
  const { openDialog, userIdToEdit, openModal, closeModal } = useDialog()

  //state.users es el nombre que le dimos al reducer en la store
  const users = useAppSelector(state => state.users)
  const { removeUser } = useUserActions()

  return (
    <Card>
      <Title>
        Usuarios
        <Badge className='mx-1 rounded-full'>{users.length}</Badge>
      </Title>
      <Table className="mt-5 border-tremor-border dark:border-dark-tremor-border rounded-lg">
        <TableHead >
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell> id </TableHeaderCell>
            <TableHeaderCell> Nombre </TableHeaderCell>
            <TableHeaderCell> Email </TableHeaderCell>
            <TableHeaderCell className='text-center'> Acciones </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {user.id}
              </TableCell>
              <TableCell className='flex items-center gap-x-2 mx-4'>
                <img className='size-10 rounded-full' src={`https://unavatar.io/github/${user.github}`} alt="Github profile pic" />
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell> 
                <div className='flex justify-center items-center gap-x-2'>
                  <button onClick={() => openModal({id: user.id})} className='cursor-pointer'>
                    <EditIcon />
                  </button>
                  <button className='cursor-pointer' onClick={() => removeUser(user.id) }>
                    <DeleteIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          {
            openDialog && userIdToEdit && (
          <EditUserDialog closeModal={closeModal} id={userIdToEdit} />
            )
          }
    </Card>
  )
}