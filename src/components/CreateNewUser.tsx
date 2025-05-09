import { Badge ,Button, TextInput, Card, Title } from '@tremor/react'
import { useState } from 'react'
import { useUserActions } from '../hooks/useUserActions'
//import { toast } from 'sonner'

export function CreateNewUser() { 
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok'| 'ko' | null >(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => { 
    event.preventDefault()
    setResult(null)
      
    const form = event.currentTarget
    const data = new FormData(form)

    const name = data.get('username') as string
    const email = data.get('email') as string
    const github = data.get('github') as string

    if (!name || !email || !github) {
      //toast.error('Error al crear usuario, campos incompletos')
      return setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
    //toast.success('Usuario creado con exito')
  }

  return (
    <Card className='mt-3 max-w-lg mx-auto'>
      <Title className='mb-5'>Create New User</Title>

      <form onSubmit={handleSubmit} className='flex flex-col gap-y-3'>
        <TextInput name='username' placeholder='Escriba su nombre' />
        <TextInput name='email' placeholder='Escriba su email' />
        <TextInput name='github' placeholder='Escriba su github user' />
        <section className='flex gap-x-1 items-center'>
          <div className='flex gap-x-1 flex-grow'>
            <Button type='submit' >Crear usuario</Button>
            <Button color='red' type='reset'>Clear</Button>
          </div>
            {result === 'ok' && <Badge className='rounded-full' color='green'>Usuario creado</Badge>}
            {result === 'ko' && <Badge className='rounded-full' color='red'>Error en los campos</Badge>}
        </section>
      </form>
    </Card>
  )
}