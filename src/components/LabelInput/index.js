import React from 'react'

import styles from './LabelInput.scss'
import labels from 'sources/labels'

class LabelInput extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      inputValue: '',
      isLoading: false,
      timer: null
    }
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
      this.setState({
        isLoading: true
      })
      this.props.appendNewLabel(this.props.userId, this.state.inputValue)
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
  
  getAlterLabels = (() => {
    const isLong = Math.random() > .5
    const labelNum = isLong ? 2 : 4
    let labelIndexs = []
    const realLabels = labels[isLong ? 'long' : 'short']
    
    while (labelIndexs.length < labelNum) {
      let index = Math.round(Math.random() * (realLabels.length - 1))
      if (!labelIndexs.includes(index)) {
        labelIndexs.push(index)
      }
    }
    
    return () => {
      return labelIndexs.map(index => realLabels[index])
    }
  })()
  
  render() {
    const alterLabelTexts = this.getAlterLabels()
    const alterLabels = alterLabelTexts.map((text, input) => (
      <AlternativeLabel
        active={text === this.state.inputValue}
        onClick={this.handleLabelClick}
        key={input}
        isLong={alterLabelTexts.length < 3}
      >
        {text}
      </AlternativeLabel>
    ))
    
    let loadingSpinArr = []
    for (let i = 1; i <= 12; ++i) {
      loadingSpinArr.push(<div key={i} className={`${styles['circle']} ${styles['circle' + i] ? styles['circle' + i] : ''}`}/>)
    }
    
    return (
      <div className={`${styles['label-input-container']} ${this.state.isLoading ? styles['loading'] : ''}`}>
        <p className={styles['alter-label-container']}>
          {alterLabels}
        </p>
        <div className={styles['input-wrapper']}>
          <input
            className={styles['label-input']}
            type="text"
            placeholder="来啊！输入弹幕啊！"
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