import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    cost: 1000000,
    initialPayment: 10,
    months: 1,
    initialPayInRub: 100000,
    monthPay: 931500,
    totalPay: 1031500,
    interestRate: 0.035
}

export const calcSlice = createSlice({
        name: 'calc',
        initialState,
        reducers: {
            setCost: (state, action) => {
                state.cost = action.payload
            },
            setInitial: (state, action) => {
                state.initialPayment = action.payload
            },
            setMouth: (state, action) => {
                state.months = action.payload
            },
            setInitialPayInRub: (state) => {
                state.initialPayInRub = state.initialPayment * state.cost / 100
            },
            setTotalPay: (state) => {
                state.totalPay = Math.round(state.initialPayInRub + state.months * state.monthPay)
            },
            setMonthPay: (state) => {
                state.monthPay = Math.round((state.cost - state.initialPayInRub) * ((state.interestRate * Math.pow((1 + state.interestRate), state.months)) / (Math.pow((1 + state.interestRate), state.months) - 1)))
            },

        }
    }
)

// Action creators are generated for each case reducer function
export const {setCost, setInitial, setMouth, setInitialPayInRub, setMonthPay, setTotalPay} = calcSlice.actions

export default calcSlice.reducer