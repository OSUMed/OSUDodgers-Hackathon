import React, {useState, useEffect} from 'react';
import Axios from 'axios'


function Records() {
  
  const [player_name, setplayerName] = useState("");
  const [player_score, setplayerScore] = useState("");
  const [toprecordsList, setRecords] = useState([]);


  const submitScore = () => {
    Axios.post('http://localhost:3001/api/post', {
      player_name: player_name, 
      player_score: player_score,
    }).then(() => {
      setRecords([...toprecordsList, {player_name: player_name, player_score: player_score}])
      // alert('successful insert!!');
    });
  }


  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setRecords(response.data)
    })
  }
  )
  return (
    <div className="App">
        <label>Player Name: </label>
        <input 
          onChange={(e) => {
            setplayerName(e.target.value)
          }} />
        <label>Player Score: </label>
        <input 
          onChange={(e) => {
            setplayerScore(e.target.value)
          }} />

        <button onClick={submitScore} >Submit</button>




      <h1>Top Scores</h1>

      <div className="form">

        
        <table>
          <thead>
            <tr>
            <th>Player Name</th>
            <th>Player Score</th>
            </tr>
          </thead>
          <tbody>
          {toprecordsList.map((e)=> {
            return (
              <tr>
                <td>{e.player_name}</td>
                <td>{e.player_score}</td>
              </tr>

            );
        })}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Records;