import React, { useEffect, useRef, useState } from 'react'
import styles from '@/components/common/LoginPopup/LoginPopup.module.css'
import Link from 'next/link'

export default function LoginPopup({ open, onClose, errorType }) {
  if (!open) return null

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (open) {
      // 根據錯誤類型設置相應的錯誤訊息
      if (errorType === 'validateUsername') {
        setErrorMessage('請輸入正確的姓名')
      } else if (errorType === 'validateEmail') {
        setErrorMessage('請輸入正確的 Email')
      } else if (errorType === 'validateRetypePasswordBlur') {
        setErrorMessage('請輸入正確的密碼')
      } else {
        setErrorMessage('')
      }
    }
  }, [open, errorType])

  return (
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        {errorMessage && <div className={styles.errorMsg}>{errorMessage}</div>}
      </div>
    </div>
  )
}
