export const scale = (element, from = 0, to = 1) => {
  return element.animate([
    {transform: `scale(${from})`, offset: 0},
    {transform: `scale(${to})`, offset: 1}
  ], {
    easing: 'ease-out',
    duration: 225,
    fill: 'both'
  })
}

export const fade = (element, from = 0, to = 1) => {
  return element.animate([
    {opacity: from, offset: 0},
    {opacity: to, offset: 1}
  ], {
    easing: 'ease-out',
    duration: 450,
    fill: 'both'
  })
}
