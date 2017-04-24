import React from 'react'

import styles from './LabelInput.scss'

class LabelInput extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      inputValue: '',
      isDisabled: false
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
    this.setState({
      inputValue: e.target.innerText
    })
  }
  
  handleKeyPress = e => {
    if (e.key === 'Enter' && this.state.inputValue.length > 0) {
      this.handleSubmit()
    }
  }
  
  handleSubmit = () => {
    this.setState({
      isDisabled: true
    })
    this.props.appendNewLabel(this.props.user.id, this.state.inputValue)
      .then(() => {
        this.setState(prevState => ({
          inputValue: '',
          isDisabled: false
        }))
      })
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
    
    return (
      <div className={`${styles['label-input-container']} ${this.state.isDisabled ? styles['disabled'] : ''}`}>
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
            disabled={this.state.isDisabled}
          />
          <span onClick={this.handleSubmit}/>
        </div>
      </div>
    )
  }
}

LabelInput.defaultProps = {
  user: null
}

const AlternativeLabel = ({ animationDelay, children = null, onClick, active = false }) => {
  return (
    <span className={`${styles['alter-label']} ${active ? styles['active'] : ''}`} onClick={onClick}>
      {children}
    </span>
  )
}

export default LabelInput