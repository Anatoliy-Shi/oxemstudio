import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initialDispatch} from "../../utils/initialDispatch";

export const InitialPayment = () => {
    const [valueTrackPayment, setValueTrackPayment] = useState('')
    const refInitialReset = useRef(null)
    const refInitial = useRef(null)
    const {initialPayment, initialPayInRub} = useSelector(state => state.calc)
    const dispatch = useDispatch()

    useEffect(() => {
        const backgroundValue = (100 * (initialPayment - 10) / (60 - 10))
        setValueTrackPayment(refInitial.current.style.background = `-webkit-linear-gradient(left, #FF9514 0%, #FF9514 ${backgroundValue}%, #F3F3F4 ${backgroundValue}%,  #F3F3F4 100%`)
    }, [initialPayment, valueTrackPayment])

    useEffect(() => {
        const logger = () => {
            if (refInitialReset.current.value > 60) {
                initialDispatch(dispatch, 60)
            } else if (refInitialReset.current.value < 10) {
                initialDispatch(dispatch, 10)
            }
        }
        window.addEventListener('focusout', logger)
        return () => {
            window.removeEventListener('focusout', logger)
        }
    }, [initialPayment, dispatch])

    const handleChange = (e) => {
        initialDispatch(dispatch, e.target.value)
    }


    return (
        <div className={"position"}>
            <h6>Первоначальный взнос</h6>
            <input disabled
                type='text'
                ref={refInitialReset} onChange={(e) => handleChange(e)}
                step="any" min="10" max="60"
                className='position__title payment'
                value={initialPayment + '%'}/>
            <p className={'number'}>{initialPayInRub} </p>
            <input ref={refInitial} className="range" onChange={(e) => handleChange(e)} type="range"
                   value={initialPayment} step="1" min="10" max="60"/>
        </div>
    );
};