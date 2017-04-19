import React from 'react'

import styles from './LabelWall.scss'

class LabelWall extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      existLabels: [],
      clearTimers: [],
      labelPointer: 0,
      addTimer: null,
    }
  }
  
  createLabel = () => {
    clearTimeout(this.state.addTimer)
    
    const labelPointer = this.state.labelPointer++
    
    if (this.state.labelPointer >= this.props.labelIds.length) {
      this.setState({
        labelPointer: 0
      })
    }
    
    const trackNum = Math.round(Math.random() * 5) + 1
  
    let timer = setTimeout(() => {
      clearTimeout(timer)

      this.setState({
        existLabels: this.state.existLabels.filter(existLabel => existLabel !== label),
        clearTimers: this.state.clearTimers.filter(clearTimer => clearTimer !== timer)
      })
    }, 5000)
    
    let label = <span
      key={timer}
      className={`${styles['label']} ${styles[`track-${trackNum}`]}`}>
      {this.props.labelIds[labelPointer]}
    </span>
    
    this.setState({
      existLabels: [
        ...this.state.existLabels,
        label
      ],
      clearTimers: [
        ...this.state.clearTimers,
        timer
      ]
    })
    
    this.setState({
      addTimer: setTimeout(this.createLabel, Math.random() * 500 + 500)
    })
  }
  
  render() {
    const hasLabel = this.props.labelIds.length > 0
    
    return (
      <div className={styles['wall-container']}>
        <div className={`${styles['wall-content']} ${hasLabel ? '' : styles['empty']}`}>
          {this.state.existLabels}
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    this.setState({
      addTimer: setTimeout(this.createLabel, Math.random() * 500 + 500)
    })
  }
  
  componentWillUnmount() {
    clearTimeout(this.state.addTimer)
    this.state.clearTimers.map(timer => clearTimeout(timer))
  }
}

const Label = ({ text }) => {
  return (
    <span className={styles['label']}>{text}</span>
  )
}

LabelWall.defaultProps = {
  labelIds: ['要求太高了', '心疼我家的傻儿子！！！', '没有选择我', '单身2017', '等着我脱单后你再脱']
}

export default LabelWall