const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const judgeColor = num => {
  if (num >= 0 && num <= 50) {
    return 'green'
  } else if (num > 50 && num <= 100) {
    return 'yellow'
  } else if (num > 100 && num <= 150) {
    return 'orange'
  } else if (num > 150 && num <= 200) {
    return 'red'
  } else if (num > 200 && num <= 300) {
    return 'purple'
  } else if (num > 300) {
    return 'black'
  }
}

const colorCode = color => {
  if (color === 'green') {
    return '#5dd797'
  } else if (color === 'yellow') {
    return '#ffdf19'
  } else if (color === 'orange') {
    return '#ffb35b'
  } else if (color === 'red') {
    return '#ff8484'
  } else if (color === 'purple') {
    return '#ae6cdf'
  } else if (color === 'black') {
    return '#555'
  } else {
    return '#fff'
  }
}

const getTitle = label => {
  if (label === 'about') {
    return '关于Care空气'
  } else if (label === 'thank') {
    return '致谢'
  }
}

module.exports = {
  formatTime,
  judgeColor,
  colorCode,
  getTitle
}
