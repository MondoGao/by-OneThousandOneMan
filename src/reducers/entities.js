import { combineReducers } from 'redux'

/*Todo: Fake Data*/
import avatar from 'assets/airship@2x.png'
const defaultUsers = {
  'myself': {
    id: 'myself',
    labels: ['要求太高了', '心疼我家的傻儿子！！！', '没有选择我', '单身2017', '等着我脱单后你再脱', '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'],
    visitorAvatars: [avatar, avatar, avatar, avatar, avatar, avatar],
    visitorNum: 12,
    avatar: avatar
  },
  'visiting': {
    id: 'visiting',
    labels: ['太傻了', '丑', '不要脸', '不直不弯', '太萌了', '喵喵喵？你不是脱了吗'],
    visitorAvatars: [avatar, avatar, avatar, avatar, avatar, avatar],
    visitorNum: 6,
    avatar: avatar
  }
}

const users = (state = defaultUsers, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  users
})