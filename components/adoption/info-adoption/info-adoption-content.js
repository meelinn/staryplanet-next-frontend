import React, { useState } from 'react'
import ContentStyles from '@/styles/adoption/info-adoption/content.module.css'
import { Button } from 'react-bootstrap'
import { FaCheckCircle } from 'react-icons/fa'

import InfoAdoptionStar from './info-adoption-star'

export default function InfoAdoptionContent({ data }) {
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  return (
    <>
      {data && data.pet_health && (
        <>
          <div className={ContentStyles['myinfocontainer']}>
            <div className="col-12 col-md-3 mr-md-4 mt-4">
              <div className={ContentStyles['featureH2-container']}>
                <h2 className={ContentStyles['featureH2']}>性格特色</h2>
              </div>
              {/* <div className={ContentStyles['feature1']}>
                <span>
                  跟隨者 <InfoAdoptionStar /> 領導者
                </span>
              </div> */}
              <div className={ContentStyles['feature1']}>
                <p>
                  活動力 <InfoAdoptionStar i={data.pet_locomotion} />
                </p>
              </div>
              <div className={ContentStyles['feature3']}>
                <p>
                  適應力 <InfoAdoptionStar i={data.pet_adaptability} />
                </p>
              </div>
              <div className={ContentStyles['feature4']}>
                <p>
                  外向程度 <InfoAdoptionStar i={data.pet_extroversion} />
                </p>
              </div>
            </div>
            <div className="col-12 col-md-3 mr-md-4 mt-4">
              <div className={ContentStyles['medical-container']}>
                <h2 className={ContentStyles['medicalH2']}>醫療史</h2>
              </div>
              <div className={ContentStyles['medical']}>
                {data.pet_health.split(',').map((v, i) => (
                  <p key={i} className="align-center m-2">
                    <span className="text-primary fs-6 ">
                      <FaCheckCircle />{' '}
                    </span>
                    {v}
                  </p>
                ))}
                <p className="mt-3 mx-2">
                  <span className="text-primary fs-6 ">
                    <FaCheckCircle />{' '}
                  </span>{' '}
                  {data.pet_medical_record}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-3 mr-md-4 mt-4">
              <div className={ContentStyles['behavior-container']}>
                <h2 className={ContentStyles['behaviorH2']}>行為觀察</h2>
              </div>
              <div className={ContentStyles['Behavior1']}>
                <p>
                  叫聲 <InfoAdoptionStar i={data.pet_bark} />
                </p>
              </div>
              <div className={ContentStyles['Behavior2']}>
                <p>
                  分離焦慮 <InfoAdoptionStar i={data.pet_anxiety} />
                </p>
              </div>
              <div className={ContentStyles['Behavior3']}>
                <p>
                  攻擊性 <InfoAdoptionStar i={data.pet_aggression} />
                </p>
              </div>
              <div className={ContentStyles['Behavior4']}>
                <p>
                  護食 <InfoAdoptionStar i={data.pet_guarding} />
                </p>
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
        </>
      )}
    </>
  )
}
