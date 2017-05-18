import { settings } from 'sources'
import { checkStatus } from 'sources/utils'
import { redirectToWx } from 'scripts/utils'

/**
 * 获取访客列表及弹幕狂魔列表
 * @param id - 用户 id
 * @param token - 一次性 token
 * @param type - 1=>获取访客列表，2=>获取弹幕狂魔列表
 * @return {Promise}
 */
export const getVisitorList = (id, token, type = 1) => {
  return fetch(`${settings.publicPath}api/users/${id}/visitors?token=${token}${type === 2 ? '&query=most' : ''}`, {
    credentials: 'same-origin'
  })
    .then(checkStatus)
    .catch(err => {
      switch (err.response && err.response.status) {
        case 401: {
          redirectToWx()
          break
        }
        case 400: {
          // token 错误
          alert(`呜呜呜，这个链接已经不能用了呢~再去华科脱单后台回复单身理由获取新的链接把！`)
          break
        }
        case 403: {
          // 访客数不足
          alert(`什么！点进你主页的人连 10 个都没有！这怎么能告诉你访客都是谁呢！我们可是很心机的！再分享几次让朋友多来发弹幕吧！`)
          break
        }
        default: {
          console.log(err)
          
          alert(`一不小心加载失败啦！可以先刷新试试哦！如反复出现可以将本提示截图发给开发者微信号：458990789 哦！错误信息如下：
            ${err}+
            ${err.message}+
            ${err.stack}`)
        }
      }
    })
    .then(data => data.json())
}
