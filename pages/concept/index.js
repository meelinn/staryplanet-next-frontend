import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/concept/concept.module.scss'
import LinkBtn from '@/components/concept/link-btn'

import {
  FaCommentDots,
  FaPen,
  FaClipboardCheck,
  FaBriefcaseMedical,
  FaInfoCircle,
  FaHome,
} from 'react-icons/fa'
import ConceptS3Card from '../../components/concept/concept-s3-card'
import ConceptS4Card from '../../components/concept/concept-s4-timeline'
import BannerStyles from '@/styles/adoption/info-adoption/banner.module.css'
// import { ScrollerMotion } from 'scroller-motion'

export default function ConceptIndex() {
  // ConceptSection3Card's Data
  const section3CardsData = [
    {
      src: '/img/concept/3-1.jpg',
      alt: '居住環境',
      title: '居住環境',
      text: '確保您的居住環境安全舒適，並符合寵物的需要。檢查房屋大小、室內外空間、安全性以及有無封閉庭院等因素。考慮住戶規定、動物禁止條款以及鄰里政策。確保您的家庭成員與新寵物相處無礙，並準備好為牠提供一個溫馨的家。',
    },
    {
      src: '/img/concept/3-2.jpg',
      alt: '陪伴時間',
      title: '陪伴時間',
      text: '請確保您有足夠的時間陪伴新寵物。考慮您的工作、學習和社交安排，確保有時間提供愛與關懷。給予寵物適當的運動、訓練和社交化，以滿足其生理和心理需求。設定日常時間表，確保每天有固定的陪伴時間。若無法提供足夠的陪伴，考慮雇用寵物照顧者或尋求其他支援。寵物是一生的伙伴，請確保您能夠全心投入。',
    },
    {
      src: '/img/concept/3-3.jpg',
      alt: '經濟條件',
      title: '經濟條件',
      text: '領養寵物需要考慮經濟負擔。除了領養費用外，還需要考慮日常花費，如食物、醫療保健、玩具和訓練。請確保您有足夠的財力來滿足寵物的需要，並考慮應對突發情況的預算。寵物是一項長期承諾，請確保您有能力提供他們所需的照顧和支持，並在經濟上能夠負擔相關費用。',
    },
  ]

  // ConceptSection4Card's Data
  const section4CardsData = [
    { icon: <FaCommentDots />, text: '第一次互動接觸' },
    { icon: <FaPen />, text: '現場辦理認養手續，或線上申請預約領養' },
    { icon: <FaClipboardCheck />, text: '新飼主證件核對及條件評估' },
    {
      icon: <FaBriefcaseMedical />,
      text: '健康檢查後，免費植入晶片、寵物登記及施打狂犬病疫苗',
    },
    { icon: <FaInfoCircle />, text: '接收領養諮詢與協助等服務' },
    { icon: <FaHome />, text: '完成認領養手續，帶毛孩回新家' },
  ]

  return (
    <>
      <div className={styles['mt']}>
        <LinkBtn />
        {/* concept-section1-認養概念 */}
        {/* <div
        className={`container-fluid mt-5 mb-5 ${styles['melin-concept-section1']}`}
      > */}

        <div className="container my-5">
          <div className="row align-items-center vh-100">
            <div className="col-12 col-lg-5 p-0 ">
              <div className={styles['melin-concept-section1-img-cut']}>
                <img
                  src="/img/concept/bogdan-farca-CEx86maLUSc-unsplash.jpg"
                  className="img-fluid"
                  alt="認養概念"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6 ms-5">
              <h5
                className={`text-secondary fw-bolder mb-3  ${styles['melin-concept-section1-line']}`}
              >
                給無家之寵一個溫暖家，擁抱愛心與責任。
              </h5>

              <h1 className="text-primary fw-bolder mb-5">認養概念</h1>
              <p>
                我們致力於推廣寵物認養，鼓勵大家給流浪動物一個溫暖的家。認養不僅是對一隻無家可歸的動物給予第二次機會，更是對愛心和責任的展現。通過認養，您不僅可以得到一個忠實的伴侶，還可以幫助減少流浪動物的數量。我們提供專業的認養服務和支持，確保每一隻動物都能找到適合的家庭，與他們共度美好的一生。讓我們一起為改善動物福利出一份力，從今天開始，與一隻可愛的小夥伴開啟美好的新生活吧！
              </p>
              <Link href="/Adoption">
                <button className={BannerStyles['process-button']}>
                  帶我回家
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* concept-section2-配對測驗 */}
        <div
          className={`container-fluid vh-100 bg-primary ${styles['melin-s2-bg']} ${styles['bg-img']}`}
        >
          <div className={`container `}>
            <div className="row vh-100 justify-content-end align-items-center">
              <div className="card border-0 col-12 col-lg-7 rounded-4">
                <div className="card-body p-5">
                  <h5 className="card-title text-secondary fw-bolder mb-2">
                    不知道自己適合什麼寵物嗎？
                  </h5>
                  <h6 className="card-subtitle mb-3 text-primary-light">
                    適配度大解密
                  </h6>
                  <p className="card-text">
                    寵物適配度測試將為您揭示您最適合的寵物種類。無論您是熱愛活力四射的狗狗，還是喜歡貓咪般的沉靜，透過我們的測驗，讓您找到最完美的寵物伴侶。讓我們幫助您打破迷惘，迎接一個與您相得益彰的新家庭成員吧！
                  </p>
                  <div className="d-flex justify-content-end">
                    {/* <Link href="/find-my-pet">
                      <button
                        type="button"
                        className="btn btn-secondary ps-5 pe-5"
                      >
                        開始測驗
                      </button>
                    </Link> */}
                    <Link href="/find-my-pet">
                      <button className={BannerStyles['process-button']}>
                        開始測驗
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* concept-section3-領養前評估事項 */}
        <div className="container my-5 ">
          <div className="row justify-content-center">
            <h2 className="text-center text-primary fw-bolder mb-5 ">
              領養前評估事項
            </h2>
            <p className="text-center">
              在領養前，請確保您有足夠的時間、空間和資源來照顧新成員。考慮您的生活方式、住戶規定以及家庭成員的需求，並準備好承擔責任。
              <br />
              最重要的是，擁有一顆開放、愛心和耐心的心，以迎接新家庭成員的到來。
            </p>
            {/* card */}
            {/* <div className="row justify-content-evenly mt-5"> */}
            <div className="card-container d-flex justify-content-center flex-column flex-lg-row gap-4">
              {section3CardsData.map((v, i) => (
                <ConceptS3Card
                  key={i}
                  src={v.src}
                  alt={v.alt}
                  title={v.title}
                  text={v.text}
                />
              ))}
            </div>
          </div>
        </div>

        {/* concept-section4-領養流程 */}
        {/* <section className="timeline-section section-padding" id="section_3">
        <div className="section-overlay"></div> */}
        <div className={styles['bg-end']}>
          <div className={`container`}>
            <div className="row">
              <div className="col-12">
                <h2 className="text-primary fw-bolder mb-5 text-center">
                  領養流程
                </h2>
              </div>

              <div className="col-lg-10 col-12 mx-auto">
                {/* <div className="timeline-container"> */}
                <ul className="timeline" id="timeline">
                  {/* <div className="list-progress">
                <div className="inner"></div>
              </div> */}
                  {section4CardsData.map((v, i) => (
                    <ConceptS4Card key={i} icon={v.icon} text={v.text} />
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-12 text-center my-5">
              <Link href="/Adoption">
                <button className={BannerStyles['process-button']}>
                  帶我回家
                </button>
              </Link>
            </div>
          </div>
          {/* </div>
      </section> */}
        </div>
      </div>
    </>
  )
}
