import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {leasingDispatch} from "../../utils/leasingDispatch";

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
                leasingDispatch(dispatch,60)
            } else if(refLeasingReset.current.value < 1) {
                leasingDispatch(dispatch, 1)
            }
        }
        window.addEventListener('focusout', logger )
        return () => {
            window.removeEventListener('focusout', logger)
        }
    }, [months, dispatch])

    const handleChange = (e) => {
        leasingDispatch(dispatch, e.target.value)
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