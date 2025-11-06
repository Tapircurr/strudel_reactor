import { AutoIntruments } from "./AutoIntruments"
import { InstrumentsProc } from "./InstrumentsProc"
import { SpeedProc } from "./SpeedProc"
import { VolProc } from "./VolProc"
export function PreProcess({ inputText, vol, speed, instruments }) {
    let outText = inputText
    //const totalInstruments = AutoIntruments(outText)

    outText = VolProc(outText, vol)
    outText = SpeedProc(outText, speed)
    outText = InstrumentsProc(outText, instruments)
    
    return outText
}



