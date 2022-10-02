import {setInitial, setInitialPayInRub, setMonthPay, setTotalPay} from "../redux/slice/calcSlice";

export const initialDispatch = (fn, value) => {
    fn(setInitial(value))
    fn(setInitialPayInRub())
    fn(setMonthPay())
    fn(setTotalPay())
}