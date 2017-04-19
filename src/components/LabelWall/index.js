import React from 'react'

import styles from './LabelWall.scss'
import { removeFromArray } from 'scripts/utils'

class LabelWall extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      existLabels: [],
      clearTimers: [],
      labelPointer: 0,
      addTimer: null,
      wallRight: 0,
      wallLeft: 0
    }
  }
  
  /**
   * 检测轨道是否被占用
   * @param trackNum
   * @return {boolean}
   */
  isTrackOccupied = trackNum => {
    let flag = false
    
    Array.from(document.getElementsByClassName(styles[`track-${trackNum}`])).map(el => {
      if (el && this.state.wallRight - el.getBoundingClientRect().right < 100) {
        flag = true
      }
    })
    
    return flag
  }
  
  /**
   * 检测 label 是否已滑出视野外
   * @param label
   * @return {boolean}
   */
  isLabelFinished = label => {
    return document.getElementById('label-' + label.key).getBoundingClientRect().right - this.state.wallLeft < Number.EPSILON
  }
  
  /**
   * 删除已经滑出视野外的 label
   * @param label
   * @param timer 多次调用时的 timer
   */
  removeLabel = (label, timer) => {
    clearTimeout(label.key)
    clearTimeout(timer)
    
    if (this.isLabelFinished(label)) {
      this.setState({
        existLabels: removeFromArray(this.state.existLabels, label),
        clearTimers: removeFromArray(this.state.clearTimers, label.key, timer)
      })
    } else {
      const newTimer = setTimeout(() => this.removeLabel(label, newTimer), 5000, label)
      this.setState({
        clearTimers: this.state.clearTimers.concat(newTimer)
      })
    }
  }
  
  /**
   * 创建并插入 label
   */
  createLabel = () => {
    clearTimeout(this.state.addTimer)
    
    let trackNum = Math.round(Math.random() * 5) + 1
    let label = null
    
    for(let i = 0; i < 6 && this.isTrackOccupied(trackNum); i++) {
      if (i >= 5) {
        this.setState({
          addTimer: setTimeout(this.createLabelWrapper, Math.random() * 500 + 500)
        })
        return
      }
      trackNum = Math.round(Math.random() * 5) + 1
    }
  
    let timer = setTimeout(() => this.removeLabel(label), 5000)
  
    const labelPointer = this.state.labelPointer++
  
    if (this.state.labelPointer >= this.props.labelIds.length) {
      this.setState({
        labelPointer: 0
      })
    }
    
    label = <span
      key={timer}
      id={'label-' + timer}
      className={`${styles['label']} ${styles[`track-${trackNum}`]}`}>
      {this.props.labelIds[labelPointer]}
    </span>
    
    this.setState({
      addTimer: setTimeout(this.createLabelWrapper, Math.random() * 500 + 500),
      existLabels: this.state.existLabels.concat(label),
      clearTimers: this.state.clearTimers.concat(timer)
    })
  }
  
  createLabelWrapper = () => {
    requestAnimationFrame(this.createLabel)
  }
  
  render() {
    const hasLabel = this.props.labelIds.length > 0
    
    return (
      <div className={styles['wall-container']}>
        <div
          ref={el => this.wall = el}
          className={`${styles['wall-content']} ${hasLabel ? '' : styles['empty']}`}>
          {this.state.existLabels}
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    this.setState({
      addTimer: setTimeout(this.createLabelWrapper, Math.random() * 500 + 500),
      wallRight: this.wall.getBoundingClientRect().right,
      wallLeft: this.wall.getBoundingClientRect().left
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