export const getCookie = name => {
  let value = "; " + document.cookie
  let parts = value.split("; " + name + "=")
  if (parts.length === 2) {
    return parts.pop().split(";").shift()
  }
}

/**
 * 获取 querystring
 * @param {string} name
 * @param {string=} url
 * @return {''|null|string}
 */
export const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&")
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

const settings = {
  appId: 'wx690cda5c2ea251b2',
  scope: 'snsapi_userinfo',
}

let code = getParameterByName('code')
let key = getCookie('key')

if (!key && !code) {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${settings.appId}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=${settings.scope}&state=STATE#wechat_redirect`
}