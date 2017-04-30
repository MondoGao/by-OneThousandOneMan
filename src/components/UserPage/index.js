import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import styles from './UserPage.scss'

import LabelWallContainer from 'containers/LabelWallContainer'
import Button from 'components/Button'
import RecentVisitor from 'components/RecentVisitor'
import UserAvatar from 'components/UserAvatar'
import LabelInputContainer from 'containers/LabelInputContainer'
import { CSSTransitionFirstChild } from 'components/FirstChild'

class UserPage extends React.Component {
  loadUser = () => {
    if (!this.props.user) {
      this.props.loadUser(this.props.match.params.id)
        .catch(err => {
          alert('加载失败，请刷新重试')
        })
    }
  }
  
  handleShare = e => {
    wx.onMenuShareTimeline({
      title: '请告诉我我为什么还单身好吗!!!', // 分享标题
      link: `${window.location.origin}/users/${this.props.myself.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      success: function () {
        console.log('分享成功')
      }
    })
  }
  
  render() {
    if (!this.props.user) {
      return null
    }
    
    let isMyself = this.props.myself.id === this.props.user.id
    
    const transitionSettings = {
      transitionAppear: true,
      transitionAppearTimeout: 1300,
      transitionEnter: false,
      transitionLeave: false,
      style: {
        animationDelay: '300ms'
      }
    }
    
    return (
      <CSSTransitionGroup
        transitionName={{
          leave: 'fade-out-absolute',
          leaveActive: 'animated'
        }}
        transitionEnter={false}
        transitionLeaveTimeout={500}
        component="div"
        className={styles['user-page']}
        style={this.props.style}
      >
        <div key={this.props.user.id} style={{
          animationDuration: '500ms'
        }}>
          <CSSTransitionFirstChild
            {...transitionSettings}
            transitionName={{
              appear: 'bounceInDown',
              appearActive: 'animated'
            }}>
            <section style={transitionSettings.style}>
              <UserAvatar className={styles['avatar']} src={this.props.user.avatar} bordered/>
              <LabelWallContainer user={this.props.user}/>
            </section>
          </CSSTransitionFirstChild>
          <CSSTransitionFirstChild
            {...transitionSettings}
            transitionName={{
              appear: 'zoomIn',
              appearActive: 'animated'
            }}>
            <section style={transitionSettings.style}>
              {isMyself ?
                <Button className={styles['btn-myself']} onClick={this.handleShare}>呼朋唤友求标签</Button> :
                [
                  <LabelInputContainer key="input" userId={this.props.user.id}/>,
                  <Button key="btn" className={styles['btn-other']}>
                    {this.props.myself.hasWall ?
                      <Link to={`/users/${this.props.myself.id}`}>查看我的标签墙</Link> :
                      <Link to={'/'}>我也要建标签墙</Link>}
                  </Button>
                ]
              }
              <RecentVisitor visitorAvatarSrcs={this.props.user.visitorAvatars}
                             visitorNum={this.props.user.visitorNum}/>
            </section>
          </CSSTransitionFirstChild>
        </div>
      </CSSTransitionGroup>
    )
  }
  
  componentDidUpdate() {
    this.loadUser()
    if (this.props.myself.id !== this.props.user.id) {
      this.props.appendVisitor(this.props.user.id)
    }
  }
  
  componentDidMount() {
    this.loadUser()
    if (this.props.myself.id !== this.props.user.id) {
      this.props.appendVisitor(this.props.user.id)
    }
  }
}

UserPage.defaultProps = {
  user: null,
  myself: null,
  loadUser() {},
  appendVisitor() {}
}

export default UserPage