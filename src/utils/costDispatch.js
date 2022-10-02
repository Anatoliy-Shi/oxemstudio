import {setCost, setInitialPayInRub, setMonthPay, setTotalPay} from "../redux/slice/calcSlice";

export const costDispatch = (fn, value) => {
    fn(setCost(value))
    fn(setInitialPayInRub())
    fn(setMonthPay())
    fn(setTotalPay())
}