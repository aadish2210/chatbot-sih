import {useState} from 'react'
import axios from "axios"
const App = () => {

  const [prompt , setPrompt] = useState("");
  const [response , setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    .post("http://localhost:5000/api/chatbot" , {message : prompt})
    .then((res) => {setResponse(res.data);})
    .catch((err)=>{console.error(err)})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type='text' value={prompt} onChange={(e)=> setPrompt(e.target.value)}></input>
      <button type='submit'>Submit</button>
      </form>
      <p>{response}</p>   
    </div>
  )
}

export default App