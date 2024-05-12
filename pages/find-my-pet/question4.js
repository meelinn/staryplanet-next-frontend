import React from 'react'
import Link from 'next/link'
//layout
import FindMyPetLayout from '@/components/layout/find-my-pet-layout'
//styles
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'

export default function Question4() {
  return (
    <>
      <div>question4</div>
      <Link href="/find-my-pet/question5">
        <button className={ContentStyles['process-button']}>選項1</button>
        <button className={ContentStyles['process-button']}>選項2</button>
      </Link>
    </>
  )
}
Question4.getLayout = function (page) {
  return <FindMyPetLayout>{page}</FindMyPetLayout>
}
