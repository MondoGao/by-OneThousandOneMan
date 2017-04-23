import { commonFetchGet } from 'sources/utils'
import { user } from 'sources/schemas'

export function getUser(id) {
  if (!id) {
    throw new Error('无效的用户id')
  }

  return commonFetchGet(`/api/users/${id}`, user)
}
