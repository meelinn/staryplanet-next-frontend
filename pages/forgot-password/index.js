import React, { useState } from 'react'
import axios from 'axios'
import { FORGOT_PASSWORD } from '@/components/config'
import styles from '@/pages/forgot-password/forgotpass.module.css'
import { BiEnvelope } from 'react-icons/bi'
import {  BiErrorCircle, BiX } from 'react-icons/bi'

function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState({
    Username: '',
    Email: '',
    Phone: '',
    Password: '',
    // 可以根據需要添加其他欄位的錯誤訊息
  })

   const closeModal = () => {
     setShowModal(false)
   }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      swal({
        title: '請輸入正確的信箱',
        icon: 'warning',
        button: '重新輸入',
      })
      return
    }
    swal({
      title: '信件已送出',
      text: '請去所輸入的信箱閱覽',
      icon: 'success',
      button: '確定',
    })
    try {
      const response = await axios.post(FORGOT_PASSWORD, { email })
      setMessage(response.data.message)
    } catch (error) {
      console.log('Error:', error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // 檢查後端返回的錯誤訊息是否包含 "User not found"
        if (error.response.data.message === 'User not found') {
          // 如果是，彈出 SweetAlert 警告框
          swal({
            title: '使用者不存在',
            text: '請確認輸入的郵箱是否正確。',
            icon: 'error',
            button: '確定',
          })
        } else {
          // 如果不是 "User not found"，顯示其他錯誤訊息
          setErrorMsg({ ...errorMsg, Email: error.response.data.message })
          setShowModal(true)
        }
      } else {
        setMessage('An error occurred while processing your request.')
      }
    }
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.loginFormContainer}>
          <form className={styles.mainForm} onSubmit={handleSubmit}>
            <div className={styles.formTitle}>請輸入信箱</div>
            <div className={styles.inputContainer}>
              <label htmlFor="email">
                <BiEnvelope className={styles.loginIcons} />
              </label>
              <input
                className={styles.inputField}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className={styles.submitButton} type="submit">
              提交
            </button>
          </form>
        </div>
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <BiErrorCircle className={styles.modalWarningIcon} />

              <div className={styles.modalTextContainer}>
                {errorMsg.Email && (
                  <div className={styles.modalText}>{errorMsg.Email}</div>
                )}
              </div>
              <BiX className={styles.modalCloseIcon} onClick={closeModal} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ForgotPasswordForm
