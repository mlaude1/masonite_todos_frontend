// Import Our Components
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import Hooks from React
import {useState, useEffect} from "react"

// Import Router 6 Component (Route -> Route, Switch -> Routes)
import { Route, Routes, Link, useNavigate } from "react-router-dom"


/////////////////////////
// Style Object
/////////////////////////
const h1 = {
  textAlign: "center",
  margin: "10px"
}

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App() {
  
  /////////////////////////
  // State and Other Variables
  /////////////////////////
  const url = "https://mlaude-mason-todos-backend.herokuapp.com/todos/";

  // state to hold list of todos
  const [posts, setPosts] = useState([]);

  // an empty todo for intializing the create form
  const nullTodo = {
    subject: "",
    details: ""
  }

  /////////////////////////
  // Functions
  /////////////////////////
  // function to get list of todos from API
  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // function to add todos
  const addTodos = async (newTodo) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    });

    // update the list of todos
    getTodos()
  }

  /////////////////////////
  // useEffects
  /////////////////////////
  useEffect(() => {
    getTodos()
  }, [])

  /////////////////////////
  // Returned JSX
  /////////////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePost posts={posts}/>}/>
        <Route path="/new" element={<Form
          initialTodo={nullTodo}
          handleSubmit={addTodos}
          buttonLabel="Create Todo"
        />}/>
        <Route path="/edit" element={<Form/>}/>
      </Routes>
    </div>
  );


}

export default App;
