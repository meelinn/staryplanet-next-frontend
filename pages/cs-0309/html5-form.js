import { Fragment, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Html5Form() {
  // input-text password (字串)
  const [inputText, setInputText] = useState('')

  // 顯示密碼用
  const [showPassword, setShowPassword] = useState(false)

  // toISOString 產生今日的日期 yyyy-mm-dd
  const nowDate = new Date().toISOString().split('T')[0]

  // input-date (字串)
  const [inputDate, setInputDate] = useState(nowDate)

  // textarea
  const [textareaText, setTextareaText] = useState('')

  // radio button group
  const petOptions = ['狗', '貓', '金魚']
  // 看使用者選了哪一個; 初始化值是空字串代表沒有選,但嘴多也只能選上面3種
  const [pet, setPet] = useState('')

  // checkbox group - 1
  // checkbox group 方法1: 狀態使用"單純值的陣列"，初始為空陣列，代表沒有選任何選項
  const [pets, setPets] = useState([])

  const handlePetsChecked = (e) => {
    // *****雖然 e.target.value 相當於在下面 map 中的 v, 但使用它可以區分出事件處理函式
    const targetValue = e.target.value // *****從(e)事件物件來的
    // 先判斷(includes)是否在狀態(pets)陣列中
    if (pets.includes(targetValue)) {
      // 如果在陣列中 ===> 移出(filter)陣列
      setPets(
        pets.filter((v2, i2) => {
          return v2 !== v
        })
      )
    } else {
      // 否則加入陣列
      setPets([targetValue, ...pets])
      // *****這裡用targetValue,而不用v, 是因為可以移出來這邊作為事件處理函式
    }
  }

  // checkbox group - 2
  // 方法2: 狀態使用"物件陣列"，以其中一個布林值屬性值來對應是否被選擇 (使用時機例如:購物車"勾選"才結帳)
  // 擴充它，使其變成物件陣列
  // 此範例類似於"加入我的最愛"，切換布林值

  // const petOptionsX = petOptions.map((v, i)
  // initial state: petOptionsX

  const initState = petOptions.map((v, i) => {
    return { id: i + 1, label: v, checked: false }
  })

  const [petsX, setPetsX] = useState(initState)

  const toggleCheckbox = (petsX, id) => {
    return petsX.map((v, i) => {
      // 如果物件資料中的 id 屬性符合傳入的 id 值時, 則切換(or 反相) checked 的布林值
      if (v.id === id) return { ...v, checked: !v.checked }
      // 否則直接回傳原本的物件值
      else return v
    })
  }

  // checkbox 全選
  // 實際不需要自己的狀態, 用的是 petsX 的狀態聯合計算出來的結果
  // const [checkAll, setCheckedAll] = useState(false)

  const handlePetsCheckedAll = (nextChecked) => {
    // 強制修改所有項目的 checked 屬性
    const nextPetsX = petsX.map((v, i) => {
      return { ...v, checked: nextChecked }
    })
    setPetsX(nextPetsX)
  }

  // select
  const cityOptions = [
    '台北市',
    '新北市',
    '桃園市',
    '台中市',
    '台南市',
    '高雄市',
  ]

  // 一開始為空字串, 代表沒有選任何選項
  const [city, setCity] = useState('')

  return (
    <>
      <h1>可控表單元件範例</h1>
      <section title="input-text">
        <h2>文字輸入框(input-text)</h2>
        <input
          type="text"
          // 條件1: value 要對應到某狀態
          value={inputText}
          // 條件2: onChange時, 要能更動到此狀態(輸入的東西進入此狀態)
          onChange={(e) => {
            setInputText(e.target.value)
          }}
        />
        <h2>密碼輸入框(input-password)</h2>
        <input
          // 顯示密碼就是 'text'; 不顯示則為 'password' 形式
          type={showPassword ? 'text' : 'password'}
          // 條件1: value 要對應到某狀態
          value={inputText}
          // 條件2: onChange時, 要能更動到此狀態(輸入的東西進入此狀態)
          onChange={(e) => {
            setInputText(e.target.value)
          }}
        />
        <input
          type="checkbox"
          // checkbox 與 radio button 主要是以 checked 屬性決定顯示
          checked={showPassword}
          onChange={(e) => {
            // 推薦使用以下 eventListener 寫法
            setShowPassword(e.target.checked)
            // 也可以寫成以下(自我反向)
            // setShowPassword(!showPassword)
          }}
        />
        顯示密碼
        <button
          onClick={() => {
            // 自我反向的布林值寫法
            setShowPassword(!showPassword)
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <h2>日期輸入框</h2>
        <input
          type="date"
          onChange={(e) => {
            setInputDate(e.target.value)
          }}
        />
      </section>
      <section title="textarea">
        <h1>文字輸入區域(textarea)</h1>
        <textarea
          value={textareaText}
          onChange={(e) => {
            setTextareaText(e.target.value)
          }}
        ></textarea>
      </section>
      <section title="radio-button-group">
        <h2>選項按鈕群組(radio-button-group)</h2>
        {petOptions.map((v, i) => {
          return (
            <label key={i}>
              <input
                type="radio"
                // 在 onChange 時可以用 e.target.value得到
                value={v}
                // 每個 radio 會用自身 value 來和目前狀態(pet)比較，要完全相符才會是true
                // 選項本身藏了的值(意即每個操作介面的值跟 const [pet, setPet] = useState('') 做比較)
                checked={v === pet}
                onChange={(e) => {
                  setPet(e.target.value)
                  // e.target.value 操作的表單元素的值
                }}
              />
              {v}
            </label>
          )
          // 因 return 為平行階層，原先的<></>無法加上 key 屬性，需使用原型的<Fragment></Fragment>元件才能加
          //return (
          //  <Fragment key={i}>
          //    <input type="radio" />
          //    {v}
          //  </Fragment>
          // )
        })}
      </section>
      <section title="checkbox-button-group">
        <h2>核取方塊群組(checkbox-button-group)</h2>
        {petOptions.map((v, i) => {
          return (
            <label key={i}>
              <input
                type="checkbox"
                value={v}
                checked={pets.includes(v)} //判斷 "狀態陣列內有沒有包含這個值"
                onChange={handlePetsChecked} // *****原本的事件處理器代碼太多, 移至上方,方便管理
              />
              {v}
            </label>
          )
        })}
      </section>
      <section title="checkbox-button-group2">
        <h2>核取方塊群組2(checkbox-button-group2)</h2>
        <label>
          <input
            type="checkbox"
            checked={petsX.every((v, i) => v.checked)}
            onChange={(e) => {
              // 這是可控元件自身要使用的
              setCheckedAll(e.target.checked)
              // 強制修改所有項目的 checked 屬性
              handlePetsCheckedAll(e.target.checked)
            }}
          />
          全選
        </label>
        <br />
        {petsX.map((v, i) => {
          return (
            <label key={i}>
              <input
                type="checkbox"
                // value={v.label}
                //判斷是否在此狀態陣列中
                checked={v.checked}
                onChange={(e) => {
                  setPetsX(toggleCheckbox(petsX, v.id))
                }}
              />
              {v.label}
            </label>
          )
        })}
      </section>
      <section title="select">
        <h2>下拉清單(select)</h2>
        <select
          // react 中為了取值方便, 修改讓 select 可以用 value 屬性(類似於)
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
          }}
        >
          {/* 為了要完全綁定對應狀態，狀態初始值為空字串，要與此選項一致 */}
          <option value="">請選擇城市</option>
          {cityOptions.map((v, i) => {
            return (
              <option key={i} value={v}>
                {v}
              </option>
            )
          })}
        </select>
      </section>
    </>
  )
}
