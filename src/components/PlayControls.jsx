import Instrument from "./Instrument";
function PlayControls({ volChange, onVolChange, speedChange, onSpeedChange, instruments, onInstrumentsChange, totalInstruments }) {
    //console.log("totalInstrumentsx = " + totalInstruments)
    const isInstruments = instruments.length > 0
    return (
        <>
            <div className="bg-black p-2 rounded">
                {/* Speed */}
                <div className="input-group mb-3">

                    <span className="input-group-text" id="speed_label">Set Speed</span>
                    <input type="text" className="form-control" id="speedInput" onChange={onSpeedChange} placeholder="140/60/4" aria-label="speed" aria-describedby="speed_label" />
                </div>

                {/* Volume */}
                <label htmlFor="volumeRange" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="1" step="0.01" onMouseUp={onVolChange} id="customRange3" />

                {/* Instruments */}
                {
                    totalInstruments.map((instrument, key) => {
                        return <Instrument name={instrument} key={key} onInstrumentsChange={onInstrumentsChange} instruments={instruments} />
                    })
                }
            </div>
        </>
    );
}

export default PlayControls;