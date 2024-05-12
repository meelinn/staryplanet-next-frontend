import React from 'react'
import { BiSolidMap, BiSolidPhone, BiSolidEnvelope } from 'react-icons/bi'

import styles from '@/components/layout/footer/footer.module.css'

const Footer = () => {
  return (
    <footer className={styles['main']}>
      <div className="container">
        <div className="row ">
          <div
            className={`col-lg-3 col-md-6 col-sm-12 ${styles['info-container']}`}
          >
            <BiSolidPhone
              className={`${styles['bx']} ${styles['bxs-phone']}`}
            />
            <div className={styles['info-title']}>
              TEL
              <div className={styles['info-desc']}>07-268-411</div>
            </div>
          </div>
          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${styles['info-container']}`}
          >
            <BiSolidEnvelope
              className={`${styles['bx']} ${styles['bxs-envelope']}`}
            />
            <div className={`${styles['info-title']} ${styles['email-title']}`}>
              E-mail
              <div className={styles['info-desc']}>staryplant@mail.me</div>
            </div>
          </div>
          <div
            className={`col-lg-5 col-md-12 col-sm-12 ${styles['info-container']}`}
          >
            <BiSolidMap className={`${styles['bx']} ${styles['bxs-map']}`} />
            <div
              className={`${styles['info-title']} ${styles['address-title']}`}
            >
              Address
              <div className={styles['info-desc']}>
                高雄市前金區中正四路211號8號樓之1
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`container ${styles['line-container']}`}>
        <div className="row">
          <div className="col">
            <hr className={styles['custom-hr']} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row ">
          <div
            className={`col-lg-5 col-md-5 col-sm-12 ${styles['desc-container']}`}
          >
            <div className={styles['desc-title']}>
              <div className={styles['title-content']}>LOGO</div>
            </div>
            <div className={styles['desc-content']}>
              要想清楚，答對，到底是一種怎麽樣的存在。既然如此，在這種困難的抉擇下，本人思來想去，寢食難安。總結的來說，所以說，我這幾天一直在思索這個問題，這種事實對本人來說意義重大，相信對這個世界也是有一定意義的。
            </div>
          </div>
          <div
            className={`col-lg-3 col-md-5 col-sm-12 ${styles['links-container']}`}
          >
            <div className={styles['links-title']}>
              <div className={styles['title-content']}>Links</div>
            </div>
            <div className={styles['links']}>
              <ul>
                <li>
                  <a href="/">首頁</a>
                </li>
                <li>
                  <a href="/">關於我們</a>
                </li>
                <li>
                  <a href="/">會員專區</a>
                </li>
                <li>
                  <a href="/">領養知識</a>
                </li>
                <li>
                  <a href="/">毛孩商品</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="/">醫院資訊</a>
                </li>
                <li>
                  <a href="/">保險資訊</a>
                </li>
                <li>
                  <a href="/">募捐活動</a>
                </li>
                <li>
                  <a href="/">問答專區</a>
                </li>
                <li>
                  <a href="/">填寫表單</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-6 ">
            <div
              className={`${styles['desc-title']} ${styles['follow-container']}`}
            >
              <div className={styles['title-content']}>Follow us</div>
            </div>
            <div className={styles['social-container']}>
              <ul className={styles['social-icons']}>
                <li>
                  <a href="/">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-codepen"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
