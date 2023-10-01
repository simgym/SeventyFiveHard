import "./HomePage.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { taskAction } from "../store/Redux_taskData";

const HomePage = () => {
  const dispatch = useDispatch();
  const date = new Date().getDate;
  const rules = [
    {
      id: "l1",
      title: "Stick to a diet:",
      rule: " Choose any diet based on your goals and stick to it",
    },
    {
      id: "l2",
      title: "No alcohol or cheat meals:",
      rule: " Absolutely no alcohol or cheat meals are allowed",
    },
    {
      id: "l3",
      title: "Complete two 45-minute workouts per day:",
      rule: " Perform one workout outdoors, irrespective of weather",
    },
    {
      id: "l4",
      title: "Drink a gallon of water each day:",
      rule: " This is approximately 4.5 liters",
    },
    {
      id: "l5",
      title: "Take a daily progress photo:",
      rule: " This helps to track your progress",
    },
    {
      id: "l6",
      title: "Read 10 pages of a self-improvement book per day:",
      rule: " The book should be non-fiction",
    },
  ];

  const sendDateHandler = () => {
    dispatchEvent(taskAction.setDate(date.toString()));
  };
  return (
    <>
      <main className="background">
        <h2 className="rules">RULES</h2>
        <div className="table-container">
          <table>
            <tbody>
              {rules.map((item) => (
                <tr key={item.id} className="rule-item">
                  <td className="rule-title-wrapper">
                    <div className="rule-title">{item.title}</div>
                  </td>
                  <td className="rule-content">{item.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="goal">
          <h2 className="goal-heading">GOAL</h2>
          <h4 className="goal-content">
            As the developer of this website, my goal is to encourage and
            support individuals who are ready to take on the 75 Hard Days
            Challenge. I've personally experienced the transformative power of
            this challenge and I want to share it with others. This website is
            designed to provide resources, tips, and a sense of community for
            those embarking on this journey. My aim is to help participants stay
            committed, fostering personal growth and resilience. Let’s conquer
            this challenge together!
          </h4>
        </div>
      </main>
    </>
  );
};

export default HomePage;
