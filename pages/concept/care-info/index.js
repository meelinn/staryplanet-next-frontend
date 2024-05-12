import React, { useState } from 'react'
import LinkBtn from '@/components/concept/link-btn'
import CareInfoS1Card from '@/components/concept/care-info/care-info-s1-card'
import CareInfoS4Card from '@/components/concept/care-info/care-info-s4-card'
import CareInfoS5Faq from '@/components/concept/care-info/care-info-s5-faq'
import CareInfoS4Info from '@/components/concept/care-info/care-info-s4-info'
import styles from '@/styles/concept/care-info/care-info.module.css'

import {
  FaTarp,
  FaSyringe,
  FaSuitcaseMedical,
  FaBugSlash,
} from 'react-icons/fa6'
import { FaCut } from 'react-icons/fa'
import CareInfoS1Btn from '@/components/concept/care-info/care-info-s1-btn'
import CareInfoS3Card from '@/components/concept/care-info/care-info-s3-card'

export default function CareInfoindex() {
  const s1CardsData = [
    {
      src: '/img/care-info/f62570f2.webp',
      alt: '植入晶片',
      text: '寵物植入晶片是寵物登記的過程之一，由獸醫使用寵物晶片特製注射器植入寵物身體中。台灣法律規定寵物要進行寵物登記，寵物晶片對寵物本身沒有傷害，植入過後寵物若不幸走失，可以快速找回，以免毛孩成為走失浪浪。',
    },
    {
      src: '/img/care-info/priscilla-du-preez-2hc6ocDAsNY-unsplash.jpg',
      alt: '結紮',
      text: '結紮可以預防噴尿行為、穩定寵物情緒、預防疾病……等，對寵物健康來說是百利而無一害，而最好的結紮時間點是在幼年，約六個月左右就能讓獸醫評估結紮了。台灣於104年起，根據「動物保護法第27條」的規定，未為寵物絕育且未申報及提出繁殖管理說明，或未申報繁殖需求而繁殖寵物，得處新臺幣五萬元以上二十五萬元以下罰鍰。所以除非有特別額外進行申請，飼養犬貓是必需要進行絕育手術的喔！',
    },
    {
      src: '/img/care-info/afif-ramdhasuma-lPjeFCIFJwk-unsplash.jpg',
      alt: '施打疫苗',
      text: '寵物也需要施打疫苗來預防高傳染性及高死亡率的疾病，施打疫苗後所形成的抵抗力，能夠降低寵物未來感染到疾病的機會，若不幸感染也能明顯減輕症狀的嚴重程度。疫苗可區分成「基礎疫苗」以及「後續補強」。在沒有施打過疫苗之前，大部分會需要連續施打幾次，才能產生良好的抗體。',
    },
    {
      src: '/img/care-info/ayla-verschueren-nWKMtmbpxQs-unsplash.jpg',
      alt: '驅蟲',
      text: '毛孩不出門，人還是會出門，衣服、褲子或鞋子都可能攜帶寄生蟲、蟲卵回家，毛孩透過接觸或吃進寄生蟲而感染，偷偷潛入的蚊子叮咬也可能造成心絲蟲感染。不小心感染寄生蟲，除了嘔吐、拉肚子外，嚴重可能造成死亡。千萬不要小看寄生蟲的偷襲能力，不論四季都要定期幫貓狗驅蟲喔！',
    },
    {
      src: '/img/care-info/karsten-winegeart-loJL4ijUobg-unsplash.jpg',
      alt: '健康檢查',
      text: '貓狗的平均壽命進程約相比人類快很多，所以退化程度當然更快。透過定期的而健康檢查不僅可以及早發現及治療疾病，也可以防患於未然，做好預防醫學，預防疾病的發生。其次，還有一個很容易被忽略的原因是：狗狗、貓咪無法透過說話來明確表達牠們的感受，飼主也非專業人士，所以很容易一不小心就忽略了牠們發出的求救訊號。因此，唯有定期帶毛孩做健檢，才是有效確保牠們身體及健康狀況最好的方式。',
    },
  ]

  const s1BtnData = [
    {
      icon: <FaTarp />,
      text: '植入晶片',
    },
    {
      icon: <FaCut />,
      text: '結紮',
    },
    {
      icon: <FaSyringe />,
      text: '施打疫苗',
    },
    {
      icon: <FaBugSlash />,
      text: '驅蟲',
    },
    {
      icon: <FaSuitcaseMedical />,
      text: '健康檢查',
    },
  ]

  const s5FaqData = [
    {
      title: '人不在家可不可以把飼料一次裝滿？',
      answer:
        '許多飼主擔心毛孩們會吃不飽，人不在家時就把飼料裝滿，任由毛孩吃到飽！但毛孩過量飲食會造成肥胖問題，提升罹患糖尿病和心血管疾病的機率。體重過重也會影響關節承重壓力，增加關節疾病的風險。',
    },
    {
      title: '跟著人類進食，比飼料還好吃？',
      answer:
        '每當我們在吃東西時，毛孩在旁邊用渴望的眼神看著你，主人就會心軟分食一些給牠們。若跟著人類進食，食物太油太鹹，毛孩容易引發腎臟病及其他併發症。',
    },
    {
      title: '喝牛奶就可以長得頭好壯壯？',
      answer:
        '除了部分的人有乳糖不耐症之外，大多數的毛孩也有乳糖不耐症，而且腸胃道中的乳糖酵素相較於人類少很多，無法完全消化牛奶中的乳糖。如果常給他們喝牛奶，容易造成嘔吐或腹瀉，輕則會因為太常腹瀉而導致食慾不振，重則有可能引發腎臟疾病或急性腎衰竭。',
    },
    {
      title: '把潔牙骨當零食，還有刷牙效果？',
      answer:
        '毛孩的牙齒保健是飼主最常忽視和偷懶的部分，飼主常用潔牙骨當零食，順便作為牙齒清潔，但潔牙骨的清潔效果有限，還是必須每天幫毛孩刷牙，不然長期有食物殘渣附著在牙齒上，容易產生牙菌斑，久了就會發生口腔疾病。',
    },
    {
      title: '鮮食罐頭沒吃完，先冰起來之後再加熱食用？',
      answer:
        '鮮食罐頭類食物，開封後就應盡快讓毛孩食用完畢，以免變質。雖然放進冰箱能夠延長保存期限，但重複加熱後，不僅會導致營養流失，還可能產生毒性反應，反而有害健康。',
    },
    {
      title: '毛孩一家親，互吃對方飼料沒問題？',
      answer:
        '家中同時養貓又養狗的飼主，常把貓狗的飼料交換吃，覺得飼料看起來都一樣應該沒關係。但貓狗的飼料在營養成分上大不相同，若狗狗吃貓糧，容易肥胖對腎臟負荷也會比較大；如果貓咪吃狗食，則會因為攝取熱量不足而營養不良，同時也會傷害內臟、皮膚和毛髮的健康。',
    },
    {
      title: '清潔次數太頻繁，常洗澡才會乾淨？',
      answer:
        '有些飼主喜歡頻繁地幫毛孩清潔，認為常洗澡才會乾淨。毛孩的皮膚與人類構造完全不同，太常清潔反而會把牠們保護身體的油脂都沖洗掉。甚至有些飼主會使用人類的洗髮精或沐浴乳幫毛孩清洗，這會造成毛孩皮膚乾燥、老化和脫皮現象，嚴重還會引起皮膚病。',
    },
  ]

  // S1卡片處裡事件
  const [currentCard1Index, setCurrentCard1Index] = useState(0)

  const handleCard1Change = (index) => {
    setCurrentCard1Index(index)
  }
  return (
    <>
      <div className={`${styles['mt-120']}`}>
        <LinkBtn />
        {/* care-info-section1-照顧須知 */}
        <section className="care-info-section1">
          <div className="container">
            <div className="row vh-100 align-content-center">
              <h2 className="text-primary text-center fw-bolder">照顧須知</h2>
              <p className=" text-center ">
                寵物照顧須知包括提供良好的食物和水、定期醫療檢查和疫苗接種、清潔舒適的生活環境、適量的運動和心理刺激、關注寵物健康和行為、及時求助獸醫，並進行行為訓練。
              </p>

              <div
                className={`row justify-content-center ${styles['card-height']}`}
              >
                <div className="col-12 col-lg-7 mx-5 overflow-hidden d-flex flex-column justify-content-center">
                  {/* {s1CardsData.map((v, i) => (
                <CareInfoS1Card key={i} src={v.src} alt={v.alt} text={v.text} />
              ))} */}
                  {/* <CareInfoS1Card props={s1CardsData[currentCard1Index]} /> */}

                  <CareInfoS1Card {...s1CardsData[currentCard1Index]} />
                </div>
                <div className="row col-3 col-lg-4 align-items-center  align-content-between">
                  {/* align-content-around" */}
                  {s1BtnData.map((v, i) => (
                    <CareInfoS1Btn
                      key={i}
                      icon={v.icon}
                      text={v.text}
                      onClick={() => handleCard1Change(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  care-info-section2-花費一覽 */}
        {/* <section className="care-info-section2">
        <div className="container">
          <h2 className="text-primary text-center fw-bolder">花費一覽</h2>
          <div className="row vh-100 justify-content-center">
            {/* card 
            <div className="col-6">
              <div className="card bg-dark text-white">
                <img
                  src="/img/concept/krista-mangulsone-9gz3wfHr65U-unsplash.jpg"
                  className="card-img"
                  alt="日常開銷"
                />
                <div className="card-img-overlay">
                  <div className="text-end">
                    <h4 className="card-title ">日常開銷</h4>
                    <ul className="card-text ">
                      <li className="list-group-item">基本伙食</li>
                      <li className="list-group-item">清潔美容</li>
                      <li className="list-group-item">梳理毛髮</li>
                      <li className="list-group-item">排泄清潔</li>
                      <li className="list-group-item">玩具其它</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card bg-dark text-white">
                <img
                  src="/img/concept/krista-mangulsone-9gz3wfHr65U-unsplash.jpg"
                  className="card-img"
                  alt="日常開銷"
                />
                <div className="card-img-overlay">
                  <div className="text-end">
                    <h4 className="card-title ">日常開銷</h4>
                    <ul className="card-text ">
                      <li className="list-group-item">基本伙食</li>
                      <li className="list-group-item">清潔美容</li>
                      <li className="list-group-item">梳理毛髮</li>
                      <li className="list-group-item">排泄清潔</li>
                      <li className="list-group-item">玩具其它</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        {/*  care-info-section3-必備物品 */}
        <div
          className={`container-fluid bg-primary vh-100 d-flex justify-content-center align-items-center ${styles['melin-s3-bg-button']} ${styles['melin-s3-bg-top']}`}
        >
          <div className="container mt-5">
            <div className="row justify-content-end mt-5">
              <h2 className="col-3 text-secondary fw-bolder test-start mx-5">
                必備物品
              </h2>
              <div className="col-8">
                <CareInfoS3Card />
              </div>
            </div>
          </div>
        </div>

        {/*  care-info-section4-空間布置
      <div className="container my-5 ">
        <div className="row justify-content-center">
          <h2 className="text-center text-primary fw-bolder mb-5 ">空間布置</h2>
          <div className="card-container d-flex justify-content-center flex-column flex-lg-row gap-4">
            {s4CardData.map((v, i) => (
              <CareInfoS4Card
                key={i}
                title={v.title}
                text={v.text}
                src={v.src}
                alt={v.alt}
              />
            ))}
          </div>
        </div>
      </div> */}

        {/*  care-info-section4-空間布置-2 */}
        <div className="container my-5 ">
          <div className="row justify-content-center">
            <h2 className="text-center text-primary fw-bolder mb-5 ">
              空間布置
            </h2>
            <CareInfoS4Info />
          </div>
        </div>

        {/*  care-info-section5-常見問題 */}
        <div className="container mb-5">
          <div className="row">
            <h2 className="text-center text-primary fw-bolder mb-5 ">
              常見問題
            </h2>
            <div className="accordion" id="accordionExample">
              {s5FaqData.map((v, i) => (
                <CareInfoS5Faq
                  key={i}
                  headingId={`heading${i++}`}
                  collapseId={`collapse${i++}`}
                  title={v.title}
                  answer={v.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
