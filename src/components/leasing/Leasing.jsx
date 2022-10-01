import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setMonthPay, setMouth, setTotalPay} from "../../redux/slice/calcSlice";

export const Leasing = () => {
    const [valueTrackLeasing, setValueTrackLeasing] = useState('')
    const refLeasing = useRef(null)
    const refLeasingReset = useRef(null)
    const {months} = useSelector(state => state.calc)
    const dispatch = useDispatch()


    useEffect(() => {
        const backgroundValue = (100 * (months - 1) / (60 - 1))
        setValueTrackLeasing(refLeasing.current.style.background = `-webkit-linear-gradient(left, #FF9514 0%, #FF9514 ${backgroundValue}%, #F3F3F4 ${backgroundValue}%,  #F3F3F4 100%`)
    }, [months, valueTrackLeasing])

    useEffect(() => {
        const logger = () => {
            if(refLeasingReset.current.value > 60) {
                dispatch(setMouth(60))
                dispatch(setMonthPay())
                dispatch(setTotalPay())
            } else if(refLeasingReset.current.value < 1) {
                dispatch(setMouth(1))
                dispatch(setMonthPay())
                dispatch(setTotalPay())
            }
        }
        window.addEventListener('click', logger )
        return () => {
            window.removeEventListener('click', logger)
        }
    }, [months, dispatch])

    const handleChange = (e) => {
        const event = e.target.value
        dispatch(setMouth(event))
        dispatch(setMonthPay())
        dispatch(setTotalPay())
    }

    return (
        <div className={"position"}>
            <span className='position__title'>мес.</span>
            <h6>Срок лизинга</h6>
            <input ref={refLeasingReset} className={'number'} onChange={(e) => handleChange(e)} min="1" max="60" value={months} step="1"
                   type="number"/>
            <input ref={refLeasing} className="range" onChange={(e) => handleChange(e)} type="range" value={months}
                   step="1" min="1" max="60"/>
        </div>
    );
};