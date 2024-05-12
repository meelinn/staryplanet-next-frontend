import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import headerStyles from '@/components/layout/navbar/header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleUser,
  faHeart,
  faCartShopping,
  faList,
} from '@fortawesome/free-solid-svg-icons'
import Popup from '@/components/common/Popup'
import { useRouter } from 'next/router'

const navLinkClass = `${headerStyles['aki-nav-link']} ${headerStyles['aki-link']} ${headerStyles['aki-kukuri']}`

function Navbar({ formData }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const popupRef = useRef(null)
  const buttonRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const togglePopup = () => {
    setIsClicked(true)
    if (isClicked === true) {
      setIsClicked(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 檢查是否點擊到了 popupRef 以外的地方
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // 檢查是否點擊到了 togglePopup 按鈕
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
          setIsClicked(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className={headerStyles['A-header']}>
      <div ref={popupRef}>
        <Popup
          open={isClicked}
          onClose={() => setIsClicked(false)}
          formData={formData}
        ></Popup>
      </div>
      <div className={headerStyles['A-container']}>
        <div id={headerStyles['pet-logo']}>
          <Link href="/">
            <img id={headerStyles['logo-img']} src="/logo.png" alt="logo" />
            <h2 id={headerStyles['logo-word']}>毛毛星球</h2>
          </Link>
        </div>

        <nav>
          <ul className={headerStyles['aki-primary-nav']}>
            <li>
              <Link href="/concept" className={navLinkClass}>
                認養概念
              </Link>
            </li>
            <li>
              <Link href="/Adoption" className={navLinkClass}>
                帶我回家
              </Link>
            </li>
            <li>
              <Link href="/Pet-poduct" className={navLinkClass}>
                毛毛商城
              </Link>
            </li>
            <li>
              <Link href="/insurance" className={navLinkClass}>
                醫院保險
              </Link>
            </li>
            <li>
              <Link href="/aboutUs" className={navLinkClass}>
                關於我們
              </Link>
            </li>
          </ul>
        </nav>

        <div
          className={`${headerStyles['responsiveHeader']} ${
            isOpen ? headerStyles.open : ''
          }`}
        >
          <li>
            <Link href="#">認養概念</Link>
          </li>
          <li>
            <Link href="#">帶我回家</Link>
          </li>
          <li>
            <Link href="#">毛毛商城</Link>
          </li>
          <li>
            <Link href="#">醫院保險</Link>
          </li>
          <li>
            <Link href="#">關於我們</Link>
          </li>
        </div>

        <div className={headerStyles['icon-box']}>
          <button
            ref={buttonRef}
            onClick={togglePopup} // 點擊按鈕時切換 popup 狀態
            className={headerStyles['icon']}
          >
            <FontAwesomeIcon icon={faCircleUser} />
          </button>

          <button
            onClick={() => {
              router.push('/UserPage?favorite')
            }}
            className={headerStyles['icon']}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button
            className={headerStyles['icon']}
            onClick={() => {
              router.push('/order-form')
            }}
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </button>

          <div id={headerStyles['main']}>
            <span
              className={`${headerStyles['menu-button']} ${
                isOpen ? headerStyles.clicked : ''
              }`}
              onClick={toggleDropdown}
              role="button"
            >
              <FontAwesomeIcon icon={faList} className={headerStyles['icon']} />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
