import {dateFormat} from '../utils/util'

exports.datetime = (value) => {
  if (value) {
    let date = new Date(value)
    value = dateFormat(date, 'yyyy-MM-dd hh:mm')
  }
  return value
}

exports.html2text = (value) => {
  if (value) {
    value = value.replace(/<[^>]*>/g, '')
  }
  return value
}

exports.substr = (value, start, length) => {
  if (value) {
    value = value.substr(start, length)
  }
  return value
}

exports.maxlength = (value, length, ellipsis) => {
  if (value) {
    if (value.length > length) {
      value = value.substr(0, length)
      if (ellipsis) value += '...'
    }
  }
  return value
}
