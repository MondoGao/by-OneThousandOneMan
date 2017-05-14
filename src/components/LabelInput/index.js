import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import styles from './LabelInput.scss'
import labels from 'sources/labels'
import { trackEvent } from 'scripts/utils'

class LabelInput extends React.Component {
  getAlterLabels = () => {
    const isLong = Math.random() > .5
    const labelNum = isLong ? 2 : 4
    const realLabels = labels[isLong ? 'long' : 'short']
    let labelIndexs = []
    
    while (labelIndexs.length < labelNum) {
      let index = Math.round(Math.random() * (realLabels.length - 1))
      if (!labelIndexs.includes(index)) {
        labelIndexs.push(index)
      }
    }
    
    return labelIndexs.map(index => realLabels[index])
  }
  
  state = {
    inputValue: '',
    isLoading: false,
    isRefreshCooling: false,
    timer: null,
    alterLabels: this.getAlterLabels(),
    sentNum: 0,
  }
  
  handleChange = e => {
    if (e.target.value.length < 16) {
      this.setState({
        inputValue: e.target.value
      })
    }
  }
  
  handleLabelClick = e => {
    if (!this.state.isLoading) {
      this.setState({
        inputValue: e.target.innerText
      })
      trackEvent(this.props.myselfId, '预设标签单击', '', this.props.myselfId)
    }
  }
  
  handleKeyPress = e => {
    if (e.key === 'Enter' && this.state.inputValue.length > 0) {
      this.handleSubmit()
    }
  }
  
  handleSubmit = () => {
    if (this.state.inputValue.length <= 0) {
      alert('不要发空气炮啦输一点弹幕吧！')
    }
    else if (!this.state.isLoading) {
      this.setState(prevState => ({
        isLoading: true,
        sentNum: prevState.sentNum + 1
      }))
      this.props.appendNewLabel(this.props.userId, this.props.myselfId, this.state.inputValue)
        .then(() => {
          this.setState(prevState => ({
            inputValue: '',
            isLoading: false
          }))
        })
        .catch(() => {
          alert("发送标签失败啦？是不是有什么奇怪的东西？？")
          this.setState(prevState => ({
            isLoading: false
          }))
        })
    }
  }
  
  handleRefreshClick = e => {
    if (!this.state.isRefreshCooling) {
      this.setState({
        alterLabels: this.getAlterLabels(),
        isRefreshCooling: true,
        timer: setTimeout(this.refreshButtonReload, 800)
      })
      trackEvent(this.props.myselfId, '刷新预设标签按钮单击', '', this.props.myselfId)
    }
  }
  
  refreshButtonReload = () => {
    if (this.state.isRefreshCooling) {
      this.setState({
        isRefreshCooling: false
      })
    }
  }
  
  render() {
    const alterLabels = this.state.alterLabels.map((text, index) => (
      <AlternativeLabel
        active={text === this.state.inputValue}
        onClick={this.handleLabelClick}
        key={text + index}
        isLong={this.state.alterLabels.length < 3}
      >
        {text}
      </AlternativeLabel>
    ))
    
    let loadingSpinArr = []
    for (let i = 1; i <= 12; ++i) {
      loadingSpinArr.push(<div key={i} className={`${styles['circle']} ${styles['circle' + i] ? styles['circle' + i] : ''}`}/>)
    }
  
    const transitionSettings = {
      transitionName: {
        appear: 'fadeInDown',
        appearActive: 'animated',
        enter: 'fadeInDown',
        enterActive: 'animated'
      },
      transitionAppear: true,
      transitionAppearTimeout: 800,
      transitionEnterTimeout: 800,
      transitionLeave: false,
      style: {
        animationDuration: '500ms'
      }
    }
    
    return (
      <div className={`${styles['label-input-container']} ${this.state.isLoading ? styles['loading'] : ''}`}>
        <CSSTransitionGroup
          {...transitionSettings}
          component="p"
          className={styles['alter-label-container']}
        >
          {alterLabels}
          <span
            className={`${styles['refresh-labels']} ${this.state.isRefreshCooling ? styels['cooling'] : ''}`}
            onClick={this.handleRefreshClick}
          />
        </CSSTransitionGroup>
        <div className={styles['input-wrapper']}>
          <input
            className={styles['label-input']}
            type="text"
            placeholder="快告诉TA为什么单身吧~"
            value={this.state.inputValue}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            disabled={this.state.isLoading}
          />
          <span onClick={this.handleSubmit}>
            <span className={`${styles['ok-loading']}`}>
              {loadingSpinArr}
            </span>
          </span>
        </div>
      </div>
    )
  }
}

LabelInput.defaultProps = {
  userId: null
}

const AlternativeLabel = ({ animationDelay, children = null, onClick, active = false, isLong = false }) => {
  return (
    <span className={`${styles['alter-label']} ${active ? styles['active'] : ''} ${isLong ? styles['long'] : ''}`} onClick={onClick}>
      {children}
    </span>
  )
}

export default LabelInput