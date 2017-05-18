import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import styles from './UserPage.scss'
import { settings } from 'sources'
import { trackEvent } from 'scripts/utils'

import imgGuideFace from 'assets/guide-face@2x.png'

import LabelWallContainer from 'containers/LabelWallContainer'
import Button from 'components/Button'
import RecentVisitor from 'components/RecentVisitor'
import UserAvatar from 'components/UserAvatar'
import LabelInputContainer from 'containers/LabelInputContainer'
import { CSSTransitionFirstChild } from 'components/FirstChild'
import Popup from 'components/Popup'

class UserPage extends React.Component {
  state = {
    isShowShare: false,
    isShowGuide: false
  }
  
  toggleShare = () => {
    this.setState((prevState) => ({
      isShowShare: !prevState.isShowShare
    }))
  }
  
  handleCheatClick = e => {
    e.preventDefault()
    const href = e.target.href
    
    trackEvent(this.props.myself.id, '脱单秘籍单击', '', this.props.myself.id)
    
    setTimeout(() => window.location.href = href, 500)
  }
  
  handleGuideLinkClick = e => {
    e.preventDefault()
    const href = e.target.href
  
    trackEvent(this.props.myself.id, '戳这里点击', '', this.props.myself.id)
  
    setTimeout(() => window.location.href = href, 500)
  }
  
  handleGuideClick = e => {
    this.setState(prevState => ({
      isShowGuide: !prevState.isShowGuide
    }))
    
    trackEvent(this.props.myself.id, '引流提示单击', '', this.props.myself.id)
  }
  
  handleGuideCloseClick = e => {
    this.setState(prevState => ({
      isShowGuide: !prevState.isShowGuide
    }))
    
    trackEvent(this.props.myself.id, '引流提示关闭', '', this.props.myself.id)
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
                    onClick={this.toggleShare}
                    onCheatClick={this.handleCheatClick}
                  >
                    呼朋唤友求弹幕
                  </Button>,
                  <p className={styles['guide-tip']} onClick={this.handleGuideClick}>
                    <span className={styles['guide-tip-text']}>想知道这些弹幕来自谁？戳这里有提示</span>
                    {this.state.isShowGuide ?
                      <Popup
                        className={styles['popup']}
                        onClose={this.handleGuideCloseClick}
                      >
                        <img className={styles['guide-face']} src={imgGuideFace} alt="爱你"/>
                        <div className={styles['stars-wrapper']}>
                          <span className={styles['big']}/>
                          <span className={styles['little']}/>
                        </div>
                        <p className={styles['guide-p']}>
                          戳
                          <a
                            className={styles['guide-link']}
                            href={settings.wechatHref}
                            onClick={this.handleGuideLinkClick}>
                            这里
                          </a>
                          关注华科脱单
                        </p>
                        <p className={styles['guide-p']}>
                          后台回复【单身理由】获取提示彩蛋
                        </p>
                      </Popup> : null}
                  </p>
                ] :
                [
                  <LabelInputContainer key="input" userId={this.props.user.id}/>,
                  <Button
                    key="btn"
                    className={styles['btn-other']}
                    onCheatClick={this.handleCheatClick}
                  >
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
  
  componentDidMount() {
    document.title = `${this.props.user.nickname}的单身原因`
    
    if (this.props.myself.id !== this.props.user.id) {
      this.props.appendVisitor(this.props.user.id, this.props.myself.id)
    }
  }
  
  componentDidUpdate() {
    if (!this.props.user) {
      window.location.reload()
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