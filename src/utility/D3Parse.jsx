//Takes the more general pased JSON data and make it what is needed for the specific graph
export function D3Parse(jsonInput) {
    let out = {}

    jsonInput.song.forEach(songNote => {
        //console.log(songNote.note)
        if (out[songNote.note] === undefined) {
            out[songNote.note] = 1
        } else {
            out[songNote.note] += 1
        }
    })
    //console.log(out)
    return out
}