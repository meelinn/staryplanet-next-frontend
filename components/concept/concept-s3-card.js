import React from 'react'
import Image from 'next/image'

export default function ConceptS3Card(props) {
  return (
    <>
      <div className="card col-12 col-lg-4 rounded-4 p-0 overflow-hidden my-5 melin-concept-section3-card">
        <img src={props.src} alt={props.alt} />
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title text-secondary fw-bolder">{props.title}</h5>
          <p className="card-text p-3">{props.text}</p>
        </div>
      </div>

      <style jsx>
        {`
          .melin-concept-section3-card:hover {
            /* transform: translateY(-5px); */

            transform: translateY(-3px);

            transition: 0.3s ease-in-out;
          }
        `}
      </style>
    </>
  )
}
