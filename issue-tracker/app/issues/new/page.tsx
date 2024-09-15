'use client'
import { Button, Callout, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import SimpleMDE from "react-simplemde-editor";


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState<string>()
  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmit = handleSubmit(async(data) => {
    try {
        setSubmitLoading(true)
        await axios.post('/api/issues', data)
        router.push('/issues')
    }catch(err) {
        setError('An unexpect error occur!')
    }finally {
        setSubmitLoading(false)
    }
})
  
  return (
    <div className='max-w-xl'>
        {error && <Callout.Root className='mb-5' color='red'>
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form 
        className='space-y-3'
        onSubmit={onSubmit}
    >
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')}/>
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller 
        name='description'
        control={control}
        render={({field}) => <SimpleMDE placeholder='description' {...field}/>}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={submitLoading}>Submit New Issue {submitLoading && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default NewIssuePage
