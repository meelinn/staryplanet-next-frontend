import React from 'react'
import ModalStyles from '@/styles/adoption/info-adoption/modal.module.css'

export default function InfoAdoptionModal({ data }) {
  return (
    <>
      <div className={`modal-dialog modal-lg  ${ModalStyles['custom-modal']}`}>
        <div className="modal-content ">
          <div className={`modal-header ${ModalStyles['modalHeader']}`}>
            <h2 className="modal-title" id="exampleModalLabel">
              {`領養${data.pet_name}`}
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className={`${ModalStyles['modal-container']}`}>
            {/* <div
              className={`modal-body col col-md-6 mr-md-4 ${ModalStyles['mymodalBody']}`}
            >
              <div className={`${ModalStyles['image-container']}`}>
                <img
                  src={`img/pet_photo/${data.pet_photo}`}
                  alt={data.pet_name}
                  className={`${ModalStyles['modal-image']}`}
                />
              </div>
            </div> */}
            <div
              className={`modal-body col col-md-6 mr-md-4 me-5 ${ModalStyles['mymodalBodyinfo']}`}
            >
              <div className={`${ModalStyles['mymodalBodyP']}`}>
                <p className="mb-0">我在</p>
                <iframe src={data.map_iframe} title={data.shelter_id}></iframe>
                <p className="mt-4 mb-0">收容所編號</p>
                {data.shelter_number}
                <p className="mt-4 mb-0">聯絡方式</p>
                {data.shelter_phone} {data.shelter_contact_person}
              </div>
            </div>
          </div>

          <div className={`modal-footer ${ModalStyles['mymodalFooter']}`}></div>
        </div>
      </div>
    </>
  )
}
