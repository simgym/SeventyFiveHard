import ReactDOM from "react-dom";

import "./ChallengeCompletePortal.css";

const ChallengeCompletePortal = () => {
  const Complete = () => {
    return (
      <>
        {" "}
        <div className="congratsMessage">
          "Congratulations on completing the 75HardDay challenge! Your
          dedication and perseverance are truly inspiring. I am confident that
          with this newfound strength and determination, you are capable of
          achieving anything you set your mind to. Keep pushing your boundaries
          and continue to strive for greatness. The world is your oyster!"
        </div>
        ;
      </>
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Complete />,
        document.getElementById("challenge-complete")
      )}
    </>
  );
};

export default ChallengeCompletePortal;
