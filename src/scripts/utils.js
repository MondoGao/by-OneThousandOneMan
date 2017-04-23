/**
 * 删除数组中存在的元素，返回新数组
 * @param {Array} arr
 * @param {...any} els
 * @return {Array}
 */
export const removeFromArray = (arr, ...els) => {
  return arr.filter(el => !els.includes(el))
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
