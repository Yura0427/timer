import moment from 'moment'
import React, { useEffect, useState } from 'react'
import style from './Timer.module.css'
import pause from '../assets/img/pause.svg'
import play from '../assets/img/play.svg'
import cn from 'classnames'

const Timer = (props) => {
    // console.log(props.id)
    const [isActive, setIsActive] = useState(true)
    // debugger
    let on = JSON.parse(localStorage.getItem(props.id)).currentTime ? false : true
    const [timerOn, setTimerOn] = useState(on);
    const [time, setTime] = useState('--');

    useEffect(() => {
        setIsActive(timerOn)
        let timeStart = JSON.parse(localStorage.getItem(props.id)).timeStart ||
            (moment().valueOf() - JSON.parse(localStorage.getItem(props.id)).currentTime)
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                if (JSON.parse(localStorage.getItem(props.id)).timeStart) {
                    const timeNow = moment().valueOf()
                    const ss = timeNow - timeStart
                    setTime(ss)
                }
                if (JSON.parse(localStorage.getItem(props.id)).currentTime) {
                    const timeNow = moment().valueOf()
                    const ss = timeNow - timeStart
                    setTime(ss)
                    localStorage.setItem(props.id, JSON.stringify({
                        timeStart,
                        trackName: JSON.parse(localStorage.getItem(props.id)).trackName,
                        startAt: JSON.parse(localStorage.getItem(props.id)).startAt
                    }))
                }
            }, 1000);
        } else if (!timerOn) {
            if (!JSON.parse(localStorage.getItem(props.id)).currentTime) {
                const timeStop = moment().valueOf()
                const currentTime = timeStop - JSON.parse(localStorage.getItem(props.id)).timeStart
                localStorage.setItem(props.id, JSON.stringify({
                    currentTime,
                    trackName: JSON.parse(localStorage.getItem(props.id)).trackName,
                    startAt: JSON.parse(localStorage.getItem(props.id)).startAt
                }))
                clearInterval(interval)
            }
            if (JSON.parse(localStorage.getItem(props.id)).currentTime) {
                setTime(JSON.parse(localStorage.getItem(props.id)).currentTime)
            }

        }
        return () => clearInterval(interval);
    }, [timerOn])

    return (
        <>
            <div className={style.timeBlock} >
                {
                    JSON.parse(localStorage.getItem(props.id)).trackName ?
                        <span className={cn({ [style.active]: isActive })}>{JSON.parse(localStorage.getItem(props.id)).trackName}</span> :
                        <span className={cn({ [style.active]: isActive })}>NoName # {props.id}  </span>
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