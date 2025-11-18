import './App.css';
import { useEffect, useRef, useState, useCallback } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import PlayControls from './components/PlayControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreTextArea from './components/PreTextArea';
import { PreProcess } from './utility/PreProcess';
import { AutoIntruments } from './utility/AutoIntruments';
import { JSONPar } from './utility/JSONPar';
import { D3Parse } from './utility/D3Parse';
import BarChart from './components/BarChart';

let globalEditor = null;



export default function StrudelDemo() {

    const [songText, setSongText] = useState(stranger_tune)

    const [vol, setVol] = useState(1)

    const [speed, setSpeed] = useState("140/60/4")

    const [state, setState] = useState("stop")

    const [instruments, setInstruments] = useState([])

    const [totalInstruments, setTotalInstruments] = useState(AutoIntruments(songText))

    const hasRun = useRef(false);

    const [reverb, setReverb] = useState(1)

    const [d3Data, setD3Data] = useState({})

    const handleD3Data = useCallback((event) => {
        console.log(event.detail);
        if (event.detail && typeof event.detail === "object") {
            setD3Data(prev => ({ ...prev, ...D3Parse(JSONPar(event.detail)) }));
        }
    }, []);

    useEffect(() => {
        window.addEventListener("chart-update", handleD3Data);
        return () => window.removeEventListener("chart-update", handleD3Data);
    }, [handleD3Data]);

    const handleProc = useCallback(() => {
        let outText = PreProcess({ inputText: songText, vol: vol, speed: speed, instruments: instruments, reverb: reverb })
        globalEditor.setCode(outText)
        setTotalInstruments(AutoIntruments(songText))
    }, [instruments, reverb, songText, speed, vol])

    const handlePlay = useCallback(() => {
        handleProc()
        globalEditor.evaluate()
    }, [handleProc])

    const handleStop = () => {
        globalEditor.stop()
    }

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [handlePlay, state, vol])

    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            console.log("Data = " + getD3Data())
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * window.devicePixelRatio;
            canvas.height = canvas.height * window.devicePixelRatio;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            document.getElementById('proc').value = stranger_tune
            //SetupButtons()
            //Proc()
        }
        globalEditor.setCode(songText)
        handleProc();
    }, [handleProc, songText]);


    return (
        <div className="bg-dark">

            <main>

                <div className="container-fluid bg-dark text-light">
                    <h2>Strudel Demo</h2>
                    <div className="row">
                        <div className="col-md-4 bg-dark" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <PreTextArea defaultVal={songText} onChange={(e) => setSongText(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <nav>
                                    <ProcButtons onProc={handleProc} />
                                    <br />
                                    <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                                </nav>
                            </div>
                            <div className="row">
                                <BarChart data={d3Data} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <PlayControls
                                volChange={vol} onVolChange={(e) => setVol(e.target.value)}
                                speedChange={speed} onSpeedChange={(e) => setSpeed(e.target.value)}
                                instruments={instruments} onInstrumentsChange={(e) => {
                                    //If instrument is on instruments list remove it
                                    //otherwise add it
                                    if (instruments.includes(e.target.value)) {
                                        var index = instruments.indexOf(e.target.value);
                                        if (index !== -1) {
                                            instruments.splice(index, 1);
                                        }
                                    } else {
                                        instruments.push(e.target.value)
                                    }
                                    handleProc()
                                }
                                }
                                totalInstruments={totalInstruments}
                                reverbChange={reverb} onReverbChange={(e) => setReverb(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>

                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );
}