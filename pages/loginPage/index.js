import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/pages/loginPage/login.module.css'
import { BiEnvelope } from 'react-icons/bi'
import { BiLock } from 'react-icons/bi'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/router'
import { provide } from '@/configs/firebase'
import { fbAuthProvider } from '@/configs/firebase'
import { auth as firebaseAuth, Googlelogout } from '@/configs/firebase'
import { signInWithPopup } from 'firebase/auth'
import swal from 'sweetalert'

function LogIn() {
  const { auth, login, logout, logoutWithoutAlert, setAuth } = useAuth()
  const Logout = async () => {
    const result = await Googlelogout()
    if (result) {
      // 登出成功的處理邏輯
    } else {
      // 登出失敗的處理邏輯
    }
  }
  const [userTmpl,setUserTmpl] = useState({})
  const GoogleLogin = async () => {
    const result = await signInWithPopup(firebaseAuth, provide)
    console.log(result)
    if (result) {
      swal({
        icon: 'success',
        title: '登入成功',
        text: '按確認去首頁',
        buttons: {
          confirm: {
            text: '確認',
            value: true,
            visible: true,
          },
        },
      }).then((confirm) => {
        if (confirm) {
          router.push('/')
        } else {
        }
      })
    } 
  }

  const FacebookLogin = async () => {
    const result = await signInWithPopup(firebaseAuth, fbAuthProvider)
    console.log(result)
    if (result) {
      swal({
        icon: 'success',
        title: '登入成功',
        text: '按確認去首頁',
        buttons: {
          confirm: {
            text: '確認',
            value: true,
            visible: true,
          },
        },
      }).then((confirm) => {
        if (confirm) {
          router.push('/')
        } else {
        }
      })
    } 
  }

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const router = useRouter()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log({ account, password })
    login(account, password).then((result) => {
      if (result) {
        swal({
          icon: 'success',
          title: '登入成功',
          text: '按確認去首頁',
          buttons: {
            confirm: {
              text: '確認',
              value: true,
              visible: true,
            },
          },
        }).then((confirm) => {
          if (confirm) {
            router.push('/')
          } else {
          }
        })
      } else {
        swal({
          title: '登入失敗',
          text: '帳號或密碼錯誤!',
          icon: 'error',
          button: '重新輸入',
        })
      }
    })
  }

  
  console.log(firebaseAuth.currentUser)

  useEffect(() => {
    setUserTmpl(firebaseAuth.currentUser)
    console.log('狀態',userTmpl);
  }, [firebaseAuth,router])

  return (
    <div className={styles.main}>
      <div className={styles.loginFormContainer}>
        {auth.id || firebaseAuth.currentUser ? (
          <div className={styles.unlogMainForm}>
            <img
              className={styles.unlogPhoto}
              src={
                auth.id
                  ? auth.user_photo // 檢查 auth.user_photo 是否存在
                    ? `http://localhost:3005/imgs/${auth.user_photo}` // 如果存在，使用 auth.user_photo
                    : firebaseAuth &&
                      firebaseAuth.currentUser &&
                      firebaseAuth.currentUser.photoURL // 檢查 firebaseAuth 是否存在且 currentUser.photoURL 是否存在
                    ? firebaseAuth.currentUser.photoURL // 如果存在，使用 firebaseAuth.currentUser.photoURL
                    : '/img/Darren/logo.png' // 如果都不存在，使用預設的 logo 圖片
                  : firebaseAuth &&
                    firebaseAuth.currentUser &&
                    firebaseAuth.currentUser.photoURL // 檢查 firebaseAuth 是否存在且 currentUser.photoURL 是否存在
                  ? firebaseAuth.currentUser.photoURL // 如果存在，使用 firebaseAuth.currentUser.photoURL
                  : '/img/Darren/logo.png' // 如果都不存在，使用預設的 logo 圖片
              }
            />
            <div className={styles.unlogTitleContainer}>
              <span className={styles.unlogTitle}>Hello, </span>
              <span className={styles.unlogUsername}>
                {auth.id
                  ? auth.Username
                  : firebaseAuth?.currentUser?.displayName}
              </span>
            </div>
            <div className={styles.unlogContent}>你已經有登入囉~</div>
            <div className={styles.unlogBtnContainer}>
              <Link href={'/'}>
                <button className={styles.unlogBtn}>回首頁</button>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  auth.id ? logout() : Logout()
                }}
                className={styles.unlogBtn}
              >
                登出
              </button>
            </div>
          </div>
        ) : (
          <form name="form1" onSubmit={onSubmit} className={styles.mainForm}>
            <div className={styles.formTitle}>Welcome</div>
            <div className={styles.inputContainer}>
              <label htmlFor="email">
                <BiEnvelope className={styles.loginIcons} />
              </label>
              <input
                type="text"
                id="account"
                name="account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="請輸入信箱"
                className={styles.inputField}
                autoComplete="off"
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="password">
                <BiLock className={styles.loginIcons} />
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                className={styles.inputField}
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

            <div className={styles.linkContainer}>
              <Link className={styles.goRegister} href="/register">
                前往註冊
              </Link>
              <Link className={styles.forgotPassword} href="/forgot-password">
                忘記密碼?
              </Link>
            </div>

            <button type="submit" className={styles.submitButton}>
              登入
            </button>

            <div className={styles.Third_party_section}>
              <div className={styles.Third_party_title}>使用其他方式登入</div>
              <div className={styles.Third_party_button}>
                <button
                  className={styles.googleBtn}
                  type="button"
                  onClick={GoogleLogin}
                >
                  <img
                    className={styles.googleImg}
                    src="/img/Darren/googleLogo.png"
                  />
                </button>
                <button
                  className={styles.googleBtn}
                  type="button"
                  onClick={FacebookLogin}
                >
                  <img
                    className={styles.googleImg}
                    src="/img/Darren/facebook-Logo.png"
                  />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default LogIn
