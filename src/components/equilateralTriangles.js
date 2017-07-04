import { ran } from '~/src/util'

const triangulate = (i, s, col, row) => {
  const h = s/2
  const x = col*h
  const xh = x+h
  const x1 = xh+h
  const xh1 = xh+h
  const y = row*s
  const y1 = (row+1)*s
  if (row % 2 === 0)
    return i % 2 === 0
      ? `${x},${y} ${xh},${y1} ${x1},${y}`
      : `${x},${y1} ${xh},${y} ${x1},${y1}`
  else
    return i % 2 === 0
      ? `${x},${y1} ${xh},${y} ${x1},${y1}`
      : `${x},${y} ${xh},${y1} ${x1},${y}`
}

export class EquilateralTriangles {
  constructor(config) {
    this.config = this.calc(config)
    this.svg()
    setTimeout(this.draw.bind(this), 1000)
  }
  calc(config) {
    const w = window.innerWidth
    const h = window.innerHeight
    const cols = (Math.ceil(w / config.size) * 2)
    const rows = Math.ceil(h / config.size)
    return {
      ...config,
      cols,
      rows,
      w,
      h,
      total: cols * rows 
    }
  }
  svg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const left = `left: -${this.config.size/2}px !important;`
    const width = `width: calc(100% + ${this.config.size/2})`
    svg.id = 'svg'
    // svg.setAttribute('style', `${left} ${width}`)
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")
    this.config.mount.appendChild(svg)
    this.svg = svg
  }
  draw() {
    new Array(this.config.total)
      .fill(0)
      .reduce((acc, e, i) => ({
        col: i % this.config.cols,
        row: acc.col === this.config.cols - 2 ? acc.row + 1 : acc.row,
        els: [
          ...acc.els,
          { i, points: triangulate(i, this.config.size, acc.col, acc.row), col: acc.col, row: acc.row, ran: ran(0, this.config.ran) }
        ]
      }), {row: 0, col: 0, els: []})
      .els
      .forEach(this.polygon.bind(this))
  }
  polygon(el) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon')
    polygon.setAttribute('data-ran', el.ran)
    polygon.setAttribute('data-row', el.row)
    polygon.setAttribute('data-col', el.col)
    polygon.setAttribute('points', el.points)
    this.svg.appendChild(polygon)
  }
}