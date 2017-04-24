import React from 'react'

import styles from './LabelInput.scss'

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
      alert('不要发空气炮啦输一点标签吧！')
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
    }
  }
  
  render() {
    const alterLabelTexts = ['家穷人丑', '要求太高', '没有选择我', '高冷']
    const alterLabels = alterLabelTexts.map((text, input) => (
      <AlternativeLabel
        active={text === this.state.inputValue}
        onClick={this.handleLabelClick}
        key={input}
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
            placeholder="来啊！输入标签啊！"
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

const AlternativeLabel = ({ animationDelay, children = null, onClick, active = false }) => {
  return (
    <span className={`${styles['alter-label']} ${active ? styles['active'] : ''}`} onClick={onClick}>
      {children}
    </span>
  )
}

export default LabelInput