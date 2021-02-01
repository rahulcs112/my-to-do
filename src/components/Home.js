import AddToDo from "./AddToDo";
import ToDoList from "./ToDoList";
import { useSelector } from "react-redux";
function Home(props) {
  const tasks = useSelector((state) => state.taskList.task);
  const count = useSelector((state) => state.counter.count);

  return (
    <>
      <div className="App">
        <AddToDo count={count} />

        {/* Task list only be visible if any task will be available into the list
            Otherwise it will not be visible
        */}
        {tasks && Object.keys(tasks).length > 0 ? (
          <ToDoList tasks={Object.values(tasks)} />
        ) : null}
      </div>
    </>
  );
}

export default Home;
