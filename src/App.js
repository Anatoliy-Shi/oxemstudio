import './style/App.scss';
import {InitialPayment} from "./components/initialPayment/InitialPayment";
import {Leasing} from "./components/leasing/Leasing";
import {Cost} from "./components/cost/Cost";
import {useSelector} from "react-redux";

function App() {

    const {monthPay, totalPay} = useSelector(state => state.calc)

    return (
        <div className="wrapper">
            <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
            <div className="calc">
                <Cost />
                <InitialPayment/>
                <Leasing/>
            </div>
            <div className={"result"}>
                <div className={"sum"}>
                    <div>
                    <span>Сумма договора лизинга</span>
                    <p className={"res"}>{totalPay} &#8381;</p>
                    </div>
                    <div>
                    <span>Ежемесячный платеж от</span>
                    <p className={"res"}>{monthPay} &#8381;</p>
                    </div>
                </div>
                <button>Оставить заявку</button>
            </div>

        </div>
    );
}

export default App;
