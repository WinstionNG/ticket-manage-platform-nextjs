import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface IIssueDetailPageProps {
    params: {id: string}
}
const IssueDetailPage = async ({params: { id }} : IIssueDetailPageProps) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })
 if (!issue) {
    notFound()
 }
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <div className='flex space-x-3 my-2'>
        <IssueStatusBadge status={issue?.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </div>
      <Card className='prose mt-4'>
       <ReactMarkdown>{issue?.description}</ReactMarkdown> 
    </Card>
      
    </div>
  )
}

export default IssueDetailPage
