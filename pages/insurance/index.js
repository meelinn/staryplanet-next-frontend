import React from 'react'
import Image from 'next/image'
import styles from '../../styles/insurance.module.css'
import LinkBtn from '@/components/insurance/link-btn'

export default function insurance() {
  // 確保從 module CSS 文件應用你的樣式
  // 例如，你可以有：
  // <div className={styles.progressContainer}>...</div>
  return (
    <>
      <div className={`${styles.bradcam_area} ${styles.breadcam_bg}`}>
        <div className="container">
          <div className={styles.row}>
            <div className="col-lg-12">
              <div className="text-center">
                <h3
                  className={`fs-md-4 fs-lg-3 ${styles.text_color} ${styles.title_1}`}
                >
                  保險 and 醫院
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LinkBtn />
      <div className={styles.centered_container}>
        <div className={`justify-content-center ${styles.row}`}>
          <div className="col-12 col-sm-6 col-lg-6 text-center">
            <button type="button" className={styles.payment_button}>
              保險
            </button>
          </div>
          <div className="col-12 col-sm-6 col-lg-6 text-center">
            <button className={styles.payment_button}>醫院</button>
          </div>
        </div>
      </div>
      <section className={styles.sample_text_area}>
        <div className="container">
          <h3 className={`${styles.text_heading} ${styles.title_1}`}>
            為什麼寵物需要保險
          </h3>
          <div className={styles.single_service}>
            <p className="text-center">
              寵物保險可以幫助寵物主人應對意外或寵物生病時的醫療開銷。這是一種財務安全網，可以確保在您的愛寵需要時，您能夠負擔得起最佳的照護。從常規的預防保健到緊急手術，寵物保險都能提供廣泛的覆蓋範圍，讓您不必為高昂的治療費用而擔憂。
            </p>
          </div>
        </div>
      </section>
      <div className="container">
        <div className={`${styles.section_top_border} ${styles.first_section}`}>
          <h3 className="text-md-start text-center">1.醫療費用</h3>
          <div className={styles.row}>
            <div className="col-md-3 text-center">
              <Image
                src="/img/6.png"
                className={styles.img_responsive}
                width={200}
                height={200}
                alt="描述圖片內容"
              />
            </div>

            <div className="col-md-9 mt-sm-20">
              <div className={styles.single_service}>
                <p className="text-center">
                  醫療費用可以分成幾個細項，包含門診、住院、手術費用，目前市面上的寵物險在醫療項目都是採取「實支實付」的理賠方式，花多少賠多少。
                  要如何評估一張寵物險的保障額度是否足夠？目建議先從「手術費用」的額度開始看起，雖然門診費用聽起來比較容易理賠得到，1,000
                  ~
                  2,000元的門診費用的確是不無小補，但跟動輒上萬元的手術費用相比，還是先把大金額的理賠項目準備好，進醫院才不用擔心各項必要治療的支出。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`text-end ${styles.section_top_border} ${styles.first_section}`}
        >
          <h3 className={`text-center text-md-end ${styles.title_1}`}>
            2.侵權責任
          </h3>
          <div className={styles.row}>
            <div className="col-12 col-md-3 order-1 order-md-2 text-center">
              <Image
                src="/img/2.png"
                className={styles.img_responsive}
                width={200}
                height={200}
                alt="描述圖片內容"
              />
            </div>
            <div className="col-12 col-md-9 mt-sm-20 order-2 order-md-1 ">
              <div className={styles.single_service}>
                <p className="text-center">
                  帶寵物出門要繫繩是很重要的觀念，但毛小孩會遇到一些突發狀況無法預料，狗狗會因為鞭炮聲或路上行車突然按喇叭嚇到暴衝，機車經過為了要閃避導致自摔或是發生連環車禍，或是在公園遇到其他好奇心旺盛小孩或毛小孩，一開始都相安無事，玩一玩突然生氣咬傷對方，這些造成別人受傷或財物損失的狀況都可以交給侵權責任的理賠項目幫忙賠償。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.section_top_border} ${styles.first_section}`}>
          <h3 className={`text-md-start text-center ${styles.title_1}`}>
            3.協尋廣告
          </h3>
          <div className={styles.row}>
            <div className="col-md-3 text-center">
              <Image
                src="/img/5.png"
                className={styles.img_responsive}
                width={200}
                height={200}
                alt="描述圖片內容"
              />
            </div>
            <div className="col-md-9 mt-sm-10">
              <div className={styles.single_service}>
                <p>
                  到公園玩一玩結果忘記回家？出門倒個垃圾就跟丟了？你一定也曾經在社群網站上看過協尋寵物的貼文，心急的主人無論是要透過張貼紙本的尋狗啟事，或是用比較先進的網路投放廣告協尋，這些協尋寵物所需要的花費都可以向保險公司申請理賠。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={`justify-content-center ${styles.row}`}>
          <div className={styles.third_top_border}>
            <h3 className={`text-center ${styles.mb_30}  ${styles.title_1}`}>
              投保之前三大須知
            </h3>
            <div className={`justify-content-center ${styles.row}`}>
              <div className="col-lg-4 col-md-6">
                <h4 className={`${styles.mb_20} ${styles.title_2}`}>
                  1.目前只有狗跟貓可以投保
                </h4>
                <div className={styles.single_service}>
                  <p>
                    為什麼只限定這兩類的毛小孩？天竺鼠、小白兔不也是毛毛的嗎？雖然
                    2012 年保險公司就開始販售寵物險，但寵物險大約是在 2018
                    年才開始盛行，保險公司收取保費與付出的理賠經驗也還在摸索階段，而不同動物的疾病發生機率及治療費用大不相同，所以目前寵物險的設計都只針對狗狗跟貓咪這兩種寵物，飼養其他種類的話就暫時沒辦法投保寵物險。
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <h4 className={`${styles.mb_15} ${styles.title_2}`}>
                  2.是自動續保，不是保證續保，且只能投保一家，不能重複投保
                </h4>
                <div className={styles.single_service}>
                  <p>
                    目前市面上所有的寵物險都是產險公司負責販售的，要注意隔年「不一定可以續保」的狀況，保險公司會根據前一年寵物的健康況或是理賠頻率決定隔年願不願意讓保障延續，但這就是產險公司商品的特性，產險公司出的商品只有「自動續保」的特性，意思是隔年要續保的時候可以不用重新簽約投保，壽險公司出的部分商品才有「保證續保」的機制。
                    再來就是寵物醫療相關的保險目前是用實支實付的方式理賠，且需要使用收據正本理賠。每隻寵物只能投保一張寵物險，不像人類一樣可以重複投保很多間公司的商品，如果有重複投保的狀況在核保的時候就會被拒絕了，切記要多看、多比較，選擇一張保障全面、保費可接受的寵物保險。
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 ">
                <h4 className={`${styles.mb_20} ${styles.title_2}`}>
                  3.只理賠必要性醫療，不理賠預防性檢查
                </h4>
                <div className={styles.single_service}>
                  <p>
                    投保前記得要分清楚，不要覺得去寵物醫院的所有行為都會理賠。寵物美容、牙齒清潔對應到的就像是一般人去醫美診所，這種肯定不屬於保險的理賠範圍；定期到獸醫院檢查雖然也是一筆開銷，但這樣的行為屬於預防性檢查，也沒辦法向保險公司申請費用，但如果檢查後發現身體有狀況需要開刀住院及回診，這些必要性的醫療行為就屬於寵物險的理賠範圍。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={`justify-content-center ${styles.row}`}>
          <div className="col-lg-4 col-md-6">
            <div className={styles.single_service}>
              <div
                className={`${styles.service_thumb} ${styles.service_icon} d-flex align-items-center justify-content-center`}
              >
                <div className={styles.service_icon}>
                  <Image
                    src="/img/3.png"
                    className={styles.img_responsive}
                    width={200}
                    height={200}
                    alt="描述圖片內容"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className={styles.title_3}>什麼是「自費額」？</h3>
                <p>
                  自負額就是「飼主要自行負擔」，保險公司不理賠的金額。自負額愈低，就代表大多數的支出都是由保險公司承擔，飼主只要出一點點錢；自負額愈高，就代表主要的費用是飼主負責，保險公司只幫忙出一小部分。
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className={styles.single_service}>
              <div
                className={`${styles.service_thumb} d-flex align-items-center justify-content-center`}
              >
                <div className={styles.service_icon}>
                  <Image
                    src="/img/1.png"
                    className={styles.img_responsive}
                    width={200}
                    height={200}
                    alt="描述圖片內容"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className={styles.title_3}>自負額愈低愈好嗎？</h3>
                <p>
                  不一定，自負額的設計其實反應在保費上，自負額愈低的商品代表保險公司要賠愈多錢，所以在設計保險商品的時候保費相對的也會提高一些。多數保險公司在商品介紹網頁也會主打「無自負額，醫療收據全額理賠」的特性，但其實就是發生事情前多收一點保費，把風險交給大家一起分擔啦。
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className={styles.single_service}>
              <div
                className={`${styles.service_thumb} d-flex align-items-center justify-content-center`}
              >
                <div className={styles.service_icon}>
                  <Image
                    src="/img/4.png"
                    className={styles.img_responsive}
                    width={200}
                    height={200}
                    alt="描述圖片內容"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className={styles.title_3}>每次看醫生都能申請保險嗎？</h3>
                <p>
                  大多數的寵物險都有設定門診、住院以及手術的理賠次數上限，有的商品甚至一年只會理賠一次，這跟一般我們買人類的醫療險差別滿大的。所以提醒飼主，如果找到兩張保障內容差不多的寵物險，記得看一下有沒有針對醫療行為有理賠次數上限的限制，理賠次數上限愈高的發生事情的時候比較不用擔心寵物進醫院的治療次數。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
