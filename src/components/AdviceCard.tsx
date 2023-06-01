import { useEffect, useState } from "react";
import "../styles/AdviceCard.scss";
import dice from "../assets/dice.svg";

type Advice = {
  id: number;
  advice: string;
};

const AdviceCard = () => {
  const [advice, setAdvice] = useState<Advice>({ id: 0, advice: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let isCancelled = false;
    fetch("	https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        if (isCancelled) {
          setAdvice(data.slip);
          console.log(data.slip);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="card-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="card-content">
            <h3>Advice #{advice.id}</h3>
            <h1>"{advice.advice}"</h1>
          </div>
          <div className="advice-line"></div>
          <div className="re-roll-cta">
            <img src={dice} alt="dice" />
          </div>
        </>
      )}
    </div>
  );
};

export default AdviceCard;
