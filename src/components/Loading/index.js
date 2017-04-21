import React from 'react'
import { CSSTransitionFirstChild } from 'components/FirstChild'

import styles from './Loading.scss'

class Loading extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isRock: false,
      ellipsisNum: 0,
      timer: null
    }
  }
  
  handleClick = (e) => {
    this.setState(prevState => ({
      isRock: !prevState.isRock
    }))
  }
  
  toggleLoadingEllipsis = () => {
    this.setState(prevState => ({
      ellipsisNum: (prevState.ellipsisNum + 1) % 4
    }))
  }
  
  render() {
    let ellipsis = ''
    for (let i = 0; i < this.state.ellipsisNum; i++) {
      ellipsis += '.'
    }
    
    return (
      <div className={styles['loading']}>
        <section className={styles['heart-wrapper']}>
          <FloatHeart animationDelay={100}/>
          <FloatHeart animationDelay={750}/>
          <FloatHeart animationDelay={400}/>
        </section>
        <section>
        <span
          className={`${styles['hand']} ${this.state.isRock ? styles['rock'] : ''}`}
          onClick={this.handleClick}/>
          <p className={styles['tip']}>
            「华科脱单」玩命加载中{ellipsis}
          </p>
        </section>
      </div>
    )
  }
  
  componentDidMount() {
    this.setState({
      timer: setInterval(this.toggleLoadingEllipsis, 300)
    })
  }
  
  componentWillUnmount() {
    clearInterval(this.state.timer)
  }
}

const FloatHeart = ({ animationDelay = 0 }) => {
  return (
    <span
      className={styles['float-heart']}
      style={{animationDelay: animationDelay + 'ms'}}/>
  )
}

export default Loading