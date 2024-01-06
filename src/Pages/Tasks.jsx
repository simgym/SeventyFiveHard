import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Chart from "../UI/graph";

import "./Tasks.css";

const Tasks = () => {
  // const dietTask = useSelector((state) => state.taskReducer.diet);
  // const workoutTask = useSelector((state) => state.taskReducer.workout);
  const userFolderId = useSelector((state) => state.databaseReducer.data);
  const [isLoading, setIsLoading] = useState(false);

  const [workoutData, setWorkoutData] = useState("");
  const [dietData, setDietData] = useState("");

  // Function to render the data with preserved formatting
  const renderFormattedData = (data) => {
    const style = {
      whiteSpace: "pre-wrap",
    };

    return <pre style={style}>{data}</pre>;
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(userFolderId);
    const userData = async () => {
      const response = await fetch(
        "https://hard-88a4f-default-rtdb.firebaseio.com/users/" +
          userFolderId +
          ".json"
      );
      const resData = await response.json();
      console.log(resData);
      setDietData(resData.diet); 
      setWorkoutData(resData.workout); 

      setIsLoading(false); 
    };

    userData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <main>
          <div className="tasks">
            <div className="tasks-title">
              <h1>TASKS</h1>
            </div>
            <div className="tasks-added">
              <h2>DIET</h2>
              <div className="tasks-diet">
                {dietData ? (
                  renderFormattedData(dietData)
                ) : (
                  <p className="emptySlot">
                    You have not entered any diet plans
                  </p>
                )}
              </div>
              <h2>WORKOUT</h2>
              <div className="tasks-workout">
                {workoutData ? (
                  renderFormattedData(workoutData)
                ) : (
                  <p className="emptySlot">
                    You have not entered any workout plans
                  </p>
                )}
              </div>
            </div>
            <div className="tasks-content"></div>
          </div>
          <div className="edit-task">
            <Link to="/edittasks">Edit Tasks</Link>
          </div>
        </main>
      )}
    </>
  );
};

export default Tasks;
