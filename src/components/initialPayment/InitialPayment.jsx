import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setInitialPayInRub, setInitial, setMonthPay, setTotalPay} from "../../redux/slice/calcSlice";

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
            if(refInitialReset.current.value > 60) {
                dispatch(setInitial(60))
                dispatch(setInitialPayInRub())
                dispatch(setMonthPay())
                dispatch(setTotalPay())
            } else if(refInitialReset.current.value < 10) {
                dispatch(setInitial(10))
                dispatch(setInitialPayInRub())
                dispatch(setMonthPay())
                dispatch(setTotalPay())
            }
        }
        window.addEventListener('click', logger )
        return () => {
            window.removeEventListener('click', logger)
        }
    }, [initialPayment, dispatch])


    const handleChange = (e) => {
        dispatch(setInitial(e.target.value))
        dispatch(setInitialPayInRub())
        dispatch(setMonthPay())
        dispatch(setTotalPay())
    }

    return (
        <div className={"position"}>
            <h6>Первоначальный взнос</h6>
                <input ref={refInitialReset} onChange={(e) => handleChange(e)}
                       step="1" min="10" max="60"
                       className='position__title payment' type='text' value={initialPayment}/>
                <input disabled className={'number'} value={initialPayInRub}/>
            <input ref={refInitial} className="range" onChange={(e) => handleChange(e)} type="range"
                   value={initialPayment} step="1" min="10" max="60"/>
        </div>
    );
};