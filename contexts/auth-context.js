import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_LOGIN_POST } from '@/components/config'
import swal from 'sweetalert'
import { useRouter } from 'next/router'

const AuthContext = createContext()

// 1. 保有登入的狀態
// 2. 登入的功能
// 3. 登出
const logoutState = {
  id: 0, // 如果不是 0 表示已經登入
  account: '',
  Username: '',
  token: '',
}

const authStorageKey = 'shin-auth' //melin更改//shin-auth

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(logoutState)
  const router = useRouter()

  const login = async (account, password) => {
    // 處理登入的狀況
    const r = await fetch(JWT_LOGIN_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account, password }),
    })
    if (!r.ok) return false // 登入沒有成功
    const result = await r.json()
    if (!result.success) return false // 登入沒有成功

    console.log(result)
    localStorage.setItem(authStorageKey, JSON.stringify(result.data))
    setAuth({ ...result.data })
    return true
  }

  const logoutWithoutAlert = () => {
    localStorage.removeItem(authStorageKey)
    setAuth({ ...logoutState })
    router.push('/loginPage')
  }

  const logout = () => {
    swal({
      icon: 'warning',
      title: '確定要登出嗎',
      buttons: {
        cancel: {
          text: '取消',
          value: false,
          visible: true,
        },
        confirm: {
          text: '確認',
          value: true,
          visible: true,
        },
      },
    }).then((logout) => {
      if (logout) {
        localStorage.removeItem(authStorageKey)
        setAuth({ ...logoutState })
        router.push('/loginPage')
      } else {
      }
    })
  }
  //melin新增
  const getAuthHeader = () => {
    if (auth.id) {
      return {
        Authorization: `Bearer ${auth.token}`,
      }
    }
    return {}
  }

  useEffect(() => {
    const str = localStorage.getItem(authStorageKey)
    if (str) {
      try {
        const localState = JSON.parse(str)
        setAuth(localState)
      } catch (ex) {}
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        logoutWithoutAlert,
        setAuth,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
