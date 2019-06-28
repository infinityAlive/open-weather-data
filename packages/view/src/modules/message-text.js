const ErrorText = {
  EXCEPTION: '發生錯誤囉！'
}

const Popup = new Map()
Popup.set('Register failed, Account is existed', '帳戶已存在，重新註冊')
Popup.set('Register successfully', '註冊成功')
Popup.set('Register failed', '註冊失敗')
Popup.set('Login successfully', '登入成功')
Popup.set('Login failed', '登入失敗')
Popup.set('Login failed, Password is wrong', '密碼錯誤')
Popup.set('Login failed, Account is empty', '此帳戶不存在')
Popup.set('Logout successfully', '登出成功')
Popup.set('Logout failed', '登出失敗')
Popup.set('Browser does not support WebStorage' , '瀏覽器未支援 WebStorage, 請使用別的瀏覽器')


export {
  ErrorText,
  Popup
}