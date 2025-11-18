import React from 'react'
function ReverbDrop({ reverb, onReverbChange }) {
    return (
        <>
            
            <select onChange={onReverbChange} className="form-select" aria-label="Reverb Selection">
                <option value="0">No Reverb</option>
                <option value="1">Some Reverb</option>
                <option value="20">Lots of Reverb</option>
            </select>
        </>
    );
}

export default ReverbDrop;