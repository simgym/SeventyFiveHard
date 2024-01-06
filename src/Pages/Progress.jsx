import { useEffect, useState } from "react";
import Graph from "../UI/graph";
import "./Progress.css";

import ChallengeCompletePortal from "../components/ChallengeCompletePortal";

import { useSelector } from "react-redux";

const Progress = () => {
  const [dayCount, setDayCount] = useState(0);
  const [showWellDone, setShowWellDone] = useState(false);
  const [showStartOver, setShowStartOver] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userID = useSelector((state) => state.databaseReducer.data);
  const closePortal = useSelector((state) => state.portalReducer.condition);

  const successHandler = async () => {
    setDayCount((prevState) => prevState + 1);
    setShowWellDone(true);
    setShowStartOver(false);

    // Update dayCount in Firebase
    await fetch(
      "https://hard-88a4f-default-rtdb.firebaseio.com/users/" +
        userID +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify({ dayCount: dayCount + 1 }),
        headers: { "Content-Type": "application/json" },
      }
    );

  
    setTimeout(() => {
      setShowWellDone(false);
    }, 3000);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://hard-88a4f-default-rtdb.firebaseio.com/users/" +
          userID +
          ".json"
      );
      const data = await response.json();
      setDisplayButton(data.displayButton);

      setDayCount(data.dayCount || 0); 
      setIsLoading(false);
    };

    fetchData();
  }, [userID]);

  const failureHandler = async () => {
    setDayCount(0);
    setShowWellDone(false); 
    setShowStartOver(true);

    // Update dayCount in Firebase
    await fetch(
      "https://hard-88a4f-default-rtdb.firebaseio.com/users/" +
        userID +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify({ dayCount: 0 }),
        headers: { "Content-Type": "application/json" },
      }
    );

    setTimeout(() => {
      setShowStartOver(false);
    }, 3000);
  };

  const displayHandler = async () => {
    const response = await fetch(
      "https://hard-88a4f-default-rtdb.firebaseio.com/users/" +
        userID +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify({ displayButton: true }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      // Checking if request was successful
      const data = await response.json();
      setDisplayButton(data.displayButton);
    } else {
      console.error("Error:", response.status);
    }
  };

  useEffect(() => {
    const fetchDisplayButton = async () => {
      const response = await fetch(
        "https://hard-88a4f-default-rtdb.firebaseio.com/users/" +
          userID +
          ".json"
      );
      const data = await response.json();
      setDisplayButton(data.displayButton);
      setIsLoading(false);
    };

    fetchDisplayButton();
  }, [userID]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {displayButton ? (
            <div className="task-manager">
              <h1 className="progress">PROGRESS</h1>
              <div className="day-count-and-graph">
                <div className="graph">
                  <Graph dayCount={dayCount} />
                </div>

                <p className="day-count">Day {dayCount}</p>
              </div>
              <h2>Were you successful ?</h2>
              <div className="task-container">
                <div className="task-done" onClick={successHandler}>
                  ✓
                </div>
                <div className="task-failed" onClick={failureHandler}>
                  ✕
                </div>
              </div>
              {showWellDone && <p>Well done</p>}
              {showStartOver && <p>Start Over</p>}
              <div className="honest-message">
                <p>
                  Embarking on a journey of transformation requires honesty and
                  commitment. If you truly aspire to become a better version of
                  yourself, please make sure to honestly click on the tick
                  button once per day, but only if you have successfully
                  completed your tasks for the day. Remember, consistency is key
                  and each honest click brings you one step closer to your goal.
                  Your transformation is in your hands, make each day count!
                </p>
              </div>
              {dayCount === 75 && !closePortal ? (
                <ChallengeCompletePortal />
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="transform">
              <button onClick={displayHandler}>Start</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Progress;
