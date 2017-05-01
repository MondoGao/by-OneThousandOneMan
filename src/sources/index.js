export * from 'sources/users'
import { checkStatus } from 'sources/utils'

export const settings = {
  appId: 'wxb8c111df49f72f25',
  scope: 'snsapi_userinfo',
  redirectUri: 'http://127.0.0.1:8100',
  wechatHref: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1NzA3NTkwNw==&scene=110#wechat_redirect'
}

export const jssdkConfig = url => {
  return fetch(`http://weixin.bigtech.cc/service/jssdk_config?url=${encodeURIComponent(url)}`)
    .then(checkStatus)
    .then(data => data.json())
}