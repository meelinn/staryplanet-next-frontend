import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// 1. 建立 context
const AuthContext = createContext(null)

// 2. 建立一個 Context Provider 元件
// 提供給全站最上層元件(_app.js)使用, 集中這個 context 藥用的狀態在裡面管理
export function AuthProvider({ children }) {
  // 路由器
  const router = useRouter()

  // 會員的初始狀態
  const initAuth = {
    isAuth: true, // 代表沒有登入
    userData: {
      // 代表會員的資料
      id: 0,
      username: '',
    },
  }
  // 共享狀態
  // useState(裡面建議要寫初始值, 不然會是 undefined)
  const [auth, setAuth] = useState(initAuth)

  // 會員登入
  // const login = () => {
  //   setAuth({
  //     isAuth: true,
  //     userData: {
  //       id: 123,
  //       username: 'potter',
  //     },
  //   })
  // }

  // 會員登出
  // const logout = () => {
  //   // 登出 = 回復初始狀態
  //   setAuth(initAuth)
  // }

  // 20240327
  const checkAuth = async () => {
    const res = fetch('http://localhost:3005/api/members/check-auth', {
      method: 'GET',
      credentials: 'include', // 重要! 要下這段指令伺服器才能改密碼
    })

    const data = await res.json()

    console.log(data)

    if (data.status === 'success') {
      setAuth({
        isAuth: false, //代表有登入中
        userData: {
          // 代表會員的資料
          id: data.data.user.id,
          username: data.data.user.username,
        },
      })
    }
  }

  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      checkAuth()
    }
  }, [router.isReady])

  return (
    <AuthContext.Provider
      // 20240308 使用 value 屬性提供資料，讓提供者階層下面後代元件都存取得到資料
      // 20240308 [得到狀態的常數,設定狀態]
      // 20240327 用於驗證 pages\cs-0327\login-form.js，原本: value={{ auth, login, logout }}
      value={{ auth, setAuth, checkAuth }}
    >
      {/* {children}: 夾在裡面的東西 */}
      {children}
    </AuthContext.Provider>
  )
}
// 3. 提供一個包裝好的 useContext 名稱
// 提供給消費者(consumer)方便使用, 直接呼叫就能用
export const useAuth = () => useContext(AuthContext)
