import moment from 'moment'
import React, { useEffect, useState } from 'react'
import style from './App.module.css'
import Timer from './Timer'
import play from '../assets/img/play.svg'

const App = (props) => {
    const [id, setId] = useState([])
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            start()
        }
    })
    const start = () => {
        if (id.length === 0) {
            setId([{ id: id.length }])
        } else {
            setId([{ id: id.length }, ...id])
        };
        localStorage.setItem(`${id.length}`, JSON.stringify({ timeStart: moment().valueOf() }))
    }
    useEffect(() => {
        let arr = []
        for (let i = 0; i < localStorage.length; i++) {
            arr.push({ id: i })
        }
        setId(arr.reverse())
    }, [])

    return (
        <div>
            
            <div className={style.divPlay}>
                <input type="text" className={style.inputPlay} placeholder='Enter tracker name' />
                <button onClick={start} className={style.btnPlay}>
                    <img src={play} className={style.imgPlay} />
                </button>
            </div>



            {id.length > 0 && id.map(p => {
                return (
                    <>
                        <hr />
                        <Timer key={p.id} id={p.id} />
                    </>
                )
            })}
        </div>
    )
}
export default App