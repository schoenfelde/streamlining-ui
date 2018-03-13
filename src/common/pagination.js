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
      this.recursiveDataGetter(resolver, pageIsInData, start, end)
    })
  }

  recursiveDataGetter(resolver, pageIsInData, start, end) {
    let hasNoNulls = this.hasNoNulls(pageIsInData)
    let lengthIslargerThanEnd = this.data.length > end
    if (hasNoNulls && this.containsAFullPage(pageIsInData)) {
      resolver(pageIsInData)
    } else if (!this.containsAFullPage(pageIsInData) && hasNoNulls && lengthIslargerThanEnd) {
      end++
      pageIsInData = this.fromTo(start, end)
      this.recursiveDataGetter(resolver, pageIsInData, start, end)
    } else {
      let data = this.fetch(this.numberOnPage)
      this.pushUntilStart(start)
      let current = 0
      for(let i = start; i <= end; i++) {
        if (this.data[i] === null) {
          this.data[i] = data[current]
          current++
        }
      }
      this.data.push.apply(this.data, data)
      resolver(this.data.slice(start, end))
    }
  }

  containsAFullPage(list) {
    return list.length === this.numberOnPage
  }

  remove(id) {
    let index = this.data.findIndex((obj) => {
      return obj !== null && obj.id === id
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
