const copy = elem => {
    elem.select()
    document.execCommand("copy")
    document.getSelection().removeAllRanges()
}

export default {
    copy
}