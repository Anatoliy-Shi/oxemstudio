import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCost, setInitialPayInRub, setMonthPay, setTotalPay} from "../../redux/slice/calcSlice";

export const Cost = () => {
    const [valueTrack, setValueTrack] = useState('')
    const refCost = useRef(null)
    const refCostReset = useRef(null)
    const {cost} = useSelector(state => state.calc)
    const dispatch = useDispatch()


    useEffect(() => {
        const backgroundValue = (100 * (Number(cost) - 1000000) / (6000000 - 1000000))
        setValueTrack(refCost.current.style.background = `-webkit-linear-gradient(left, #FF9514 0%, #FF9514 ${backgroundValue}%, #F3F3F4 ${backgroundValue}%,  #F3F3F4 100%`)
    }, [cost, valueTrack])


    useEffect(() => {
        const logger = () => {
            if(refCostReset.current.value > 6000000) {
                dispatch(setCost(6000000))
                dispatch(setInitialPayInRub())
                dispatch(setMonthPay())
                dispatch(setTotalPay())
            } else if(refCostReset.current.value < 1000000) {
                dispatch(setCost(1000000))
                dispatch(setInitialPayInRub())
                dispatch(setMonthPay())
                dispatch(setTotalPay())
            }
        }

        window.addEventListener('click', logger )
        return () => {
            window.removeEventListener('click', logger)
        }
    }, [cost, dispatch])


    const handleChange = (e) => {
        dispatch(setCost(e.target.value))
        dispatch(setInitialPayInRub())
        dispatch(setMonthPay())
        dispatch(setTotalPay())
    }


    return (
        <div className={"position"}>
            <span className='position__title'>&#8381;</span>
            <h6>Cтоимость автомобиля</h6>
            <input ref={refCostReset} className={'number'} onChange={(e) => handleChange(e)} min="1000000" step="100000" max="6000000" value={cost} type="number"/>
            <input ref={refCost} onChange={(e) => handleChange(e)}  className="range" type="range" value={cost} step="100000" min="1000000" max="6000000"/>
        </div>
    );
};