import './App.css'
import { BackgroundHub } from './components/BackgroundHub'
import { CreateNewUser } from './components/CreateNewUser'
import { DataBaseIcon } from './components/Icons'
import { ListOfUsers } from './components/ListOfUsers'
import { Title } from '@tremor/react'
import { Toaster } from 'sonner'


function App() {
  return (
    <>
      <BackgroundHub />
      <Title
        className='
        mb-5
        sm:text-xl
        md:text-2xl lg:text-3xl font-semibold text-black/90 dark:text-white/90
        flex justify-center items-center gap-x-2
        '>
        CRUD using React Redux
        <DataBaseIcon/>
      </Title>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </>
  )
}

export default App
