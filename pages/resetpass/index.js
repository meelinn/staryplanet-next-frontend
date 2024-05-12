import React, { useState, useEffect } from 'react'
import { RESET_PASSWORD } from '@/components/config'
import styles from '@/pages/resetpass/resetpass.module.css'
import { BiShow, BiErrorCircle, BiX } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { BiLock } from 'react-icons/bi'

const main = {
  marginTop: '80px',
}

function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [resetToken, setResetToken] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState({
    Username: '',
    Email: '',
    Phone: '',
    Password: '',
    // 可以根據需要添加其他欄位的錯誤訊息
  })

  const closeModal = () => {
    setErrorMsg({ ...errorMsg, OldPassword: '' })
    setErrorMsg({ ...errorMsg, Password: '' })
    setShowModal(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // 從 URL 中解析 token
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    // 如果 token 為空，則導向使用者到登入頁面
    if (!token) {
      window.location.href = '/loginPage' // 導向到登入頁面
      return
    }

    console.log(token)
    setResetToken(token)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 檢查兩次輸入的密碼是否一致
    if (password !== confirmPassword) {
      swal({
        title: '密碼不一致',
        text:'請確保輸入相同的密碼',
        icon: 'warning',
        button: '重新輸入',
      })
      return
    }

    // 向後端提交重設密碼請求
    const response = await fetch(RESET_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: resetToken, password }), // 使用 resetToken
    })
    const data = await response.json()

    // 根據後端返回的結果顯示相應消息
    if (data.success) {
      swal({
        icon: 'success',
        title: '修改成功',
        text: '按確認去登入',
        buttons: {
          confirm: {
            text: '確認',
            value: true,
            visible: true,
          },
        },
      }).then((confirm) => {
        if (confirm) {
          window.location.href = '/loginPage'
        }
      })
    } else {
      // 重設密碼失敗，顯示錯誤消息給用戶
      if (data.message === 'Invalid or expired token') {
        swal({
          icon: 'error',
          title: '時間已過期',
          text: '請重新收取驗證信',
          buttons: {
            confirm: {
              text: '確認',
              value: true,
              visible: true,
            },
          },
        }).then((confirm) => {
          if (confirm) {
            window.location.href = '/forgot-password'
          }
        })
        }
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.resetFormContainer}>
        <form className={styles.mainForm} onSubmit={handleSubmit}>
          <div className={styles.formTitle}>重設密碼</div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">
              <BiLock className={styles.loginIcons} />
            </label>
            <input
              className={styles.inputField}
              type={showPassword ? 'text' : 'password'}
              placeholder="輸入新密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">
              <BiLock className={styles.loginIcons} />
            </label>
            <input
              className={styles.inputField}
              type={showPassword ? 'text' : 'password'}
              placeholder="確認密碼"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="password" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <BiHide
                  className={`${styles.hideAndShow} ${styles.loginIcons}`}
                />
              ) : (
                <BiShow
                  className={`${styles.hideAndShow} ${styles.loginIcons}`}
                />
              )}
            </label>
          </div>
          <button className={styles.submitButton} type="submit">
            提交
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <BiErrorCircle className={styles.modalWarningIcon} />

            <div className={styles.modalTextContainer}>
              {errorMsg.Password && (
                <div className={styles.modalText}>{errorMsg.Password}</div>
              )}
            </div>
            <BiX className={styles.modalCloseIcon} onClick={closeModal} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ResetPasswordPage
