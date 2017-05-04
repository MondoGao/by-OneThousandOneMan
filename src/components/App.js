import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import 'normalize.css'
import './App.css'
import 'styles/transitions.css'
import 'styles/animations.css'

import { loadingAssets, getParameterByName, getCookie, redirectToWx } from 'scripts/utils'
import loadingList from 'assets/loadingList'
import { settings } from 'sources'
import { promiseCatch } from 'sources/utils'
import * as sources from 'sources'

import UserPageContainer from 'containers/UserPageContainer'
import Loading from 'components/Loading'
import HomeContainer from 'containers/HomeContainer'
import { CSSTransitionFirstChild } from 'components/FirstChild'
import TransitionRoute from 'components/TransitionRoute'

class App extends React.Component {
  state = {
    reloadTimer: null
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.configWechat()
    }
  }
  
  componentDidMount() {
    this.authorizeHandler()
    this.configWechat()
  }
  
  /**
   * 判断四种进入状态进行反应
   */
  authorizeHandler = () => {
    let key = getCookie('key')
    let code = getParameterByName('code')
  
    if (key) {
      if (code) {
        // 有 key 有 code，证明为授权过期状态跳转回来
        this.props.login(code)
          .then(() => this.loadAssets())
      } else {
        // 有 key 无 code，尝试加载用户信息, 已确认从 lS 读取 id 后判断
        if (this.props.myself.id) {
          this.props.loadUser(this.props.myself.id)
            .then(() => this.loadAssets())
        } else {
          redirectToWx()
        }
      }
    } else if(code) {
      // 无 key 有 code，为初次加载跳转
      this.props.login(code)
        .then(() => this.loadAssets())
    }
  
    this.props.history.replace(this.props.location.pathname)
  }
  
  configWechat = () => {
    sources.jssdkConfig(window.location.href)
      .then(data => {
        wx.config({
          debug: false,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'showMenuItems']
        })
      
        wx.ready(() => {
          let params = this.props.location.pathname.match(/\/users\/([\w-]+)/)
          let userId = params && params[1]
          const myself = this.props.users[this.props.myself.id]
          let user = null
        
          let link = window.location.href
          let title = `没想到朋友们认为我单身的原因是...`
          let imgUrl = ''
          let desc = '快来发送弹幕，告诉Ta单身这么久究竟因为啥！'
        
          if (userId) {
            user = this.props.users[userId]
            if (user) {
              title = `没想到朋友们认为${user.nickname}单身的原因是...`
              imgUrl = user.headimgurl
            }
          } else if (myself) {
            link = `${link}/users/${this.props.myself.id}`.replace(/single\/{2}/, 'single\/')
            title = `没想到朋友们认为${myself.nickname}单身的原因是...`
            imgUrl = myself.headimgurl
          }
        
          wx.onMenuShareTimeline({
            title,
            link,
            imgUrl,
            success() {
              console.log('分享成功')
            }
          })
        
          wx.onMenuShareAppMessage({
            title,
            desc,
            link,
            imgUrl,
            type: 'link',
            dataUrl: '',
            success() {
              console.log('分享成功')
            }
          })
  
          wx.onMenuShareQQ({
            title,
            desc,
            link,
            imgUrl,
            success() {
              console.log('分享成功')
            }
          })
  
          wx.onMenuShareQZone({
            title,
            desc,
            link,
            imgUrl,
            success() {
              console.log('分享成功')
            }
          })
          
          wx.showMenuItems({
            menuList: [
              'menuItem:share:appMessage',
              'menuItem:share:timeline'
            ] // 要显示的菜单项，所有menu项见附录3
          })
        })
      })
  }
  
  loadNewLabels = () => {
    this.props.refreshLabels(this.props.myself.id)
    // let params = this.props.location.pathname.match(/\/users\/([\w-]+)/)
    // if (params && params[1] && params[1] !== this.props.myself.id) {
    //   this.props.refreshLabels(params[1])
    // }
  }
  
  /**
   * 确保已经有 myself.id 的情况下再调用进行加载
   */
  loadAssets = () => {
    let loadTask = [this.props.loadUser(this.props.myself.id), loadingAssets(loadingList)]
    
    let params = this.props.location.pathname.match(/\/users\/([\w-]+)/)
    if (params && params[1]) {
      loadTask.push(this.props.loadUser(params[1]))
    }
    
    return Promise.all(loadTask)
      .then(() => {
        this.props.loadingComplete()
        clearInterval(this.state.reloadTimer)
        this.setState({
          reloadTimer: setInterval(this.loadNewLabels, 15000)
        })
      })
      .catch(promiseCatch)
  }
  
  render() {
    const transitionSettings = {
      transitionName: {
        appear: 'fadeIn',
        appearActive: 'animated',
        enter: 'fadeIn',
        enterActive: 'animated',
        leave: 'fade-out-absolute',
        leaveActive: 'animated'
      },
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500,
      style: {
        animationDuration: '500ms'
      }
    }
    
    return (
      <div>
        <CSSTransitionFirstChild {...transitionSettings}>
          {this.props.isLoading ?
            <Loading key="loading" loadingComplete={this.props.loadingComplete} style={transitionSettings.style}/> : null}
        </CSSTransitionFirstChild>
        {!this.props.myself.id || this.props.isLoading ? null :
          <div>
            <TransitionRoute
              path={`${settings.publicPath}users/:id`}
              key="/users"
              transitionChildren={UserPageContainer}
              {...transitionSettings}/>
            <TransitionRoute
              exact={true}
              path={`${settings.publicPath}`}
              key="/home"
              transitionChildren={HomeContainer}
              {...transitionSettings}/>
            
            <Route
              path={`${settings.publicPath}index.html`}
              render={() => (
              <Redirect to={`${settings.publicPath}`}/>
            )}/>
            <Route
              exact
              path={`${settings.publicPath}users`} 
              render={() => (
              <Redirect to={`${settings.publicPath}`}/>
            )}/>
          </div>}
        <p className="copyright">2017© Powered by Bingyan Studio</p>
      </div>
    )
  }
}

App.defaultProps = {
  isLoading: true,
  myself: null,
  match: null,
  location: null,
  loadingComplete() {},
  loadUser() {},
  refreshMyself() {}
}

export default App