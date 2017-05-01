export * from 'sources/users'
import { checkStatus } from 'sources/utils'

export const settings = {
  // appId: 'wxb8c111df49f72f25',
  appId: 'wx690cda5c2ea251b2',
  scope: 'snsapi_userinfo',
  wechatHref: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1NzA3NTkwNw==&scene=110#wechat_redirect',
  publicPath: '/single/'
}

export const jssdkConfig = url => {
  return fetch(`http://weixin.bigtech.cc/service/jssdk_config?url=${encodeURIComponent(url)}`)
    .then(checkStatus)
    .then(data => data.json())
}