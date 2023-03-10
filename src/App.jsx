import { useState } from 'react'
import './App.css'

const API_KEY="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";

function App() {
  // const [APIBody, setAPIBody] = useState({});
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  async function callOpenAIAPI(){
    
 
    console.log('Calling the API');

    // -H "Content-Type: application/json" \
    // -H "Authorization: Bearer $OPENAI_API_KEY" \

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": prompt,
      "temperature": 0,
      "max_tokens": 1024,
      "top_p": 1,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0,
      // "stop": ["\n"]
    };

    console.log(APIBody);

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();       
    }).then((data) => {
      console.log(data);
      setResponse(data.choices[0].text.trim());
    })
  }

  console.log(prompt);

  return (
    <div>
      {/* <div className='head'> */}
        <h1 className='head'>CAT WISDOM</h1>
      {/* </div> */}
      <div className='input'>
        <textarea
          onChange = {(e)=>setPrompt(e.target.value)}
          placeholder="I am Serina's cat 🐱, ask me anything and I will enlighten you. "
          cols={50}
          rows={5}
        />
        <button onClick={callOpenAIAPI}>
            Submit
        </button>
      </div>
 
 
      <div className='output'>
        <p>
          {response}
        </p>
      </div>
    </div>

  )
}

export default App
