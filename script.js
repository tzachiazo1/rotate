const paths = (window.location.search || 'M0 0 Q50 50 100 0|M0 100 Q50 50 100 100').split('|').map(s => s.replace(/[?,]/g, ' '))
const range = n => [...Array(n)].map((v, i) => i)
const randomFromArray = arr => arr[(Math.random() * arr.length)|0]
const rotate = style => style.transform = style.transform.replace(/\d+/, n => + n + 90)
const arcToPath = arc => `<path d="${arc}" stroke=black fill="transparent"/>`
const createSvg = arcs => `<svg width=100 viewBox=0,0,100,100 style=transform:rotate(0deg)>${arcs.map(arcToPath).join('')}</svg>`
const square = on => createSvg(on ? paths : [])
const td = on => `<td>${square(on)}</td>`
const tr = (pairity, c) => `<tr>${range(c).map(i => td(i % 2 === pairity)).join('')}</tr>`
const table = (r, c) => `<table>${range(r).map(i => tr(i % 2, c)).join('')}</table>`
const resize = _ => {
    const { style, offsetHeight, offsetWidth } = document.querySelector('table')
    style.top = (window.innerHeight - offsetHeight) / 2
    style.left = (window.innerWidth - offsetWidth) / 2
}
const [r, c] = [30, 30]
document.body.innerHTML = table(r, c)
window.onresize = window.onload = resize
const images = [...document.querySelectorAll('svg:nth-child(odd)')]
window.onkeyup = event => window.freeze ^= (event.code === 'Space')
images.forEach(img => { img.onclick = _ => { rotate(img.style) } })
setInterval(_ => window.freeze ? 0 : rotate(randomFromArray(images).style), 10000 / (r * c))
