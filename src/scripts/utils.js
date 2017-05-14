import { settings } from 'sources'

/**
 * 删除数组中存在的元素，返回新数组
 * @param {Array} arr
 * @param {boolean} deleteOnce 是否只删除一次元素而不删除重复元素
 * @param {...any} els
 * @return {Array}
 */
export const removeFromArray = (arr, deleteOnce, ...els) => {
  let deletedEls = []
  
  const result =  arr.filter(el => {
    if (els.includes(el)) {
      if (deleteOnce) {
        
        if (!deletedEls.includes(el)) {
          deletedEls.push(el)
          return false
        }
      } else {
        return false
      }
    }
    return true
  })
  
  return result
}

/**
 * 缓存资源函数
 * @param assetsArr 资源地址列表
 * @return {Promise}
 */
export const loadingAssets = assetsArr => {
  const createLoadingImg = src => (
    new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.src = src
      img.addEventListener('load', e => {
        resolve()
      })
      img.addEventListener('error', e => {
        reject(e)
      })
    })
  )
  
  return Promise.all(assetsArr.map(assetSrc => (
      assetSrc ? createLoadingImg(assetSrc) : Promise.resolve()
    )))
}

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

/**
 * 跳转微信验证
 */
export const redirectToWx = () => {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${settings.appId}&redirect_uri=${encodeURIComponent(window.location.href.replace(window.location.search, ''))}&response_type=code&scope=${settings.scope}&state=STATE#wechat_redirect`
}

export const getCurrentPageName = myselfId => {
  let params = this.props.location.pathname.match(/\/users\/([\w-]+)/)
  let userId = params && params[1]
  
  return userId ? (userId === myselfId ? '主人页' : '访客页') : '首页'
}

export const trackEvent = (myselfId, action, label, value) => {
  _czc.push(['_trackEvent', getCurrentPageName(myselfId), action, label, value])
}