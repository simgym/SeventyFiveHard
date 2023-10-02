import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { portalAction } from "../store/Redux_PortalHandler";

import "./ChallengeCompletePortal.css";

const Complete = ({ onClose }) => {
  const closePortalHandler = () => {
    onClose(); // Call the onClose function to close the portal
  };

  return (
    <div className="congratsMessage">
      <p>
        Congratulations on completing the 75HardDay challenge! Your dedication
        and perseverance are truly inspiring. I am confident that with this
        newfound strength and determination, you are capable of achieving
        anything you set your mind to.
      </p>
      <p>
        Remember, the journey doesn’t have to end here. If you wish to continue
        pushing your boundaries and striving for greatness, this platform is
        here to support you. It was created with the purpose of helping and
        improving people, and it will undoubtedly aid you in your journey ahead.
      </p>
      <p>
        The world is your oyster! Keep exploring, keep growing, and keep
        challenging yourself.
      </p>
      <button onClick={closePortalHandler}>Close</button>
    </div>
  );
};

const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick} />;
};

const ChallengeCompletePortal = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(true); // State variable to track portal open/close
  const dispatch = useDispatch();

  const closePortalHandler = () => {
    setIsPortalOpen(false); // Set the portal to closed
    dispatch(portalAction.closePortal());
  };

  return (
    <>
      {isPortalOpen &&
        ReactDOM.createPortal(
          <Complete onClose={closePortalHandler} />,
          document.getElementById("challenge-complete")
        )}
      {isPortalOpen &&
        ReactDOM.createPortal(
          <Backdrop onClick={closePortalHandler} />,
          document.getElementById("backdrop-root")
        )}
    </>
  );
};

export default ChallengeCompletePortal;
