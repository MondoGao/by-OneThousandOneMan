import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import styles from './UserPage.scss'

import LabelWall from 'components/LabelWall'
import Button from 'components/Button'
import RecentVisitor from 'components/RecentVisitor'
import UserAvatar from 'components/UserAvatar'
import LabelInputContainer from 'containers/LabelInputContainer'
import { CSSTransitionFirstChild } from 'components/FirstChild'

class UserPage extends React.Component {
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
              <LabelWall labels={this.props.user.labels}/>
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
                <Button className={styles['btn-myself']}>呼朋唤友求标签</Button> :
                [
                  <LabelInputContainer key="input" user={this.props.user}/>,
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
  
  componentDidMount() {
    if (!this.props.user) {
      this.props.loadUser()
        .catch(err => {
          alert('加载失败，请刷新重试')
        })
    }
  }
}

UserPage.defaultProps = {
  user: null,
  myself: null,
  loadUser() {}
}

export default UserPage