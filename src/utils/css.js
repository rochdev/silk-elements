export default (el, content) => {
  const style = document.createElement('style')
  style.innerHTML = content
  el.appendChild(style, el.firstChild)
}
