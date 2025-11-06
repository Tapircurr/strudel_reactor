export function AutoIntruments(inputText) {
    //Get array of all instrument names in input
    let out = inputText

    let regex = /^(?!\s*\/\/)(?!.*\().*?(?=:)/gm

    out = inputText.match(regex)

    return out
}
