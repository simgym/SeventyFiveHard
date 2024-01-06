import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { taskAction } from "../store/Redux_taskData";
import { getDatabase, ref, update } from "firebase/database";
import { auth } from "../firebase";
import "./EditTasks.css";

const EditTasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskNavigate = useNavigate();


  const dietData = useSelector((state) => state.taskReducer.diet);
  const workoutData = useSelector((state) => state.taskReducer.workout);

  const [diet, setDiet] = useState(dietData);
  const [workout, setWorkout] = useState(workoutData);

  const dietHandler = (event) => {
    setDiet(event.target.value);
    dispatch(taskAction.setDiet(event.target.value)); 
  };

  const workoutHandler = (event) => {
    setWorkout(event.target.value);
    dispatch(taskAction.setWorkout(event.target.value)); 
  };

  const submitHandler = (event) => {
    event.preventDefault();


    const user = auth.currentUser;

    if (user) {
     
      const db = getDatabase();

    
      const userRef = ref(db, "users/" + user.uid);

    
      update(userRef, {
        diet: diet,
        workout: workout,

      })
        .then(() => {
          console.log("User data updated successfully.");
          taskNavigate("/tasks"); 
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No user is signed in.");
    }
  };

  return (
    <>
      <main>
        <form onSubmit={submitHandler}>
          <div>
            <label className="newTasks-label">
              <h1>Enter the diet plan</h1>
            </label>
            <textarea
              className="newTasks-textarea"
              onChange={dietHandler}
              value={diet}
            />
          </div>
          <div>
            <label className="newTasks-label">
              <h1>Enter the workout plan</h1>
            </label>
            <textarea
              className="newTasks-textarea"
              onChange={workoutHandler}
              value={workout}
            />
          </div>
          <button type="submit" className="done">
            Done
          </button>
        </form>
      </main>
    </>
  );
};

export default EditTasks;
