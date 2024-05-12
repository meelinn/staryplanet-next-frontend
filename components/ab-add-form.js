import React, { useState } from "react";
import {AB_ADD_POST} from "@/components/config"
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function AbAddForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Phone: "",
    Password: "",
  });
  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    Username: "",
    Email: "",
    Phone: "",
  });
  // 整個表單有沒有通過檢查
  const [isPass, setIsPass] = useState(false);

  const validateUsername = (Username) => {
    return Username.toString().length >= 2;
  };
  const validateEmail = (Email) => {
    return Email.toString().indexOf("@") >= 0; // 粗略的判斷方式
  };
  const validatePhone = (Phone) => {
    return /^09\d{2}-?\d{3}-?\d{3}$/.test(Phone);
  };

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    /*
    let tmpIsPass = true;
    let tmpErrorMsg = { ...errorMsg };
    // 欄位資料驗證
    if (!validateName(newFormData.name)) {
      tmpErrorMsg = { ...tmpErrorMsg, name: "請輸入正確的姓名" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, name: "" };
    }

    if (!validateEmail(newFormData.Email)) {
      tmpErrorMsg = { ...tmpErrorMsg, Email: "請輸入正確的 Email" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, Email: "" };
    }

    if (!validatePhone(newFormData.Phone)) {
      tmpErrorMsg = { ...tmpErrorMsg, Phone: "請輸入正確的手機號碼" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, Phone: "" };
    }
    setErrorMsg(tmpErrorMsg);
    setIsPass(tmpIsPass);
    */
  };

  const UsernameBlur = (e) => {
    if (!validateUsername(formData.Username)) {
      setErrorMsg({ ...errorMsg, Username: "請輸入正確的姓名" });
      return false
    } else {
      setErrorMsg({ ...errorMsg, Username: "" });
      return true
    }
  };
  const EmailBlur = (e) => {
    if (!validateEmail(formData.Email)) {
      setErrorMsg({ ...errorMsg, Email: "請輸入正確的 Email" });
      return false
    } else {
      setErrorMsg({ ...errorMsg, Email: "" });
      return true
    }
  };
  const PhoneBlur = (e) => {
    if (!validatePhone(formData.Phone)) {
      setErrorMsg({ ...errorMsg, Phone: "請輸入正確的手機號碼" });
      return false
    } else {
      setErrorMsg({ ...errorMsg, Phone: "" });
      return true
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const tmpIsPass = UsernameBlur() && EmailBlur() && PhoneBlur();
    setIsPass(tmpIsPass);
    if (tmpIsPass) {
      // 將密碼哈希化
      const hashedPassword = await bcrypt.hash(formData.Password, 10);
      const formDataWithHashedPassword = {
        ...formData,
        Password: hashedPassword,
      };

      const r = await fetch(AB_ADD_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithHashedPassword),
      });

      const result = await r.json();

      if (result.success) {
        alert("資料新增成功");
        router.push("/address-book");
      } else {
        alert("資料沒有新增");
      }
    } else {
      alert("必填欄位請填入符合格式的值");
    }
  };


  console.log(formData);
  return (
    <div className="row">
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">新增通訊錄</h5>

            <form name="form1" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  ** 姓名
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Username"
                  name="Username"
                  value={formData.Username}
                  onChange={fieldChanged}
                  onBlur={UsernameBlur}
                  style={errorMsg.Username ? redBorder : {}}
                />
                <div className="form-text" style={redText}>
                  {errorMsg.Username}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  電子郵箱
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={fieldChanged}
                  onBlur={EmailBlur}
                  style={errorMsg.Email ? redBorder : {}}
                />
                <div className="form-text" style={redText}>
                  {errorMsg.Email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="Phone" className="form-label">
                  手機
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Phone"
                  name="Phone"
                  value={formData.Phone}
                  onChange={fieldChanged}
                  onBlur={PhoneBlur}
                  style={errorMsg.Phone ? redBorder : {}}
                />
                <div className="form-text" style={redText}>
                  {errorMsg.Phone}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  密碼
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={fieldChanged}
                />
                <div className="form-text"></div>
              </div>
              

              <button type="submit" className="btn btn-primary">
                新增
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
