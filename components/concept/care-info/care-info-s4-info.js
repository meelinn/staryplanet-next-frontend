import React from 'react'

export default function CareInfoS4Info({ data }) {
  const s4CardData = [
    {
      title: '基本佈置',
      text: '不論你是貓奴還是狗奴，規劃空間的第一步就是要先了解寵物的需求與習性，毛孩需要給予充足的安全感、除了規劃毛小孩專屬的如廁、休憩空間外，飲水也是設計的關鍵之一，每個毛孩都至少有需一個水盆，並將水盆規劃於離地約15~20公分左右的高度，每日清潔，並尊重毛孩的地盤意識。',
      src: '/img/concept/brina-blum-nWX4pKwzLoE-unsplash.jpg',
      alt: '基本佈置',
    },
    {
      title: '格局動線',
      text: '規劃能讓毛孩能自由活動的空間，如：貓咪需要上竄下跳的垂直空間、狗狗需要足夠的活動與奔跑空間，並將危險物品收納至毛孩碰觸不到的地方及隔離可能造成危險的區域。對外的陽台與窗戶，一定要加裝防護網，防止寵物暴衝時掉落造成生命危險。',
      src: '/img/concept/eric-han-WJ6fmN1D-h0-unsplash.jpg',
      alt: '格局動線',
    },
    {
      title: '清潔收納',
      text: '別忘了規劃一個專門收納寵物用具的空間，才能輕鬆維持居家整潔。有養寵物的家庭，地板、沙發、家具下方、牆角處難免會有毛髮堆積的問題，因此每天清潔並收拾是保持室內乾淨最好的方式，考量到毛孩的健康安全，地板盡量以清水擦拭，也建議可以使用空氣清淨機，來過濾室內的灰塵、細菌、異味等，讓居家環境隨時保持舒適度。',
      src: '/img/concept/jason-briscoe-AQl-J19ocWE-unsplash.jpg',
      alt: '清潔收納',
    },
  ]
  return (
    <>
      {s4CardData.map((v, i) => (
        <div className="row my-4 justify-content-center" key={i}>
          {i % 2 === 0 ? ( // 左側圖片(偶數)
            <>
              <div className="col-md-12 col-lg-6 p-3">
                <img className="img-fluid rounded-1" src={v.src} alt={v.alt} />
              </div>
              <div className="col-md-12 col-lg-6 p-3">
                <div className="row align-items-center">
                  <h5 className="text-secondary fw-bolder text-sm-center text-md-center text-lg-start mt-md-3">
                    {v.title}
                  </h5>
                  <p className="text-secondary">{v.text}</p>
                </div>
              </div>
            </>
          ) : (
            // 右側圖片(奇數)
            <>
              {/* <div className="card rounded-2 "> */}
              <div class="row g-0">
                <div className="col-md-12 col-lg-6 order-lg-2 p-3">
                  <img
                    className="img-fluid rounded-start rounded-1"
                    src={v.src}
                    alt={v.alt}
                  />
                </div>
                <div className="col-md-12 col-lg-6 order-lg-1 p-3">
                  <div className="row align-items-center">
                    <h5 className="text-secondary fw-bolder text-lg-end text-sm-center text-md-center  mt-md-3">
                      {v.title}
                    </h5>
                    <p className="text-secondary">{v.text}</p>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </>
          )}
        </div>
      ))}
    </>
  )
}
