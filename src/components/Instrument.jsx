function Instrument({ name, onInstrumentsChange, instruments }) {
    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={onInstrumentsChange} value={name} id={name} />
                <label className="form-check-label text-light" htmlFor={name}>
                    {name}
                </label>
            </div>
        </>
    );

}

export default Instrument;