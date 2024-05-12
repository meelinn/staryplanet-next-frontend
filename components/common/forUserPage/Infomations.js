import React, { useEffect, useRef, useState } from 'react'
import styles from '@/components/common/forUserPage/Infomations.module.css'
import {
  BiEdit,
  BiArrowToLeft,
  BiX,
  BiUpload,
  BiSolidTrash,
} from 'react-icons/bi'
import { useAuth } from '@/contexts/auth-context'
import {
  AB_ITEM_UPDATE_PUT,
  AB_ITEM,
  AB_ITEM_DELETE,
} from '@/components/config'
import { useRouter } from 'next/router'
import bcrypt from 'bcryptjs'
import { auth as firebaseAuth } from '@/configs/firebase'
import axios from 'axios'
import dayjs from 'dayjs'
import Crop from '@/pages/crop/index'

const redBorder = {
  border: '2px solid rgba(255, 0, 0, .5)',
}
const redText = {
  color: 'red',
}

const darren = 'shin-auth'
export default function Infomations({ open, MemberID }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPassChanging, setIsPassChanging] = useState(false)
  const router = useRouter()
  const { auth, logoutWithoutAlert, setAuth } = useAuth()
  const [newPassword, setNewPassword] = useState('')

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
  }

  const [file, setFile] = useState()

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      console.log(file)
      console.log('45646456')
      const res = await axios.post(
        `http://localhost:3005/upload/${MemberID}`,
        formData
      )
      console.log(imagePath)
      if (res.data.Status === 'Success') {
        console.log('Succeeded')

        const imagePath = res.data.imagePath
      } else {
        console.log('Failed')
      }
    } catch (error) {
      console.error('Error uploading image of upload:', error)
    }
    window.location.reload()
    router.push('UserPage?account')
  }

  const [formData, setFormData] = useState({
    MemberID: 0, // 資料的 primary key
    Username: '',
    Email: '',
    Password: '',
    Address: '',
    user_photo: '',
    Birthday: '',
  })
  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    Username: '',
    Email: '',
    Phone: '',
    Password: '',
    // 可以根據需要添加其他欄位的錯誤訊息
  })
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => {
    setErrorMsg({ ...errorMsg, OldPassword: '', Password: '' })
    setShowModal(false)
  }

  const [isPass, setIsPass] = useState(false)
  const [oldPasswordInput, setOldPasswordInput] = useState('')
  const handleOldPasswordChange = (e) => {
    setOldPasswordInput(e.target.value)
  }

  useEffect(() => {
    if (!MemberID) return

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${AB_ITEM}/${MemberID}`)
        const userData = await response.json()
        if (userData.success) {
          const formattedBirthday = dayjs(userData.data.Birthday).format(
            'YYYY-MM-DD'
          )

          const isValidBirthday = dayjs(formattedBirthday).isValid()
          if (!isValidBirthday) {
            setFormData({ ...userData.data, Birthday: null })
          } else {
            setFormData({ ...userData.data, Birthday: formattedBirthday })
          }
        } else {
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [MemberID, router])

  if (!open) return null

  const fieldChanged = (e) => {
    const { name, value } = e.target
    let newValue = value

    if (name === 'Birthday') {
      newValue = dayjs(value).format('YYYY-MM-DD')
    }

    const newFormData = { ...formData, [name]: newValue }
    setFormData(newFormData)

    if (name === 'Username') {
      if (!validateUsername(value)) {
        setErrorMsg({ ...errorMsg, Username: '姓名最少需為2個字' })
      } else {
        setErrorMsg({ ...errorMsg, Username: '' })
      }
    }

    if (name === 'Email') {
      if (!validateEmail(value)) {
        setErrorMsg({ ...errorMsg, Email: '請輸入正確的信箱' })
      } else {
        setErrorMsg({ ...errorMsg, Email: '' })
      }
    }

    if (name === 'Phone') {
      if (!validatePhone(value)) {
        setErrorMsg({ ...errorMsg, Phone: '請輸入正確的手機號碼' })
      } else {
        setErrorMsg({ ...errorMsg, Phone: '' })
      }
    }
  }

  const validateUsername = (Username) => {
    return Username.toString().length >= 2
  }
  const validateRetypePassword = (Password) => {
    return Password === formData.RetypePassword
  }
  const validateEmail = (Email) => {
    return Email.toString().indexOf('@') >= 0
  }
  const validatePhone = (Phone) => {
    return /^09\d{2}-?\d{3}-?\d{3}$/.test(Phone)
  }

  const validateRetypePasswordBlur = (e) => {
    if (!validateRetypePassword(formData.Password)) {
      setErrorMsg({ ...errorMsg, Password: '密碼不符' })
      return false
    } else {
      setErrorMsg({ ...errorMsg, Password: '' })
      const { RetypePassword, ...formDataWithoutRetypePassword } = formData
      setFormData(formDataWithoutRetypePassword)
      return true
    }
  }

  const UsernameBlur = (e) => {
    if (!validateUsername(formData.Username)) {
      setErrorMsg({ ...errorMsg, Username: '姓名最少需為2個字' })
      return false
    } else {
      setErrorMsg({ ...errorMsg, Username: '' })
      return true
    }
  }
  const EmailBlur = (e) => {
    if (!validateEmail(formData.Email)) {
      setErrorMsg({ ...errorMsg, Email: '請輸入正確的信箱' })
      return false
    } else {
      setErrorMsg({ ...errorMsg, Email: '' })
      return true
    }
  }
  const PhoneBlur = (e) => {
    if (!validatePhone(formData.Phone)) {
      setErrorMsg({ ...errorMsg, Phone: '請輸入正確的手機號碼' })
      return false
    } else {
      setErrorMsg({ ...errorMsg, Phone: '' })
      return true
    }
  }

  const isOldPasswordMatch = async (oldPassword, hashedPassword) => {
    try {
      return await bcrypt.compare(oldPassword, hashedPassword)
    } catch (error) {
      console.error('Error comparing passwords:', error)
      return false
    }
  }

  const updateLocalStorageField = (fieldName, value) => {
    const storedData = JSON.parse(localStorage.getItem(darren)) || {}

    // 將修改的單個欄位更新到資料中
    storedData[fieldName] = value

    // 將更新後的資料重新存入 localStorage
    localStorage.setItem(darren, JSON.stringify(storedData))
  }

  // 每當 formData 變更時觸發更新 localStorage 的邏輯
  updateLocalStorageField('user_photo', formData.user_photo)
  updateLocalStorageField('Username', formData.Username)
  updateLocalStorageField('account', formData.Email)
  updateLocalStorageField('Phone', formData.Phone)
  updateLocalStorageField('Address', formData.Address)
  updateLocalStorageField('Birthday', formData.Birthday)

  // ************onSubmit**********

  const onSubmit = async (e) => {
    e.preventDefault()

    const hashedPasswordFromBackend = auth.Password

    // 判斷用戶輸入的舊密碼是否與後端傳遞的已 hash 密碼相符
    const isMatch = await isOldPasswordMatch(
      oldPasswordInput,
      hashedPasswordFromBackend
    )

    let dataModified = { ...formData }

    // 只有在正在更改密碼時才將新密碼包含在發送的數據中
    if (isPassChanging) {
      dataModified.Password = newPassword
      if (!isMatch) {
        // 舊密碼不正確，顯示錯誤訊息
        swal({
          title: '舊密碼不正確',
          icon: 'error',
          button: '重新輸入',
        })
        return
      } else {
        setErrorMsg({ ...errorMsg, OldPassword: '' })
      }

      const isNewPasswordMatch = validateRetypePasswordBlur()
      if (!isNewPasswordMatch) {
        swal({
          title: '密碼與確認密碼不相同',
          icon: 'error',
          button: '重新輸入',
        })
        return
      } else {
        const { RetypePassword, ...formDataWithoutRetypePassword } = formData
        setFormData(formDataWithoutRetypePassword)
      }
    } else {
      delete dataModified.Password // 如果不更改密碼，從數據中刪除密碼字段
    }

    const tmpIsPass = UsernameBlur() && EmailBlur() && PhoneBlur()
    setIsPass(tmpIsPass)

    if (!tmpIsPass) {
      swal({
        title: '格式錯誤',
        text: `${errorMsg.Username}\n${errorMsg.Email}\n${errorMsg.Phone}`, // 合併兩個錯誤訊息
        icon: 'error',
        button: '確認!',
      })
    } else {
      // 沒有要更動的欄位去掉
      delete dataModified.MemberID
      delete dataModified.RegistrationDate
      delete dataModified.RetypePassword

      const r = await fetch(`${AB_ITEM_UPDATE_PUT}/${MemberID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataModified),
      })

      const result = await r.json()

      console.log(result)
      console.log(formData)
      console.log(auth)
      if (result.success) {
        if (isPassChanging) {
          swal({
            icon: 'success',
            title: '密碼修改成功',
            text: '請重新登入',
            buttons: {
              confirm: {
                text: '確認',
                value: true,
                visible: true,
              },
            },
          }).then((confirm) => {
            if (confirm) {
              logoutWithoutAlert()
            } else {
            }
          })
        } else {
          swal({
            icon: 'success',
            title: '資料修改成功',
            buttons: {
              confirm: {
                text: '確認',
                value: true,
                visible: true,
              },
            },
          }).then((confirm) => {
            if (confirm) {
              console.log(77777)
              window.location.reload()
            }
          })
        }
      } else {
        swal({
          title: '資料沒有新增',
          text: '請確認輸入正確的格式',
          icon: 'warning',
          button: '重新輸入',
        })
      }
    }
  }

  const deleteImg = () => {
    deletePhoto(MemberID)
  }

  const deletePhoto = (MemberID) => {
    swal({
      icon: 'warning',
      title: '確定要刪除照片嗎?',
      buttons: {
        cancel: {
          text: '取消',
          value: false,
          visible: true,
        },
        confirm: {
          text: '確定',
          value: true,
          visible: true,
        },
      },
    }).then((confirm) => {
      if (confirm) {
        fetch(`${AB_ITEM_DELETE}/${MemberID}`, {
          method: 'DELETE',
        })
          .then((r) => r.json())
          .then((result) => {
            console.log(result)
            router.push('UserPage?account')
            window.location.reload() // 刷新頁面以更新圖片
          })
      }
    })
  }

  console.log(formData);

  return (
    <div className={styles.main}>
      <>
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <Crop
                handleUpload={handleUpload}
                setFile={setFile}
                setIsEditing={setIsEditing}
                setShowModal={setShowModal}
              ></Crop>
              <BiX className={styles.modalCloseIcon} onClick={closeModal} />
            </div>
          </div>
        )}
        {auth.id || firebaseAuth.currentUser ? (
          <>
            <form
              encType="multipart/form-data"
              name="form1"
              onSubmit={onSubmit}
              className={styles.contentContainer}
            >
              <div className={styles.leftSide}>
                {isEditing ? (
                  <div className={styles.userPhoto}>
                    <img
                      className={styles.darkPhoto}
                      src={
                        formData.user_photo
                          ? `http://localhost:3005/imgs/${formData.user_photo}`
                          : firebaseAuth?.currentUser?.photoURL
                          ? firebaseAuth.currentUser.photoURL
                          : '/img/Darren/logo.png'
                      }
                    />
                    <div className={styles.photoEditBtnContainer}>
                      <button
                        className={styles.uploadBtn}
                        type="button"
                        onClick={setShowModal}
                      >
                        <BiUpload className={styles.uploadIcon}></BiUpload>
                      </button>
                      {formData.user_photo && ( // 條件渲染，只有當 formData.user_photo 存在時才渲染刪除按鈕
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={deleteImg}
                        >
                          <BiSolidTrash
                            className={styles.deleteIcon}
                          ></BiSolidTrash>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={styles.userPhoto}>
                    <img
                      className={styles.photo}
                      src={
                        formData.user_photo
                          ? `http://localhost:3005/imgs/${formData.user_photo}`
                          : firebaseAuth?.currentUser?.photoURL
                          ? firebaseAuth.currentUser.photoURL
                          : '/img/Darren/logo.png'
                      }
                    />
                  </div>
                )}
                <div className={styles.userUsername}>
                  <div className={styles.UserInputContainer}>
                    {isEditing ? (
                      <input
                        type="text"
                        className={styles.usernameInput}
                        placeholder={formData.Username}
                        id="Username"
                        name="Username"
                        onChange={fieldChanged}
                        style={errorMsg.Username ? redBorder : {}}
                      />
                    ) : (
                      <div className={styles.Username}>
                        {auth.id
                          ? formData.Username
                          : firebaseAuth?.currentUser?.displayName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!firebaseAuth.currentUser && (
                <div className={styles.rightSide}>
                  {!isPassChanging ? (
                    <>
                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>信箱</label>
                        <div className={styles.inputContainer}>
                          {isEditing ? (
                            <input
                              type="text"
                              className={styles.emailInput}
                              id="Email"
                              name="Email"
                              onChange={fieldChanged}
                              style={errorMsg.Email ? redBorder : {}}
                            />
                          ) : (
                            <div className={styles.email}>
                              {auth.id
                                ? formData.Email
                                : firebaseAuth?.currentUser?.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>密碼</label>
                        <div className={styles.inputContainer}>
                          {isEditing ? (
                            <button
                              onClick={() => setIsPassChanging(true)}
                              type="button"
                              className={styles.passwordBtn}
                            >
                              點我修改密碼
                            </button>
                          ) : (
                            <div className={styles.password}>******</div>
                          )}
                        </div>
                      </div>

                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>電話</label>
                        <div className={styles.inputContainer}>
                          {isEditing ? (
                            <input
                              type="text"
                              className={styles.phoneInput}
                              id="Phone"
                              name="Phone"
                              onChange={fieldChanged}
                              style={errorMsg.Phone ? redBorder : {}}
                            />
                          ) : (
                            <div className={styles.phone}>
                              {auth.id ? formData.Phone : 'GOOGLE'}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>生日</label>
                        <div className={styles.inputContainer}>
                          {isEditing ? (
                            <input
                              type="date"
                              className={styles.birthdayInput}
                              id="Birthday"
                              name="Birthday"
                              onChange={fieldChanged}
                              min="1900-01-01"
                              max={dayjs().format('YYYY-MM-DD')}
                            />
                          ) : formData.Birthday ? (
                            <div className={styles.birthday}>
                              {formData.Birthday}
                            </div>
                          ) : (
                            <div
                              className={`${styles.birthday} ${styles.redText}`}
                            >
                              尚未設定
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>性別</label>
                        <div className={styles.inputContainer}>
                          <div className={styles.gender}>{auth.Gender}</div>
                        </div>
                      </div>

                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>地址</label>
                        <div className={styles.inputContainer}>
                          {isEditing ? (
                            <input
                              type="text"
                              className={styles.addressInput}
                              id="Address"
                              name="Address"
                              onChange={fieldChanged}
                              style={errorMsg.Address ? redBorder : {}}
                            />
                          ) : formData.Address ? (
                            <div className={styles.address}>
                              {auth.id ? formData.Address : 'GOOGLE'}
                            </div>
                          ) : (
                            <div
                              className={`${styles.address} ${styles.redText}`}
                            >
                              尚未設定
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>輸入舊密碼</label>
                        <div className={styles.inputContainer}>
                          <input
                            type="password" // 注意這裡是 password，而不是 text
                            className={styles.passwordInput}
                            id="OldPassword"
                            name="OldPassword"
                            value={oldPasswordInput}
                            onChange={handleOldPasswordChange}
                          />
                        </div>
                      </div>
                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>設定新密碼</label>
                        <div className={styles.inputContainer}>
                          <input
                            type="text"
                            className={styles.passwordInput}
                            id="Password"
                            name="Password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            style={errorMsg.Password ? redBorder : {}}
                          />
                        </div>
                      </div>
                      <div className={styles.userInfoContainer}>
                        <label className={styles.infoLabel}>確認新密碼</label>
                        <div className={styles.inputContainer}>
                          <input
                            type="text"
                            className={styles.RetypePasswordInput}
                            id="RetypePassword"
                            name="RetypePassword"
                            onChange={fieldChanged}
                            style={errorMsg.Password ? redBorder : {}}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {!firebaseAuth.currentUser && (
                <div className={styles.editIconContainer}>
                  {isEditing ? (
                    <button className={styles.checkButton}>確認修改</button>
                  ) : null}
                  <div className={styles.iconContainer}>
                    {isEditing ? (
                      <>
                        <BiArrowToLeft
                          className={styles.prevIcon}
                          onClick={() => {
                            setIsPassChanging(false)
                            setIsEditing(false)
                            router.push(
                              'UserPage?account'
                            )
                          }}
                        />
                      </>
                    ) : (
                      <BiEdit
                        className={styles.editIcon}
                        onClick={() => {
                          setIsEditing(true)
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </form>
          </>
        ) : (
          <div>123</div>
        )}
      </>
    </div>
  )
}
