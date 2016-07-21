export default (el, content) => {
  const style = document.createElement('style')

  if (document.head.createShadowRoot) {
    // native :host selector
    style.innerHTML = content
  } else {
    // polyfill :host selector
    const tagName = (el.host || el).tagName.toLowerCase()
    style.innerHTML = content.replace(/(:host)(\((.*)\))?/gi, `${tagName}$3`)
  }

  el.appendChild(style, el.firstChild)
}
