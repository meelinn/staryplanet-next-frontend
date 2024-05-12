import React, { useState, useEffect } from 'react'
import FrontpageStyles from '@/styles/product/frontpage.module.css'
import Frontcard from '@/components/product/front-card'
import Frontcard2 from '@/components/product/front-card2'
import Frontcard3 from '@/components/product/front-card3'
import Frontcard4 from '@/components/product/front-card4'
import { useLocation } from 'react'

export default function Index() {
  const [items, setItems] = useState([
    // 假設你在這裡初始化 items 狀態
    {
      imageUrl: 'https://i.ibb.co/Fb5QqgM/b1-Crop-Image-Crop-Image.png',
      name: 'Finland',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
      title: '認養概念',
      text: '認養，不僅是給流浪動物一個家，更是給予生命溫暖與陪伴。',
    },
    {
      imageUrl: 'https://i.ibb.co/7Q6kNSm/b4-Crop-Image-Crop-Image.png',
      name: 'Iceland',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
      title: '帶我回家',
      text: '生命中的殘酷無所不在，並非每個毛孩都能擁有健康溫暖的一生。然而，我們想告訴你的是，即使面對眼前的黑暗，牠們仍抱著一絲希望，期待專屬於牠們的光芒來臨。',
    },
    {
      imageUrl: 'https://i.ibb.co/Cz9Bvt2/b2-Crop-Image.png',
      name: 'Australia',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
      title: '毛毛商城',
      text: '我們毛毛商城，這裡不僅是購物的天堂，更是愛與陪伴的擁抱。讓我們攜手，為你的寶貝添上一抹生活暖意。',
    },
    {
      imageUrl: 'https://i.ibb.co/4JJFhcW/b16-Crop-Image.png',
      name: 'Netherland',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
      title: '保險照護',
      text: '給你的毛孩最好的呵護，從了解寵物相關保險開始。',
    },
    {
      imageUrl: 'https://i.ibb.co/PY7Pbr6/b17-Crop-Image-Crop-Image.png',
      name: 'Netherland',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
      title: '關於我們',
      text: '這裡有我關於我們的小故事，成立帶給他人溫暖的動機與理念的網站。',
    },
  ])
  //https://i.ibb.co/Zd3Pss7/b19-Crop-Image.png

  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    let intervalId
    if (autoPlay) {
      intervalId = setInterval(() => {
        handleNextClick()
      }, 3000) // 每5秒自動切換一次
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [currentIndex, autoPlay])
  // 處理點擊 next 按鈕事件
  const handleNextClick = () => {
    setItems((prevItems) => {
      const nextItems = [...prevItems]
      const firstItem = nextItems.shift()
      nextItems.push(firstItem)
      return nextItems
    })
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    setAutoPlay(false) // 點擊後停止自動輪播
    setTimeout(() => {
      setAutoPlay(true) // 5秒後恢復自動輪播
    }, 3000)
  }

  const handlePrevClick = () => {
    setItems((prevItems) => {
      const prevItemsCopy = [...prevItems]
      const lastItem = prevItemsCopy.pop()
      prevItemsCopy.unshift(lastItem)
      return prevItemsCopy
    })
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    )
    setAutoPlay(false) // 點擊後停止自動輪播
    setTimeout(() => {
      setAutoPlay(true) // 5秒後恢復自動輪播
    }, 3000)
  }

  // 視窗
  const [marginBottom, setMarginBottom] = useState('0px')

  useEffect(() => {
    const handleResize = () => {
      setMarginBottom(window.innerWidth < 956 ? '280px' : '0px')
    }

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)

    // 初始化
    handleResize()

    // 清除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* 第一個頁面 */}
      <div className={FrontpageStyles['bigcontainer']}>
        <div className={FrontpageStyles['container']}>
          <div className={FrontpageStyles['slide']}>
            {items.map((item, index) => (
              <div
                key={index}
                className={`${FrontpageStyles['item']} ${
                  index === currentIndex ? FrontpageStyles['active'] : ''
                }`}
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              >
                <div className={FrontpageStyles['content']}>
                  <div className={FrontpageStyles['name']}>{item.title}</div>
                  <div className={FrontpageStyles['des']}>{item.text}</div>
                  <div className={FrontpageStyles['process-c']}>
                    <div className={FrontpageStyles['process-b']}>
                      <button
                        href=""
                        className={FrontpageStyles['process-button']}
                      >
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={FrontpageStyles['button']}>
            <button className="prev" onClick={handlePrevClick}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="next" onClick={handleNextClick}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 第二個頁面 */}

      <div className={FrontpageStyles['center-background']} id="my-element">
        <div className="container-grid">
          <div className="row">
            <div className="col-md-12">
              <div className={FrontpageStyles['center-container']}>
                <h2 className={FrontpageStyles['center-h2']}>
                  邁向高標準的毛毛星球
                </h2>
                <p className={FrontpageStyles['center-p']}>
                  我們追求的是，有天，在台灣的每隻浪浪，都能夠擁有一個愛他們的家。
                  在2024年，「毛毛星球—浪浪之家」成立於高雄，為遭受遺棄、不被重視甚至身懷殘疾的動物，打造了一個協助媒合的網站。我們的使命是為提升浪浪們的曝光度與逆轉命運的機會。希望您能夠和我們一起努力，讓被遺忘的浪浪們知道：「沒關係，有我在。」
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-grid">
        <div className="row">
          <div
            className={`${FrontpageStyles['card-container']} ${FrontpageStyles['card-row']}`}
            style={{ marginBottom: marginBottom }}
          >
            <Frontcard />
            <Frontcard2 />
            <Frontcard3 />
            <Frontcard4 />
          </div>
        </div>
      </div>

      {/* 第三個頁面 */}

      <div className="container-grid">
        <div className="row">
          <div className="col-md-12">
            <div className={FrontpageStyles['img-container']}>
              <img
                className={FrontpageStyles['img']}
                src="img/background/b4.jpg"
                alt=""
              />
              <div className={FrontpageStyles['text-container']}>
                <img
                  className={FrontpageStyles['img-2']}
                  src="img/background/b12.png"
                  alt=""
                />
                <div className={FrontpageStyles['text-c2']}>
                  <h2 className={FrontpageStyles['text-h2']}>
                    我們毛孩需要您的溫暖
                  </h2>
                  <p className={FrontpageStyles['text-p1']}>
                    生命中的殘酷無所不在，並非每個毛孩都能擁有健康溫暖的一生。
                    然而，我們想告訴你的是，即使面對眼前的黑暗，牠們仍抱著一絲希望，期待專屬於牠們的光芒來臨。
                  </p>
                  <p className={FrontpageStyles['text-p']}>
                    你，將會成為驅散我孤獨不安的那道光嗎?
                  </p>
                </div>
                <div className={FrontpageStyles['button1']}>
                  <div className={FrontpageStyles['process-b']}>
                    <button
                      href="/pet-info"
                      className={FrontpageStyles['process-button']}
                    >
                      認養資訊
                    </button>
                    <button
                      href="/pet-info"
                      className={FrontpageStyles['process-button']}
                    >
                      帶我回家
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
