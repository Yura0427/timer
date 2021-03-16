import moment from 'moment'
import React, { useEffect, useState } from 'react'
import style from './App.module.css'
import Timer from './Timer'
import play from '../assets/img/play.svg'
import { connect } from 'react-redux'
import { setName } from '../redux/reducer'
import remove from '../assets/img/remove.svg'

const App = (props) => {
    const [trackers, setTrackers] = useState([])
    const input = (e) => props.setName(e.target.value.toString())

    const presEnter = (e) => { if (e.code === 'Enter') start() }

    const start = () => {
        setTrackers([{
            id: moment().valueOf().toString(),
            trackName: props.name,
            timeStart: moment().valueOf(),
        }, ...trackers])
        props.setName('')
    }

    useEffect(() => {
        setTrackers(JSON.parse(localStorage.getItem('trackers')))
    }, [])

    useEffect(() => {
        localStorage.setItem('trackers', JSON.stringify(trackers))
        document.addEventListener('keydown', presEnter)
        return () => {
            document.removeEventListener('keydown', presEnter)
        }
    }, [trackers])

    const removeTimer = (e) => {
        setTrackers(trackers.filter(track => {
            if (track.id !== e.target.id) return true
        }))
    }

    return (
        <div >
            <div className={style.divPlay}>
                <input value={props.name} onInput={input} type="text" className={style.inputPlay} placeholder='Enter tracker name' />
                <button onClick={start} className={style.btnPlay}>
                    <img src={play} className={style.imgPlay} />
                </button>
            </div>
            {trackers.length > 0 && trackers.map(p => {
                return (
                    <>
                        <hr />
                        <div className={style.timerGrup} >
                            <Timer timer={p} setTrackers={setTrackers} trackers={trackers} />
                            <button className={style.btn} onClick={removeTimer} id={p.id}>
                                <img src={remove} className={style.imgRemove} id={p.id} />
                            </button>
                        </div>
                    </>
                )
            })}
        </div>
    )
}
const mapStateToProps = (state) => ({
    name: state.reducer.name
})
export default connect(mapStateToProps, { setName })(App)