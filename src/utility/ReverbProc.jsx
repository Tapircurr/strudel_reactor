export function ReverbProc(inputText, reverb) {
    let out = inputText

    //select .room() and target what's in the brackets
    //Accounting for some bullcrap like say sine.range(0.1,0.4) being inside of a .room() *suffering noises*
    let regex = /\.room\(\s*((?:[^()]+|\([^()]*\))*)\s*\)/gm
    out = inputText.replace(regex, (match, value) => { return `.room(${value}*${reverb})` })

    return out
}