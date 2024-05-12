import { useState } from 'react'

export default function TestForm() {
  // 使用useState Hook為使用者名稱和密碼創建狀態和設置函數
  const [username, setUsername] = useState('pppp')
  const [password, setPassword] = useState('23132')

  // 組件的返回函數顯示了表單和按鈕
  return (
    <>
      <h2>可控表單元件</h2>
      帳號:{' '}
      <input
        type="text"
        value={username}
        onChange={(e) => {
          // 當輸入變化時，更新狀態
          setUsername(e.target.value)
        }}
      />
      <br />
      {/* 密碼的輸入框 */}
      密碼:{' '}
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <br />
      <button
        onClick={() => {
          // 與狀態綁定，狀態有變動就會連帶一起變動
          {
            /* 一鍵輸入按鈕：設置預設的用戶名和密碼 */
          }
          setUsername('potter')
          setPassword('12345')
        }}
      >
        一鍵輸入
      </button>
      {/* 登入按鈕：顯示當前的用戶名和密碼 */}
      <button
        onClick={() => {
          alert(`username=${username}, password=${password}`)
        }}
      >
        登入
      </button>
      <hr />
      <h2>不可控表單元件</h2>
      {/* 不受控制的用戶名輸入框，默認值為"aaa" */}
      帳號: <input type="text" id="my-username" defaultValue="aaa" />
      {/* 不受控制的密碼輸入框，默認值為"123" */}
      <br />
      密碼: <input type="password" id="my-password" defaultValue="123" />
      <br />
      <button
        /* 不可控表單中 onClick 抓到值的方法: document.getElementById */
        /* 一鍵輸入按鈕：直接操作DOM元素，設置值為"herry"和"123456" */
        onClick={() => {
          document.getElementById('my-username').value = 'herry'
          document.getElementById('my-password').value = '123456'
        }}
      >
        一鍵輸入
      </button>
      {/* 登入按鈕：讀取並顯示不受控制元件的值 */}
      <button
        onClick={() => {
          alert(
            `username=${
              document.getElementById('my-username').value
            }, password=${document.getElementById('my-password').value}`
          )
        }}
      >
        登入
      </button>
    </>
  )
}
