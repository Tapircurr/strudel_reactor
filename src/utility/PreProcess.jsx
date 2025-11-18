import { AutoIntruments } from "./AutoIntruments"
import { InstrumentsProc } from "./InstrumentsProc"
import { ReverbProc } from "./ReverbProc"
import { SpeedProc } from "./SpeedProc"
import { VolProc } from "./VolProc"
export function PreProcess({ inputText, vol, speed, instruments, reverb }) {
    let outText = inputText
    //const totalInstruments = AutoIntruments(outText)

    outText = VolProc(outText, vol)
    outText = SpeedProc(outText, speed)
    outText = InstrumentsProc(outText, instruments)
    outText = ReverbProc(outText, reverb)
    
    
    return outText
}



