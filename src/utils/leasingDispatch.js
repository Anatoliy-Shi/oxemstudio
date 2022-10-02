import {setMonthPay, setMouth, setTotalPay} from "../redux/slice/calcSlice";

export const leasingDispatch = (fn, value) => {
    fn(setMouth(value))
    fn(setMonthPay())
    fn(setTotalPay())
}

