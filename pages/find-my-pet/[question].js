import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
//layout
import FindMyPetLayout from '@/components/layout/find-my-pet-layout'
//styles
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'

// pages/question/[id].js動態路由?
export default function Question1() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    // 將用戶的答案保存在本地存儲或發送到後端進行處理
    console.log('用戶的答案：', selectedOption)
    // 導航到下一個問題頁面
    router.push(`/find-my-pet/question${question_id}`)
  }

  return (
    <>
      <h2>question1</h2>
      <div>
        <p>這是問題1的內容。</p>
        <button onClick={() => handleOptionSelect('選項A')}>選項A</button>
        <button onClick={() => handleOptionSelect('選項B')}>選項B</button>
        <button onClick={() => handleOptionSelect('選項C')}>選項C</button>
        {/* 其他選項按鈕 */}
        <button onClick={handleSubmit}>提交答案並前往下一個問題</button>
        {/* <br />
        <Link href={`/find-my-pet/question${question_id}`}>
          <a>下一個問題</a>
        </Link> */}
      </div>
    </>
  )
}
Question1.getLayout = function (page) {
  return <FindMyPetLayout>{page}</FindMyPetLayout>
}
