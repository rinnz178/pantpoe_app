import React, { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import "./styles/index.css";

const PaymentSuccess = () => {
  const history = useHistory();
  const [timer, setTimer] = React.useState(5);
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer === 0) {
      history.push("/home");
    }
  }, [timer]);
  return (
    <div className="payment-container">
      <div>
        <div className="payment-icon-container payment-icon-container-success">
          <BiCheck size={48} color="white" />
        </div>
      </div>
      <div>
        <p className="payment-title">Payment Success!</p>
      </div>
      <div>
        <p>Your subscription was successfully completed.</p>
      </div>
      <div>
        <p>
          You will be <Link href="/">Home</Link> in {timer} seconds.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
