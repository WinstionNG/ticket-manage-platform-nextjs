'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
    title: string
    description: string
}
const NewIssuePage = () => {
  const router = useRouter()
  const {register, control, handleSubmit} = useForm<IssueForm>()
  const [errors, setErrors] = useState<string>()
  
  return (
    <div className='max-w-xl'>
        {errors && <Callout.Root className='mb-5' color='red'>
            <Callout.Text>{errors}</Callout.Text>
        </Callout.Root>}
    <form 
        className=' space-y-3'
        onSubmit={handleSubmit(async(data) => {
            try {
                await axios.post('/api/issues', data)
                router.push('/issues')
            }catch(err) {
                setErrors('An unexpect error occur!')
            }
        })}
    >
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')}/>
      </TextField.Root>
      <Controller 
        name='description'
        control={control}
        render={({field}) => <SimpleMDE placeholder='description' {...field}/>}
      />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage
