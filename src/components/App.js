import React from 'react'
import 'normalize.css'
import './App.css'
import 'styles/transitions.css'
import 'styles/animations.css'

import { loadingAssets } from 'scripts/utils'
import loadingList from 'assets/loadingList'

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
    this.loadAssets()
  }
  
  configWechat() {
    console.log('reconfig wx')
  }
  
  loadAssets = () => {
    this.props.loadUser(this.props.myself.id)
      .then(() => {
        let params = this.props.location.pathname.match(/\/users\/(\w+)/)
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
  loadUser() {}
}

export default App