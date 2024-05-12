import React from 'react'
import Link from 'next/link'
//layout
import FindMyPetLayout from '@/components/layout/find-my-pet-layout'
//styles
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'

export default function Question5() {
  return (
    <>
      <div>question5</div>
      <Link href="/find-my-pet/result">
        <button className={ContentStyles['process-button']}>選項1</button>
        <button className={ContentStyles['process-button']}>選項2</button>
      </Link>
    </>
  )
}
Question5.getLayout = function (page) {
  return <FindMyPetLayout>{page}</FindMyPetLayout>
}
