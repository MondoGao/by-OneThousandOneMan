import React from 'react'
import 'normalize.css'
import './App.css'
import 'styles/transitions.css'
import 'styles/animations.css'

import { loadingAssets, getParameterByName } from 'scripts/utils'
import loadingList from 'assets/loadingList'
import { settings } from 'sources/index'
import * as sources from 'sources'

import UserPageContainer from 'containers/UserPageContainer'
import Loading from 'components/Loading'
import HomeContainer from 'containers/HomeContainer'
import { CSSTransitionFirstChild } from 'components/FirstChild'
import TransitionRoute from 'components/TransitionRoute'

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.configWechat()
    }
  }
  
  componentDidMount() {
    this.configWechat()
    if (!this.props.myself.id) {
      let code = getParameterByName('code')
      if (!code) {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${settings.appId}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=${settings.scope}&state=STATE#wechat_redirect`
      } else {
        this.props.login(code)
          .then(() => {
            this.props.history.replace(window.location.pathname)
          })
          .catch(() => {
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${settings.appId}&redirect_uri=${encodeURIComponent(window.location.href.replace(/\?.*/, ''))}&response_type=code&scope=${settings.scope}&state=STATE#wechat_redirect`
          })
      }
    } else {
      this.loadAssets()
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.myself.id !== this.props.myself.id && this.props.myself.id) {
      this.loadAssets()
    }
  }
  
  configWechat() {
    sources.jssdkConfig(window.location.href)
      .then(data => {
        wx.config({
          debug: false,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: ['onMenuShareTimeline']
        })
      })
  }
  
  loadAssets = () => {
    this.props.loadUser(this.props.myself.id)
      .then(() => {
        let params = this.props.location.pathname.match(/\/users\/([\w-]+)/)
        console.log(params)
        if (params && params[1]) {
          return this.props.loadUser(params[1])
        }
      })
      .then(() => {
        return loadingAssets(loadingList)
      })
      .then(() => {
        this.props.loadingComplete()
      })
      .catch(err => {
        console.log(err)
        alert('加载失败，请刷新重试')
      })
  }
  
  render() {
    if (!this.props.myself.id) {
      return null
    }
    
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
        {this.props.isLoading ? null :
          <div>
            <TransitionRoute
              path="/users/:id"
              key="/users"
              transitionChildren={UserPageContainer}
              {...transitionSettings}/>
            <TransitionRoute
              exact={true}
              path="/"
              key="/home"
              transitionChildren={HomeContainer}
              {...transitionSettings}/>
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