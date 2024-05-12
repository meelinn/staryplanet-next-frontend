import React from 'react'
import Link from 'next/link'
//layout
import FindMyPetLayout from '@/components/layout/find-my-pet-layout'
//styles
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'

export default function Question3() {
  return (
    <>
      <div>question3</div>
      <Link href="/find-my-pet/question4">
        <button className={ContentStyles['process-button']}>選項1</button>
        <button className={ContentStyles['process-button']}>選項2</button>
      </Link>
    </>
  )
}
Question3.getLayout = function (page) {
  return <FindMyPetLayout>{page}</FindMyPetLayout>
}
