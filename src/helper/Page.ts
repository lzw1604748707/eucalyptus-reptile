export default class Page {
  private index: number = 0
  private size: number = 0
  private total: number = 0
  constructor(index: number, size: number, total: number) {
    this.index = index
    this.size = size
    this.total = total
  }

  /** 取赋值拦截 **/
  set pageIndex(index: number) {
    this.index = index
  }
  get pageIndex() {
    return this.index
  }
  set pageSize(size: number) {
    this.size = size
  }
  get pageSize() {
    return this.size
  }
  set pageTotal(total: number) {
    this.total = total
  }
  get pageTotal() {
    return this.total
  }

  /** 方法 **/
  getCurrentCount() {
    return this.index * this.size
  }
  isLastPage() {
    return this.total <= this.getCurrentCount()
  }
  nextPage() {
    ++this.index
  }
  goFirstPage() {
    this.index = 1
  }
}
