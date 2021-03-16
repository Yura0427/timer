import moment from 'moment'
import React, { useEffect, useState } from 'react'
import style from './Timer.module.css'
import pause from '../assets/img/pause.svg'
import play from '../assets/img/play.svg'
import cn from 'classnames'

const Timer = (props) => {
    const [isActive, setIsActive] = useState(true)
    const [timerOn, setTimerOn] = useState(props.timer.timeStart);
    const [time, setTime] = useState(0);

    useEffect(() => {
        setIsActive(timerOn)
        let interval = null;
        if (timerOn) {
            let timeStart = props.timer.timeStart ||
                (moment().valueOf() - props.timer.currentTime)
            interval = setInterval(() => {
                if (props.timer.timeStart) {
                    setTime(moment().valueOf() - timeStart)
                }
                if (props.timer.currentTime) {
                    setTime(moment().valueOf() - timeStart)
                    props.setTrackers(props.trackers.map(t => {
                        if (props.timer.id == t.id) return { id: t.id, trackName: t.trackName, timeStart }
                        return t
                    }))
                }
            }, 1000)
        } else if (!timerOn) {
            if (!props.timer.currentTime) {
                const currentTime = moment().valueOf() - props.timer.timeStart
                props.setTrackers(props.trackers.map(t => {
                    if (props.timer.id == t.id) return { id: t.id, trackName: t.trackName, currentTime }
                    return t
                }))
                clearInterval(interval)
            } else if (props.timer.currentTime) {
                setTime(props.timer.currentTime)
            }
        }
        return () => clearInterval(interval);
    }, [timerOn])

    return (
        <>
            <div className={style.timeBlock} >
                {
                    props.timer.trackName ?
                        <span className={cn({ [style.active]: isActive })}>{props.timer.trackName}</span> :
                        <span className={cn({ [style.active]: isActive })}>NoName # {props.timer.id}  </span>
                }
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span style={{ marginLeft: '10px' }}>{("0" + (Math.floor(time / 3600000))).slice(-2)}</span>
                    <span>:{("0" + (Math.floor((time / 60000) % 60))).slice(-2)}</span>
                    <span>:{("0" + (Math.floor((time / 1000) % 60))).slice(-2)}</span>
                    {timerOn &&
                        <button className={style.btn} onClick={() => { setTimerOn(false) }}>
                            <img src={pause} className={style.imgPause} />
                        </button>
                    }
                    {!timerOn &&
                        <button className={style.btn} onClick={() => { setTimerOn(true) }}>
                            <img src={play} className={style.imgPause} />
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default Timer