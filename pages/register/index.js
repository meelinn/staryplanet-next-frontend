import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/pages/register/register.module.css'
import LoginPopup from '@/components/common/LoginPopup/LoginPopup'
import {
  BiEnvelope,
  BiLock,
  BiShow,
  BiHide,
  BiMaleFemale,
  BiUser,
  BiPhone,
  BiErrorCircle,
} from 'react-icons/bi'
import { AB_ADD_POST } from '@/components/config'
import { useRouter } from 'next/router'
import bcrypt from 'bcryptjs'

const typeFailedBorder = {
  border: '2px solid rgba(255, 0, 0, 0.35)',
}

const typeFailedIconColor = {
  color: 'rgba(255, 0, 0, 0.8)',
}

const redText = {
  color: 'rgba(255, 0, 0, 0.8)',
}

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsgContent, setErrorMsgContent] = useState('')
  const [errorMsgContentClassName, setErrorMsgContentClassName] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const updateErrorMsg = () => {
    const errorFields = Object.entries(errorMsg)
      .filter(([field, message]) => message !== '')
      .map(([field, message]) => {
        switch (field) {
          case 'Username':
            return '姓名'
          case 'Email':
            return 'Email'
          case 'Password':
            return '密碼'
          case 'Phone':
            return '手機號碼'
          case 'Gender':
            return '性別'
          default:
            return ''
        }
      })
    const errorMsgString =
      errorFields.length > 0 ? `請輸入正確的 ${errorFields.join('、')}。` : ''
    setErrorMsgContent(errorMsgString)
  }

  const router = useRouter()
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Phone: '',
    Password: '',
  })
  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    Username: '',
    Email: '',
    Phone: '',
  })

  useEffect(() => {
    updateErrorMsg()
  }, [errorMsg])
  // 整個表單有沒有通過檢查
  const [isPass, setIsPass] = useState(false)

  const validateUsername = (Username) => {
    return Username.toString().length >= 2
  }
  const validateRetypePassword = (Password) => {
    // 確保 Password 和 RetypePassword 都有值
    if (formData.Password && formData.RetypePassword) {
      return Password === formData.RetypePassword
    } else {
      return false
    }
  }
  const validateEmail = (Email) => {
    return Email.toString().indexOf('@') >= 0 // 粗略的判斷方式
  }
  const validatePhone = (Phone) => {
    return /^09\d{2}-?\d{3}-?\d{3}$/.test(Phone)
  }

  const validateGender = () => {
    if (!formData.Gender) {
      setErrorMsg({ ...errorMsg, Gender: '請選擇性別' })
      return false
    } else {
      setErrorMsg({ ...errorMsg, Gender: '' })
      return true
    }
  }

  const fieldChanged = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)

    if (name === 'Gender') {
      setErrorMsg({ ...errorMsg, Gender: '' })
    }

    // 比對用戶名稱字段
    if (name === 'Username') {
      if (!validateUsername(value)) {
        setErrorMsg({ ...errorMsg, Username: '姓名' })
        setErrorMsgContentClassName(styles.redText)
      } else {
        setErrorMsg({ ...errorMsg, Username: '' })
      }
    }

    // 比對Email字段
    if (name === 'Email') {
      if (!validateEmail(value)) {
        setErrorMsg({ ...errorMsg, Email: 'Email' })
        setErrorMsgContentClassName(styles.redText)
      } else {
        setErrorMsg({ ...errorMsg, Email: '' })
      }
    }

    // 比對手機號碼字段
    if (name === 'Phone') {
      if (!validatePhone(value)) {
        setErrorMsg({ ...errorMsg, Phone: '請輸入正確的手機號碼' })
        setErrorMsgContentClassName(styles.redText)
      } else {
        setErrorMsg({ ...errorMsg, Phone: '' })
      }
    }

    // 在此處可以繼續比對其他字段
  }

  const validateRetypePasswordBlur = (e) => {
    if (!validateRetypePassword(formData.Password)) {
      setErrorMsg({ ...errorMsg, Password: '密碼不符' })
      setErrorMsgContentClassName(styles.redText)
      return false
    } else {
      setErrorMsg({ ...errorMsg, Password: '' })
      // 在驗證完成後，從表單中刪除 RetypePassword 欄位
      return true
    }
  }

  const UsernameBlur = (e) => {
    if (!validateUsername(formData.Username)) {
      setErrorMsg({ ...errorMsg, Username: '姓名' })
      setErrorMsgContentClassName(styles.redText)
      return false
    } else {
      setErrorMsg({ ...errorMsg, Username: '' })
      return true
    }
  }
  const EmailBlur = (e) => {
    if (!validateEmail(formData.Email)) {
      setErrorMsg({ ...errorMsg, Email: 'Email' })
      setErrorMsgContentClassName(styles.redText)
      return false
    } else {
      setErrorMsg({ ...errorMsg, Email: '' })
      return true
    }
  }
  const PhoneBlur = (e) => {
    if (!validatePhone(formData.Phone)) {
      setErrorMsg({ ...errorMsg, Phone: '請輸入正確的手機號碼' })
      setErrorMsgContentClassName(styles.redText)
      return false
    } else {
      setErrorMsg({ ...errorMsg, Phone: '' })
      return true
    }
  }

  const GenderBlur = (e) => {
    if (!validateGender(formData.Gender)) {
      setErrorMsg({ ...errorMsg, Gender: '請選擇性別' })
      setErrorMsgContentClassName(styles.redText)
      return false
    } else {
      setErrorMsg({ ...errorMsg, Gender: '' })
      return true
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const tmpIsPass =
      UsernameBlur() &&
      EmailBlur() &&
      PhoneBlur() &&
      validateGender() &&
      validateRetypePasswordBlur()
    setIsPass(tmpIsPass)
    if (tmpIsPass) {
      // 將密碼哈希化
      const hashedPassword = await bcrypt.hash(formData.Password, 10)
      const formDataWithHashedPassword = {
        ...formData,
        Password: hashedPassword,
      }

      const { RetypePassword, ...formDataWithoutRetypePassword } =
        formDataWithHashedPassword

      const r = await fetch(AB_ADD_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithoutRetypePassword),
      })

      const result = await r.json()

      if (result.success) {
        swal({
          icon: 'success',
          title: '註冊成功',
          buttons: {
            cancel: {
              text: '留在此頁',
              value: false,
              visible: true,
            },
            confirm: {
              text: '去登入',
              value: true,
              visible: true,
            },
          },
        }).then((confirm) => {
          if (confirm) {
            window.location.href = '/loginPage'
          } else {
          }
        })
      } else {
        swal({
          icon: 'error',
          title: '信箱已被使用',
          text: '有問題請聯繫客服',
          buttons: {
            cancel: {
              text: '忘記密碼?',
              value: false,
              visible: true,
            },
            confirm: {
              text: '重新輸入',
              value: true,
              visible: true,
            },
          },
        }).then((cancel) => {
          if (cancel) {
          } else {
            window.location.href = '/forgot-password'
          }
        })
      }
    } else {
      swal({
        title: '請輸入必填的值以及格式正確',
        icon: 'warning',
        button: '重新輸入',
      })
    }
  }

  console.log(formData)

  const fieldFocus = (fieldName) => {
    let errorMsgText = ''
    let errorMsgClassName = ''

    // 根據不同的 input 進行判斷，設置不同的錯誤訊息文字和 CSS 類名
    switch (fieldName) {
      case 'Username':
        errorMsgText = '姓名最少需為2個字'
        errorMsgClassName = styles.grayText
        break
      case 'Email':
        errorMsgText = '請輸入你的信箱'
        errorMsgClassName = styles.grayText
        break
      case 'Phone':
        errorMsgText = '請輸入10碼手機號碼'
        errorMsgClassName = styles.grayText
        break
      case 'Password':
        errorMsgText = '密碼不能有特殊符號'
        errorMsgClassName = styles.grayText
        break
      case 'RetypePassword':
        errorMsgText = '請確認與您設定的密碼相符'
        errorMsgClassName = styles.grayText
        break
      default:
        errorMsgText = '請輸入正確的值'
        errorMsgClassName = styles.grayText // 假設 styles.blackText 是定義了黑色字體的 CSS 類名
        break
    }

    // 設置錯誤訊息文字和 CSS 類名
    setErrorMsgContent(errorMsgText)
    setErrorMsgContentClassName(errorMsgClassName)
  }

  return (
    // TODO : 決定判斷錯誤的訊息要用彈窗還是Form內

    <div className={styles.main}>
      <div className={styles.registerFormContainer}>
        <form name="form1" onSubmit={onSubmit} className={styles.mainForm}>
          <div className={styles.formTitle}>加入毛毛星球</div>
          {errorMsgContent && (
            <div className={styles.errorMsgContainer} style={redText}>
              <div
                className={`${styles.errorMsgContent} ${errorMsgContentClassName}`}
              >
                {Array.isArray(errorMsgContent) ? (
                  errorMsgContent.map((error, index) => (
                    <div style={redText} key={index}>
                      <BiErrorCircle className={styles.errorIcons} />
                      請輸入正確的
                      {error}
                      {error}
                    </div>
                  ))
                ) : (
                  <div>
                    <BiErrorCircle className={styles.errorIcons} />
                    {errorMsgContent}
                  </div>
                )}
              </div>
            </div>
          )}
          <div
            className={styles.inputContainer}
            style={errorMsg.Username ? typeFailedBorder : {}}
          >
            <label htmlFor="name">
              <BiUser
                className={styles.registerIcons}
                style={errorMsg.Username ? typeFailedIconColor : {}}
              />
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              value={formData.Username}
              onChange={fieldChanged}
              onFocus={() => fieldFocus('Username')}
              onBlur={UsernameBlur}
              placeholder="請輸入名稱"
              className={styles.inputField}
              autoComplete="off"
            />
          </div>
          <div
            className={styles.inputContainer}
            style={errorMsg.Email ? typeFailedBorder : {}}
          >
            <label htmlFor="Email">
              <BiEnvelope
                className={styles.registerIcons}
                style={errorMsg.Email ? typeFailedIconColor : {}}
              />
            </label>
            <input
              type="text"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={fieldChanged}
              onBlur={EmailBlur}
              onFocus={() => fieldFocus('Email')}
              placeholder="請輸入信箱"
              className={styles.inputField}
              autoComplete="off"
            />
          </div>
          <div
            className={styles.inputContainer}
            style={
              errorMsg.Password || errorMsg.RetypePassword // 檢查密碼或確認密碼是否出現錯誤
                ? typeFailedBorder // 如果有錯誤，應用紅色邊框
                : {} // 如果沒有錯誤，保持原始樣式
            }
          >
            <label htmlFor="password">
              <BiLock
                className={styles.registerIcons}
                style={errorMsg.Password ? typeFailedIconColor : {}}
              />
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={fieldChanged}
              onFocus={() => fieldFocus('Password')}
              onBlur={validateRetypePasswordBlur}
              placeholder="密碼"
              className={styles.inputField}
            />
            <label htmlFor="password" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <BiHide
                  className={`${styles.hideAndShow} ${styles.registerIcons}`}
                />
              ) : (
                <BiShow
                  className={`${styles.hideAndShow} ${styles.registerIcons}`}
                />
              )}
            </label>
          </div>

          <div
            className={styles.inputContainer}
            style={
              errorMsg.RetypePassword || errorMsg.Password // 檢查確認密碼或密碼是否出現錯誤
                ? typeFailedBorder // 如果有錯誤，應用紅色邊框
                : {} // 如果沒有錯誤，保持原始樣式
            }
          >
            <label htmlFor="RetypePassword">
              <BiLock
                className={styles.registerIcons}
                style={
                  errorMsg.RetypePassword || errorMsg.Password // 檢查確認密碼或密碼是否出現錯誤
                    ? typeFailedIconColor // 如果有錯誤，應用紅色邊框
                    : {} // 如果沒有錯誤，保持原始樣式
                }
              />
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="RetypePassword"
              name="RetypePassword"
              value={formData.RetypePassword}
              onChange={fieldChanged}
              onFocus={() => fieldFocus('RetypePassword')}
              onBlur={validateRetypePasswordBlur}
              placeholder="確認密碼"
              className={styles.inputField}
            />
          </div>

          <div
            className={styles.inputContainer}
            style={errorMsg.Phone ? typeFailedBorder : {}}
          >
            <label htmlFor="Phone">
              <BiPhone
                className={styles.registerIcons}
                style={errorMsg.Phone ? typeFailedIconColor : {}}
              />
            </label>
            <input
              type="text"
              id="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={fieldChanged}
              onBlur={PhoneBlur}
              onFocus={() => fieldFocus('Phone')}
              placeholder="請輸入電話"
              className={styles.inputField}
              autoComplete="off"
            />
          </div>

          <div
            className={styles.radioContainer}
            style={errorMsg.Gender ? typeFailedBorder : {}}
          >
            <div>
              <label>
                <BiMaleFemale
                  className={styles.registerIcons}
                  style={errorMsg.Gender ? typeFailedIconColor : {}}
                />
              </label>
              <input
                className={styles.inputRadio}
                type="radio"
                id="female"
                name="Gender"
                value="女生"
                onChange={fieldChanged}
                checked={formData.Gender === '女生'}
              />
              <label className={styles.radioOptions}>女生</label>
            </div>
            <div>
              <input
                className={styles.inputRadio}
                type="radio"
                id="male"
                name="Gender"
                value="男生"
                onChange={fieldChanged}
                checked={formData.Gender === '男生'}
              />
              <label className={styles.radioOptions}>男生</label>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            送出
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
