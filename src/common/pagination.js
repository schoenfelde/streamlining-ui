export default class Pagination {
  constructor(fetch, numberOnPage, maxNumberOfEntries) {
    this.data =[]
    this.fetch = fetch
    this.numberOnPage = numberOnPage
  }

  fromTo(from, to) {
    return this.data.slice(from, to)
  }

  getData(page) {
    return new Promise((resolver, rejector) => {
      let start = (page - 1) * this.numberOnPage
      let end = start + this.numberOnPage
      let pageIsInData = this.fromTo(start, end)
      if (this.hasNoNulls(pageIsInData)) {
        resolver(pageIsInData)
      } else {
        let data = this.fetch(this.numberOnPage)
        this.pushUntilStart(start)
        this.data.push.apply(this.data, data)
        resolver(data)
      }
    })
  }

  remove(id) {
    let index = this.data.findIndex((obj) => {
      return obj.id === id
    })
    this.data.splice(index, 1)
  }

  hasNoNulls(data) {
    if (data.length > 0) {
      return data.reduce((tf, d) => tf = tf && d !== null)
    } else {
      return false
    }
  }

  pushUntilStart(start) {
    for (let i = this.data.length; i < start; i++) {
      this.data.push(null)
    }
  }
}
