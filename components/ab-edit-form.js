import React, { useEffect, useState } from "react";
import { AB_ITEM_UPDATE_PUT, AB_ITEM } from "@/components/config";
import { useRouter } from "next/router";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function AbEditForm({ MemberID }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    MemberID: 0, // 資料的 primary key
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

  const validateName = (Username) => {
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
  };
  const validateFields = () => {
    let tmpIsPass = true;
    let tmpErrorMsg = { ...errorMsg };
    // 欄位資料驗證
    if (!validateName(formData.Username)) {
      tmpErrorMsg = { ...tmpErrorMsg, Username: "請輸入正確的姓名" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, Username: "" };
    }

    if (!validateEmail(formData.Email)) {
      tmpErrorMsg = { ...tmpErrorMsg, Email: "請輸入正確的 Email" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, Email: "" };
    }

    if (!validatePhone(formData.Phone)) {
      tmpErrorMsg = { ...tmpErrorMsg, Phone: "請輸入正確的手機號碼" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, Phone: "" };
    }
    setErrorMsg(tmpErrorMsg);
    return tmpIsPass;
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 表單不要以傳統方式送出
    if (!validateFields()) {
      alert("必填欄位請填入符合格式的值");
      return; // 沒通過檢查的話, 就返回
    }

    const dataModified = {...formData};
    // 沒有要更動的欄位去掉
    delete dataModified.MemberID;
    delete dataModified.RegistrationDate;

    const r = await fetch(`${AB_ITEM_UPDATE_PUT}/${MemberID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataModified),
    });

    const result = await r.json();

    console.log(result);
    if (result.success) {
      alert("資料修改成功");
      console.log(document.referrer);
      router.back();
    } else {
      alert("資料沒有修改");
    }
  };

  useEffect(()=>{
    if(! MemberID) return; // 如果沒有 MemberID 的值, 就不用發 AJAX
    fetch(`${AB_ITEM}/${MemberID}`)
    .then(r=>r.json())
    .then(result=>{
      console.log(result);
      if(result.success){
        setFormData({...result.data});
      } else {
        router.push("/address-book");
      }
    });
  }, [ MemberID, router ]);
  // console.log(formData);
  return (
    <div className="row">
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">修改通訊錄 {MemberID}</h5>

            <form name="form1" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                  ** 姓名
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Username"
                  name="Username"
                  value={formData.Username}
                  onChange={fieldChanged}
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
                  style={errorMsg.Phone ? redBorder : {}}
                />
                <div className="form-text" style={redText}>
                  {errorMsg.Phone}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                修改
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
