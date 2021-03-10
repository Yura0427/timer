import moment from 'moment'
import React, { useEffect, useState } from 'react'
import style from './App.module.css'
import Timer from './Timer'
import play from '../assets/img/play.svg'
import { connect } from 'react-redux'
import { setName } from '../redux/reducer'
import remove from '../assets/img/remove.svg'

const App = (props) => {
    console.log(props)

    const [trackers, setTrackers] = useState([])


    const input = (e) => props.setName(e.target.value.toString())

    document.addEventListener('keydown', (e) => {
        console.log(e)
        // if (e.code === 'Enter') {
        //     start()
        // }
    })
    const start = () => {
        localStorage.setItem(`${moment().valueOf().toString()}`, JSON.stringify({
            timeStart: moment().valueOf(),
            trackName: props.name,
            startAt: moment().valueOf()
        }))
        setTrackers([{ id: moment().valueOf().toString(), startAt: moment().valueOf() }, ...trackers])
        props.setName('')
    }

    useEffect(() => {
        let arr = []
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            
            arr.push({ id: key, startAt: JSON.parse(localStorage.getItem(key)).startAt })
        }
        setTrackers(arr)
    }, [])


    const removeTimer = (e) => {
        setTrackers(trackers.filter(track => {
            console.log(track.id, e.target.id)
            if (track.id !== e.target.id) return true
        }))
        localStorage.removeItem(e.target.id)
    }

    return (
        <div>
            <div className={style.divPlay}>
                <input value={props.name} onInput={input} type="text" className={style.inputPlay} placeholder='Enter tracker name' />
                <button onClick={start} className={style.btnPlay}>
                    <img src={play} className={style.imgPlay} />
                </button>
            </div>
            {trackers.length > 0 && trackers.sort((a, b) => a.startAt - b.startAt).reverse().map(p => {
                console.log(p)
                return (
                    <>
                        <hr />
                        <div className={style.timerGrup}>
                            <Timer key={p.id} id={p.id} />
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