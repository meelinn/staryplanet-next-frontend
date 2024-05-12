import React, { useEffect, useRef, useContext } from 'react'
import styles from '@/components/common/Popup.module.css'
import Link from 'next/link'
import { BiCog } from 'react-icons/bi'
import { BiChat } from 'react-icons/bi'
import { BiSolidBarcode } from 'react-icons/bi'
import { useAuth } from '@/contexts/auth-context'
import { auth as firebaseAuth } from '@/configs/firebase'
import { Googlelogout } from '@/configs/firebase'

export default function Popup({ open, onClose, formData }) {
  const popupRef = useRef(null)
  const { auth, logout, userData } = useAuth()
  const Logout = async () => {
    const result = await Googlelogout()
    if (result) {
      // 登出成功的處理邏輯
    } else {
      // 登出失敗的處理邏輯
    }
  }

  useEffect(() => {
    if (open) {
      popupRef.current.style.display = 'block' // 顯示彈出窗口
      setTimeout(() => {
        popupRef.current.style.opacity = '1' // 淡入效果
      }, 100)
    } else {
      popupRef.current.style.opacity = '0' // 淡出效果
      setTimeout(() => {
        popupRef.current.style.display = 'none' // 隱藏彈出窗口
      }, 10)
    }
  }, [open])

  console.log(firebaseAuth.currentUser)

  return (
    <div ref={popupRef} className={`${styles.main} ${styles.fade}`}>
      {auth.id || firebaseAuth.currentUser ? (
        <>
          <div className={styles.topContainer}>
            <div className={styles.photoContainer}>
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
            </div>
            <div className={styles.userName}>
              {auth.id
                ? formData
                  ? auth.Username
                  : auth.Username
                : firebaseAuth?.currentUser?.displayName}
            </div>
          </div>
          <div className={styles.linksContainer}>
            <Link href="/UserPage?account">
              <BiCog className={styles.popUpIcon} />
              帳號管理
            </Link>
            <Link href="/UserPage?order">
              <BiSolidBarcode className={styles.popUpIcon} />
              購物紀錄
            </Link>
            <Link href="/UserPage?favorite">
              <BiChat className={styles.popUpIcon} />
              我的最愛
            </Link>
          </div>
          <button
            className={styles.logout}
            onClick={(e) => {
              e.preventDefault()
              auth.id ? logout() : Logout()
            }}
          >
            登出
          </button>
        </>
      ) : (
        <div className={styles.notLoggedInContainer}>
          <div className={styles.topContainer}>
            <div className={styles.photoContainer}>
              <img className={styles.unlogPhoto} src="/img/Darren/logo.png" />
            </div>
            <div className={styles.userName}>WelCome</div>
          </div>
          <div className={styles.unlogTextContainer}>
            <p className={styles.unlogTextTitle}> Oops..</p>
            <p className={styles.unlogText}>您好像尚未登入</p>
            <p className={styles.unlogText}>請先點擊下方登入或註冊</p>
          </div>
          <div className={styles.unlogBtnContainer}>
            <Link href="/loginPage" className={styles.toLogin}>
              登入
            </Link>
            <Link href="/register" className={styles.Signup}>
              註冊
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
