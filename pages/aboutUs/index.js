import React, { useState } from 'react'
import Link from 'next/link'
import styles from '@/pages/aboutUs/aboutUs-style.module.css'

export default function AboutUs() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.aboutUsContainer}>
      <h1 className={styles.aboutUsTitle}>About Us</h1>
      <h3 className={styles.aboutUsSubtitle}>寵物用品公司及製造商</h3>
      <div className={styles.linkContainer}>
        <Link href="#">關於我們</Link>
        <Link href="#">組織結構</Link>
        <Link href="#">經營理念</Link>
        <Link href="#">品質管理</Link>
        <Link href="#">檢驗報告</Link>
      </div>

      <div className={styles.toggle_btn_container}>
        <button
          className={`${styles.toggle_btn} ${isOpen ? styles.clicked : ''}`}
          onClick={toggleDropdown}
        >
          關於我
          <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </button>
        <div className={`${styles.dropdown_menu} ${isOpen ? styles.open : ''}`}>
          <div className={styles.dropdown_link_container}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </div>
        </div>
      </div>

      <div className={styles.descSection}>
        <img
          className={styles.aboutUsImage}
          src="/img/Darren/building2.png"
          alt=""
        />
        <div className={styles.descContainer}>
          <h3 className={styles.descTitle}>決定致力於此行業的動機</h3>
          <div className={styles.descContent}>
            <p>
              全球寵物用品公司成立於1995年，多年來專業致力於狗、貓食品的研發與生產，更拓展業務至小動物(鼠、兔)、鳥、水族…等寵物的週邊用品﹝如：洗毛精、零食、狗繩、頸圈﹞。
            </p>
            <p>
              我們重視寵物食品安全，全球寵物食品之原料皆獲得來源國官方及ISO.HACCP食品衛生認證，所研發之寵物食品會依據寵物體型及不同年齡層需求，從食品營養學的角度給予寵物全方位的照顧；而生產過程更是嚴格控管，所生產的寵物食品皆經過檢驗，以確保為品質優良的商品，可以放心讓您的寵物寶貝安心食用。
            </p>
            <p>
              全球寵物用品公司把改善寵物飼育環境作為企業的社會責任。2018年成立《愛心集食‧飼料募集平台》，提供高品質且營養豐富的寵物糧食一同幫助流浪動物及弱勢園區，藉由企業以身作則，推動寵物得到最完善的照顧是我們永續經營的目標與使命。
            </p>
          </div>
        </div>
      </div>

      <div className={styles.descImgSection}>
        <div className={styles.descImgContainer}>
          <img className={styles.descImg} src="/img/Darren/img5.jpg" alt="" />
          <img className={styles.descImg} src="/img/Darren/img4.jpg" alt="" />
          <img className={styles.descImg} src="/img/Darren/img3.jpg" alt="" />
          <img className={styles.descImg} src="/img/Darren/img1.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
