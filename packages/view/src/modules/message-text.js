const ErrorText = {
  EXCEPTION: '發生錯誤囉！'
}

const popup = new Map()
popup.set('Account is existed', '帳戶已存在，重新註冊')
popup.set('Register successfully', '註冊成功')
popup.set('Register failed', '註冊失敗')
popup.set('Login successfully', '登入成功')
popup.set('Login failed', '登入失敗')
popup.set('Password is wrong', '密碼錯誤')
popup.set('Account is empty', '此帳戶不存在')
popup.set('Logout successfully', '登出成功')
popup.set('Logout failed', '登出失敗')
popup.set('Browser does not support WebStorage' , '瀏覽器未支援 WebStorage, 請使用別的瀏覽器')


export {
  ErrorText,
  popup
}