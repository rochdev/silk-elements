import assign from 'lodash/assign'

export const scale = (element, from = 0, to = 1, options) => {
  return element.animate([
    {transform: `scale(${from})`, offset: 0},
    {transform: `scale(${to})`, offset: 1}
  ], assign({
    easing: 'ease-out',
    duration: 300,
    fill: 'both'
  }, options))
}

export const fade = (element, from = 0, to = 1, options) => {
  return element.animate([
    {opacity: from, offset: 0},
    {opacity: to, offset: 1}
  ], assign({
    easing: 'ease-out',
    duration: 300,
    fill: 'both'
  }, options))
}

export const jump = (element, from = [0, 0, 0], to = [0, 0, 0], options) => {
  const frames = new KeyframeEffect(element, [
    { transform: `translate3d(${from.map(val => val + 'px').join(',')})` },
    { transform: `translate3d(${to.map(val => val + 'px').join(',')})` }
  ], assign({
    easing: 'ease-out',
    duration: 225,
    fill: 'both'
  }, options))

  return new Animation(frames, document.timeline)
}
