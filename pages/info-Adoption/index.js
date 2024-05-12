import React, { useState } from 'react'
import BannerStyles from '@/pages/info-Adoption/css/banner.module.css'
import CarouselStyles from '@/pages/info-Adoption/css/carousel.module.css'
import ContentStyles from '@/pages/info-Adoption/css/content.module.css'
import adoptionStyles from '@/pages/Adoption/css/Adoption.module.css'
import cardStyles from '@/pages/Adoption/css/card.module.css'
import ModalStyles from '@/pages/info-Adoption/css/modal.module.css'
import { FaShareAlt } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import { FaArrowTurnDown } from 'react-icons/fa6'
import { PiPawPrintBold } from 'react-icons/pi'
import { PiPawPrintFill } from 'react-icons/pi'
import { PiPawPrint } from 'react-icons/pi'

const cardBackgroundClass = `${cardStyles['A-card__background']} ${cardStyles['card-img']}`
const cardContentContainerClass = `${cardStyles['A-card__content--container']} ${cardStyles['flow']}`
const cardContentClass = `${cardStyles['A-card__content']} ${cardStyles['flow']}`
const cardTitleClass = `${cardStyles['A-card__title']} ${cardStyles['H2']}`
const cardDescriptionClass = `${cardStyles['A-card__description']} ${cardStyles['card-P']}`

function information() {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <div>
      {/* banner */}
      <div className={BannerStyles['A-banner-frame']}>
        <div className={BannerStyles['A-banner']}>
          <div>
            <p
              className={BannerStyles['A-banner-text']}
              style={{ cursor: 'default' }}
            >
              帶小毛回家
            </p>
            <p className={BannerStyles['A-banner-p']}>
              妹妹 • 1歲 • 賓士 • 13kg
            </p>
          </div>
          <div className={BannerStyles['process-b']}>
            <button href="/pet-info" className={BannerStyles['process-button']}>
              領養流程
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row ">
          {/* 輪播圖 */}
          <div className="col-12 col-md-6 mr-md-4">
            <div
              id="carouselExampleFade"
              className={`carousel slide carousel-fade ${CarouselStyles['mycarousel']}`}
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className={`d-block w-100 ${CarouselStyles['mycarouselimg']}`}
                    src="img/13.jpg"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="img/15.jpg"
                    className={`d-block w-100 ${CarouselStyles['mycarouselimg']}`}
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="img/122.webp"
                    className={`d-block w-100 ${CarouselStyles['mycarouselimg']}`}
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* 毛孩資訊 */}
          <div className="col-12 col-md-6 mr-md-4">
            <div className={ContentStyles['storyfont']}>
              <div className={ContentStyles['storyPawteam']}>
                <PiPawPrintBold size={50} color="rgba(193, 214, 161, 1)" />

                <h2 className={ContentStyles['storyH2']}>我的故事</h2>
              </div>

              <div className={ContentStyles['storyP']}>
                <p>
                  小毛在2023年11月進入毛毛星球。我們在台南動物之家初次遇見小毛，嬌小的身體與陽光的笑容，是那麼的可愛！經過評估後也發現小毛個性很溫柔，只是對於陌生人需要時間建立信任。由於他腫大的乳腺，讓我們猜測小毛可能已經生育多次，可能因此小毛有著媽媽的警覺性，對於周遭環境都會十分在意。小毛非常適合新手家庭，因為他十分溫柔且穩定，且小毛會投以愛慕的眼神但又不過分熱情，安安靜靜不吵不鬧，是一隻內斂的天使貓咪。
                </p>
              </div>

              <div>
                <div className={ContentStyles['storymore']}>
                  <p>
                    分享小工具:
                    <FaShareAlt
                      size={25}
                      style={{ marginLeft: '6px', marginBottom: '5px' }}
                    />
                  </p>

                  <div className={ContentStyles['storyshare']}>
                    <p>
                      更多我的資訊
                      <FaArrowTurnDown style={{ marginLeft: '5px' }} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className={ContentStyles['myinfocontainer']}>
            <div className="col-12 col-md-3 mr-md-4 mt-4">
              <div className={ContentStyles['featureH2-container']}>
                <h2 className={ContentStyles['featureH2']}>性格特色</h2>
              </div>
              <div className={ContentStyles['feature1']}>
                <p>角色</p>
              </div>
              <div className={ContentStyles['feature2']}>
                <p>活動力</p>
              </div>
              <div className={ContentStyles['feature3']}>
                <p>適應力</p>
              </div>
              <div className={ContentStyles['feature4']}>
                <p>外向程度</p>
              </div>
            </div>
            <div className="col-12 col-md-3 mr-md-4 mt-4">
              <div className={ContentStyles['medical-container']}>
                <h2 className={ContentStyles['medicalH2']}>醫療史</h2>
              </div>
              <div className={ContentStyles['medical']}>
                <p>健康狀態:</p>
              </div>
            </div>
            <div className="col-12 col-md-3 mr-md-4 mt-4">
              <div className={ContentStyles['behavior-container']}>
                <h2 className={ContentStyles['behaviorH2']}>行為觀察</h2>
              </div>
              <div className={ContentStyles['Behavior1']}>
                <p>叫聲</p>
              </div>
              <div className={ContentStyles['Behavior2']}>
                <p>分離焦慮</p>
              </div>
              <div className={ContentStyles['Behavior3']}>
                <p>攻擊性</p>
              </div>
              <div className={ContentStyles['Behavior4']}>
                <p>護食</p>
              </div>
            </div>
          </div>

          <div
            className={`${ContentStyles['process-b']} d-flex justify-content-center align-items-center`}
          >
            <Button
              className={ContentStyles['process-button']}
              variant="primary"
              onClick={handleShowModal}
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              帶我回家
            </Button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Modal彈窗 */}
          <div
            className="modal fade"
            id="myModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              className={`modal-dialog modal-lg  ${ModalStyles['custom-modal']}`}
            >
              <div className="modal-content ">
                <div className={`modal-header ${ModalStyles['modalHeader']}`}>
                  <h2 className="modal-title" id="exampleModalLabel">
                    領養小毛
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className={`${ModalStyles['modal-container']}`}>
                  <div
                    className={`modal-body col col-md-6 mr-md-4 ${ModalStyles['mymodalBody']}`}
                  >
                    <div className={`${ModalStyles['image-container']}`}>
                      <img
                        src="img/15.jpg"
                        alt="this is cat"
                        className={`${ModalStyles['modal-image']}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`modal-body col col-md-6 mr-md-4 ${ModalStyles['mymodalBodyinfo']}`}
                  >
                    <div className={ModalStyles['mymodalBodyP']}>
                      <p>我在</p>
                      <img
                        src="img/map.png"
                        alt="this is map"
                        className={ModalStyles['mymodalBodyimg']}
                      />
                      <p>收容編號</p>
                      <p>聯絡方式</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`modal-footer ${ModalStyles['mymodalFooter']}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className={ContentStyles['similarH2-container']}>
            <h1 className={ContentStyles['similarH2']}>其他相似的毛孩</h1>
          </div>
          <div className={ContentStyles['mysimilarpet']}>
            <div className={ContentStyles['similar-container']}></div>
            <div className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}>
              <img className={cardBackgroundClass} src="img/13.jpg" alt="" />
              <div className={cardContentClass}>
                <div className={cardContentContainerClass}>
                  <h2 className={cardTitleClass}>小毛</h2>
                  <p className={cardDescriptionClass}>
                    妹妹 • 1歲 • 賓士 • 13kg
                  </p>
                </div>
                <div className={cardStyles['buttonteam']}>
                  <button className={cardStyles['A-card-button']}>
                    Read more
                  </button>
                  <div className={cardStyles['pawicon']}>
                    <PiPawPrint />
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}>
              <img className={cardBackgroundClass} src="img/13.jpg" alt="" />
              <div className={cardContentClass}>
                <div className={cardContentContainerClass}>
                  <h2 className={cardTitleClass}>小毛</h2>
                  <p className={cardDescriptionClass}>
                    妹妹 • 1歲 • 賓士 • 13kg
                  </p>
                </div>
                <div className={cardStyles['buttonteam']}>
                  <button className={cardStyles['A-card-button']}>
                    Read more
                  </button>
                  <div className={cardStyles['pawicon']}>
                    <PiPawPrint />
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}>
              <img className={cardBackgroundClass} src="img/13.jpg" alt="" />
              <div className={cardContentClass}>
                <div className={cardContentContainerClass}>
                  <h2 className={cardTitleClass}>小毛</h2>
                  <p className={cardDescriptionClass}>
                    妹妹 • 1歲 • 賓士 • 13kg
                  </p>
                </div>
                <div className={cardStyles['buttonteam']}>
                  <button className={cardStyles['A-card-button']}>
                    Read more
                  </button>
                  <div className={cardStyles['pawicon']}>
                    <PiPawPrint />
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-6 col-md-3 p-0 ${cardStyles['A-card']}`}>
              <img className={cardBackgroundClass} src="img/13.jpg" alt="" />
              <div className={cardContentClass}>
                <div className={cardContentContainerClass}>
                  <h2 className={cardTitleClass}>小毛</h2>
                  <p className={cardDescriptionClass}>
                    妹妹 • 1歲 • 賓士 • 13kg
                  </p>
                </div>
                <div className={cardStyles['buttonteam']}>
                  <button className={cardStyles['A-card-button']}>
                    Read more
                  </button>
                  <div className={cardStyles['pawicon']}>
                    <PiPawPrint />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default information
