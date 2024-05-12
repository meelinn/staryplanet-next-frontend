import React, { useState } from 'react'
import { MdOutlinePets } from 'react-icons/md'

export default function CareInfoS5Faq(props) {
  return (
    <>

        <div className="accordion-item">
          <h2 className="accordion-header" id={props.headingId}>
            <button
              className="accordion-button collapsed text-secondary "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${props.collapseId}`}
              aria-expanded="true"
              aria-controls={`#${props.collapseId}`}
            >
              <span>
                <MdOutlinePets className="melin-s5-pow" />
              </span>
              &ensp;{props.title}
            </button>
          </h2>
          <div
            id={props.collapseId}
            className="accordion-collapse collapse "
            aria-labelledby={props.headingId}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">{props.answer}</div>
          </div>
        </div>
   
      <style jsx>
        {`
          .melin-s5-pow:hover {
            transform: rotate(10px);
          }
        `}
      </style>
    </>
  )
}
