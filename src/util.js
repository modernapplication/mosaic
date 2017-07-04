export const trig = (a1, a2, b1, b2, c1, c2) => {
  return `${a1},${a2} ${b1},${b2} ${c1},${c2}`
}

export const ran = (a, b) => Math.floor(Math.random()*(b-a+1)+a)