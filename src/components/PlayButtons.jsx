function PlayButtons({ onPlay, onStop }) {
    return (
        <>
            <div class="d-grid gap-2 p-2">
                <button id="play" className="btn btn-lg btn-outline-success" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-lg btn-outline-danger" onClick={onStop}>Stop</button>
            </div>
        </>
    );
}

export default PlayButtons;