import * as CSV from 'csv-string'

export default {
  fetch(text) {
    return CSV.parse(currentText)
  },
  isMatch(text) {
    return true
  }
}
