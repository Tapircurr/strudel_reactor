export function JSONPar(inputArray) {
    let out  = '{"song": ['
    inputArray.forEach(inputString => {
        out = out + JSONParSingle(inputString) + ","
    })
    out = out.slice(0, -1)
    out = out + "]}"

    out = JSON.parse(out)

    return out
}

function JSONParSingle(inputString) {

    //remove start
    const regex = /^[^:]+:\s/
    let out = inputString.replace(regex, "");

    //CSS target for quotes
    const regexQuotes = /(?:(?<=\s)|(?<=^))([\w-]+)(?=:)/gm
    out = out.replace(regexQuotes, (match) => {
        return `"${match}"`
    });

    //White space target for commas
    const regexCommas = /(?<!:)\s/gm
    out = out.replace(regexCommas, (match) => {
        return `,${match}`
    });

    //quotes for values
    const regexValueQuote = /(?<=:)(.*?)(?=,|$)/gm
    out = out.replace(regexValueQuote, (match) => {
        return `"${match}"`
    });

    out = "{" + out + "}"

    return out
}
