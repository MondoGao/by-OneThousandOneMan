import { schema } from 'normalizr'

export const user = new schema.Entity('users', {}, {
  idAttribute: 'openid',
  processStrategy(entity) {
    return {
      ...entity,
      id: entity.openid
    }
  }
})
export const users = [ user ]
