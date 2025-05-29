import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { toast } from 'sonner'
import { type UserId } from '../store/users/slice'
import { useUserActions } from '../hooks/useUserActions'

interface Props{
  id: UserId
  closeModal: () => void
}

export const EditUserDialog: React.FC<Props> = ({id ,closeModal}) => { 
  const { editUser } = useUserActions()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const github = data.get('github') as string
    editUser({ id, name, email, github })
    //form.reset()
    closeModal()
    toast.success(`Usuario ${id} actualizado correctamente`)
  }

  return (
    <section onClick={closeModal} className='fixed inset-0 backdrop-blur flex justify-center items-center z-10'>
      <Card id='edit-user-modal' onClick={(event) => event.stopPropagation()} className='max-w-[380px] p-10'>
        <form onSubmit={handleSubmit} className='rounded-2xl flex flex-col gap-y-4'>
          <Title>
            Usuario a editar: <Badge color='violet' className='rounded-full' >{id}</Badge>
          </Title>
          <TextInput name='name' placeholder='new name...' />
          <TextInput name='email' placeholder='new email...' />
          <TextInput name='github' placeholder='new github...' />
          <div className='flex gap-x-2'>
            <Button type='submit'>Editar</Button>
            <Button type='button' color='gray' onClick={closeModal} >Volver</Button>
          </div>
        </form>
      </Card>
    </section>
  )
}