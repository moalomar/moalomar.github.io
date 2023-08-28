const INPUT = document.querySelector('input')
const PARAGRAPH = document.querySelector('p')
const SPAN = document.querySelector('span')

function cipher(BUTTON) {

    event.preventDefault()
    active(BUTTON)

    let mode = BUTTON.innerText
    let message = INPUT.value
    let output = ''

    if (message.length < 1) output = 'write :('

    else if (mode === 'ENCODE') {
        for (let char of message) {
            let R = Math.floor(Math.random() * (9999 - 999 + 1)) + 999
            output += String.fromCharCode(char.charCodeAt(0) + R)
            output += String.fromCharCode(R)
        }
    }

    else if (mode === 'DECODE' && message.length % 2 === 0) {
        for (let i = 0; i < message.length; i += 2) {
            let R = message.charCodeAt(i + 1)
            output += String.fromCharCode(message.charCodeAt(i) - R);
        }
    }

    else output = '💀 ERROR 💀'

    SPAN.textContent = output

    PARAGRAPH.style.animation = 'none'
    requestAnimationFrame(() => PARAGRAPH.style.animation = 'fade .75s')

}

function copy(BUTTON) {

    active(BUTTON)

    SPAN.style.animation = 'none'
    requestAnimationFrame(() => SPAN.style.animation = 'highlight .75s')

    window.getSelection().selectAllChildren(SPAN)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()

}

function active(BUTTON) {

    // css button:active isn't friendly with touch screens

    let css = BUTTON.style
    let temp = css.boxShadow

    css.boxShadow = 'none'
    css.transform = 'translateY(.125rem)'

    setTimeout(() => {css.boxShadow = temp; css.transform = ''}, 125)

}