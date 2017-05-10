import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import styles from './UserPage.scss'
import { settings } from 'sources'

import LabelWallContainer from 'containers/LabelWallContainer'
import Button from 'components/Button'
import RecentVisitor from 'components/RecentVisitor'
import UserAvatar from 'components/UserAvatar'
import LabelInputContainer from 'containers/LabelInputContainer'
import { CSSTransitionFirstChild } from 'components/FirstChild'

class UserPage extends React.Component {
  state = {
    isShowShare: false
  }
  
  loadUser = () => {
    if (!this.props.user) {
      this.props.loadUser(this.props.match.params.id)
        .catch(err => {
          alert('加载失败，请刷新重试')
        })
    }
  }
  
  toggleShare = () => {
    console.log(this.state)
    this.setState((prevState) => ({
      isShowShare: !prevState.isShowShare
    }))
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
              <UserAvatar className={styles['avatar']} src={this.props.user.headimgurl} bordered/>
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
                [
                  <p
                    key="tip"
                    className={styles['myself-num-tip']}
                  >
                    已有
                    <span>
                      {this.props.user.visitorNum || this.props.user.visitorHeadimgurls.length}
                      </span>
                    人来访，共收到弹幕
                    <span>
                      {this.props.user.labelNum || this.props.user.labels.length}
                    </span>
                    条
                  </p>,
                  <Button
                    key="btn"
                    className={styles['btn-myself']}
                    onClick={this.toggleShare}>
                    呼朋唤友求弹幕
                  </Button>
                ] :
                [
                  <LabelInputContainer key="input" userId={this.props.user.id}/>,
                  <Button key="btn" className={styles['btn-other']}>
                    {this.props.myself.hasWall ?
                      <Link to={`${settings.publicPath}users/${this.props.myself.id}`}>查看我的弹幕墙</Link> :
                      <Link to={`${settings.publicPath}`}>我也要建弹幕墙</Link>}
                  </Button>
                ]
              }
              <RecentVisitor visitorAvatarSrcs={this.props.user.visitorHeadimgurls}
                             visitorNum={this.props.user.visitorNum}/>
            </section>
          </CSSTransitionFirstChild>
        </div>
        <div className={`${styles['share']} ${this.state.isShowShare ? styles['show'] : ''}`} onClick={this.toggleShare}>
          <div>
            让朋友来这贴弹幕<br/>
            或许他们更懂你
          </div>
        </div>
      </CSSTransitionGroup>
    )
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.user) {
      document.title = `${this.props.user.nickname}的单身原因`
      if (this.props.myself.id !== this.props.user.id) {
        this.props.appendVisitor(this.props.user.id, this.props.myself.id)
      }
    }
    
    if (prevProps.user) {
      if (prevProps.user.id !== this.props.user.id) {
        this.props.loadUser(this.props.user.id)
          .then(() => document.title = `${this.props.user.nickname}的单身原因`)
      }
      if (prevProps.user.id !== this.props.user.id && this.props.myself.id !== this.props.user.id) {
        this.props.appendVisitor(this.props.user.id, this.props.myself.id)
      }
    }
  }
  
  componentDidMount() {
    if (!this.props.user) {
      this.props.loadUser(this.props.match.params.id)
    } else {
      document.title = `${this.props.user.nickname}的单身原因`
      if (this.props.myself.id !== this.props.user.id) {
        this.props.appendVisitor(this.props.user.id, this.props.myself.id)
      }
    }
  }
  
  componentWillUnmount() {
    document.title = '一千个单身理由'
  }
}

UserPage.defaultProps = {
  user: null,
  myself: null,
  loadUser() {},
  appendVisitor() {}
}

export default UserPage