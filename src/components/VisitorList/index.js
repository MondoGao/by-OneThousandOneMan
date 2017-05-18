import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import styles from './VisitorList.scss'
import { settings, getVisitorList } from 'sources'
import imgLoveCrown from 'assets/love-crown@2x.png'

const VisitorList = ({ match }) => {
  return (
    <div className={styles['board']}>
      <div className={styles['wrapper']}>
        <Switch>
          <Route path={`${match.url}/top/:token`} component={Lovers}/>
          <Route path={`${match.url}/list/:token`} component={Visitors}/>
          <Route render={() => <Redirect to={settings.publicPath}/>}/>
        </Switch>
      </div>
    </div>
  )
}

const Title = () => {
  return (
    <div className={styles['title']}/>
  )
}

class Visitors extends React.Component {
  state = {
    list: []
  }
  
  componentDidMount() {
    getVisitorList(localStorage.getItem('myselfId'), this.props.match.params.token)
      .then(data => {
        this.setState({
          list: data
        })
      })
  }
  
  render() {
    if (this.state.list.length < 1) {
      return null
    }
    
    return (
      <div className={styles['visitors']}>
        <Title/>
        {this.state.list.map(user => <p>{user.nickname}</p>)}
      </div>
    )
  }
}

class Lovers extends React.Component {
  state = {
    list: []
  }
  
  componentDidMount() {
    getVisitorList(localStorage.getItem('myselfId'), this.props.match.params.token, 2)
      .then(data => {
        this.setState({
          list: data
        })
      })
  }
  
  render() {
    if (this.state.list.length < 1) {
      return null
    }
    
    return (
      <div className={styles['lovers']}>
        <Title/>
        {this.state.list.map(user => <div>
          <img src={imgLoveCrown} alt="王冠"/>
          <p className={styles['nickname']}>{user.nickname}</p>
          <p className={styles['label-num']}>发送弹幕<span>{user.labelNum}</span>条</p>
        </div>)}
      </div>
    )
  }
}

export default VisitorList