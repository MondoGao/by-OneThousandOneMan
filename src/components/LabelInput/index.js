import React from 'react'

import styles from './LabelInput.scss'

class LabelInput extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      inputValue: ''
    }
  }
  
  handleChange = e => {
    if (e.target.value.length < 11) {
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
  
  render() {
    const alterLabelTexts = ['家穷人丑', '要求太高', '没有选择我', '高冷']
    const alterLabels = alterLabelTexts.map((text, input) => (
      <AlternativeLabel onClick={this.handleLabelClick} key={input}>{text}</AlternativeLabel>
    ))
    
    return (
      <div className={styles['label-input-container']}>
        <p className={styles['alter-label-container']}>
          {alterLabels}
        </p>
        <div className={styles['input-wrapper']}>
          <input
            className={styles['label-input']}
            type="text"
            placeholder="来啊！输入标签啊！"
            value={this.state.inputValue}
            onChange={this.handleChange}/>
          <span/>
        </div>
      </div>
    )
  }
}

const AlternativeLabel = ({ animationDelay, children, onClick }) => {
  return (
    <span className={styles['alter-label']} onClick={onClick}>
      {children}
    </span>
  )
}

export default LabelInput