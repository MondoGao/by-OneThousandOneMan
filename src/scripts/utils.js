/**
 * 删除数组中存在的元素，返回新数组
 * @param {Array} arr
 * @param {...any} els
 * @return {Array}
 */
export const removeFromArray = (arr, ...els) => {
  return arr.filter(el => !els.includes(el))
}