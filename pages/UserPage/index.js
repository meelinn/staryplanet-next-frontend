import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/pages/UserPage/userpage.module.css'
import Infomations from '@/components/common/forUserPage/Infomations'
import Coupons from '@/components/common/forUserPage/Coupons'
import Favorite from '@/components/common/forUserPage/Favorite'
import Order from '@/components/common/forUserPage/Order'
import { useAuth } from '@/contexts/auth-context'
import { auth as firebaseAuth } from '@/configs/firebase'

function UserPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isInfoClicked, setIsInfoClicked] = useState(false)
  const [isCouponsClicked, setIsCouponsClicked] = useState(false)
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false)
  const [isOrderClicked, setIsOrderClicked] = useState(false)
  const { auth } = useAuth()

  useEffect(() => {
    const { account, favorite, order, coupons } = router.query
    if (account === '') {
      setIsOrderClicked(false)
      setIsFavoriteClicked(false)
      setIsInfoClicked(true)
      setIsCouponsClicked(false)
    }
    if (favorite === '') {
      setIsOrderClicked(false)
      setIsInfoClicked(false)
      setIsFavoriteClicked(true)
      setIsCouponsClicked(false)
    }
    if (order === '') {
      setIsFavoriteClicked(false)
      setIsInfoClicked(false)
      setIsOrderClicked(true)
      setIsCouponsClicked(false)
    }
    if (coupons === '') {
      setIsFavoriteClicked(false)
      setIsInfoClicked(false)
      setIsOrderClicked(false)
      setIsCouponsClicked(true)
    }
    if (coupons === '') {
      setIsFavoriteClicked(false)
      setIsInfoClicked(false)
      setIsOrderClicked(false)
      setIsCouponsClicked(true)
    }
  }, [router.query])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const setActiveComponent = (component) => {
    setIsInfoClicked(component === 'info')
    setIsCouponsClicked(component === 'coupons')
    setIsFavoriteClicked(component === 'favorite')
    setIsOrderClicked(component === 'order')
  }

  const InfoPopup = () => setActiveComponent('info')
  const CouponsPopup = () => setActiveComponent('coupons')
  const FavoritePopup = () => setActiveComponent('favorite')
  const OrderPopup = () => setActiveComponent('order')

  return (
    <div className={styles.main}>
      {auth.id || firebaseAuth.currentUser ? (
        <>
          <div className={styles.rightSide}>
            <Infomations
              open={isInfoClicked}
              MemberID={auth.id}
              onClose={() => setIsInfoClicked(false)}
            ></Infomations>
            <Coupons
              open={isCouponsClicked}
              onClose={() => setIsCouponsClicked(false)}
            ></Coupons>
            <Favorite
              open={isFavoriteClicked}
              onClose={() => setIsFavoriteClicked(false)}
            ></Favorite>
            <Order
              open={isOrderClicked}
              onClose={() => setIsOrderClicked(false)}
            ></Order>
          </div>

          <div className={styles.leftSide}>
            <div className={styles.userPageLeftBarContainer}>
              <div className={styles.userPageLinkContainer}>
                <li>
                  <Link
                    href="/UserPage?account"
                    onClick={(e) => {
                      InfoPopup()
                    }}
                  >
                    會員資料
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?favorite"
                    onClick={(e) => {
                      FavoritePopup()
                    }}
                  >
                    我的最愛
                  </Link>
                </li>

                <li>
                  <Link
                    href="/UserPage?order"
                    onClick={(e) => {
                      OrderPopup()
                    }}
                  >
                    訂單紀錄{' '}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?coupons"
                    onClick={(e) => {
                      CouponsPopup()
                    }}
                  >
                    超優惠券
                  </Link>
                </li>
              </div>
            </div>
            <div
              className={`${styles.userPageLeftBarContainerSmall} ${
                isOpen ? styles.open : ''
              }`}
            >
              <div className={styles.userPageLinkContainer}>
                <li>
                  <Link
                    href="/UserPage?account"
                    onClick={(e) => {
                      InfoPopup()
                    }}
                  >
                    會員資料
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?favorite"
                    onClick={(e) => {
                      FavoritePopup()
                    }}
                  >
                    我的最愛
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?order"
                    onClick={(e) => {
                      OrderPopup()
                    }}
                  >
                    訂單紀錄{' '}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?coupons"
                    onClick={(e) => {
                      CouponsPopup()
                    }}
                  >
                    超優惠券
                  </Link>
                </li>
              </div>
              <button
                className={`${styles.leftBarBtn} ${
                  isOpen ? styles.clicked : ''
                }`}
                onClick={toggleDropdown}
              >
                <i
                  className={`fa-solid fa-chevron-${isOpen ? 'left' : 'right'}`}
                ></i>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.unlogRightSide}>
            <img className={styles.unlogLogo} src="/img/Darren/logo.png" />
            <h1 className={styles.unlogTitle}>Oops..</h1>
            <h2 className={styles.unlogText}>請先註冊或登入</h2>
            <div className={styles.unlogBtnContainer}>
              <Link href="/loginPage" className={styles.toLogin}>
                登入
              </Link>
              <Link href="/register" className={styles.Signup}>
                註冊
              </Link>
            </div>
          </div>

          <div className={styles.leftSide}>
            <div className={styles.userPageLeftBarContainer}>
              <div className={styles.userPageLinkContainer}>
                <li>
                  <Link
                    href="/UserPage?account"
                    onClick={(e) => {
                      InfoPopup()
                    }}
                  >
                    會員資料
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?favorite"
                    onClick={(e) => {
                      FavoritePopup()
                    }}
                  >
                    我的最愛
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?order"
                    onClick={(e) => {
                      OrderPopup()
                    }}
                  >
                    訂單紀錄{' '}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?coupons"
                    onClick={(e) => {
                      CouponsPopup()
                    }}
                  >
                    超優惠券
                  </Link>
                </li>
              </div>
            </div>
            <div
              className={`${styles.userPageLeftBarContainerSmall} ${
                isOpen ? styles.open : ''
              }`}
            >
              <div className={styles.userPageLinkContainer}>
                <li>
                  <Link
                    href="/UserPage?account"
                    onClick={(e) => {
                      InfoPopup()
                    }}
                  >
                    會員資料
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?favorite"
                    onClick={(e) => {
                      FavoritePopup()
                    }}
                  >
                    我的最愛
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?order"
                    onClick={(e) => {
                      OrderPopup()
                    }}
                  >
                    訂單紀錄{' '}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UserPage?coupons"
                    onClick={(e) => {
                      CouponsPopup()
                    }}
                  >
                    超優惠券
                  </Link>
                </li>
              </div>
              <button
                className={`${styles.leftBarBtn} ${
                  isOpen ? styles.clicked : ''
                }`}
                onClick={toggleDropdown}
              >
                <i
                  className={`fa-solid fa-chevron-${isOpen ? 'left' : 'right'}`}
                ></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UserPage
