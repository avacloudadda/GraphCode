import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function App() {
  const [fileData, setFileData] = useState();
  const [resData, setResData] = useState([]);
  // const dataval = [
  //   {
  //     month: 'jan', pv: 0.60, per: 0.60,
  //   },
  //   {
  //     month: 'feb', pv: 0.70, per: 0.70,
  //   },

  // ];
  function onClickHandler() {
    // console.log(setFileData);

    const url = "http://localhost:4000/upload/";
    var bodyFormData = new FormData();
    bodyFormData.append('fileData', fileData);

    axios({
      method: 'post',
      url: url,
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(
        response => {
          // console.log(response.data.message);



          setResData([...resData, response.data.message]);


        }

      );

  }

  function DrawChart(props) {
    let graphArrVal = props.gdata[0];
    let keyNameArr = [];
    let count = 0;
    for (var name in graphArrVal[count]) {
      keyNameArr[count] = name;
      ++count;
    }
    return (
      <div>
        <BarChart
          width={500}
          height={300}
          data={graphArrVal}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={keyNameArr[0]} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={keyNameArr[1]} fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" />  background={{ fill: '#eee' }} */}
        </BarChart>
      </div>
    );
  }
  function onchangeHandler(e) {
    
    let files = e.target.files;
    if(files.length>0)
    {
      console.log(files);
      //console.log(files[0]);
  
  
      //const formData =     e.target.result;
      setFileData(files[0]);
    }
    else{
      setFileData();
      resData.pop();
    }
   


  }

  return (
    <div className="App">
      <h1>Demo of Generating Graph Application</h1>

      <input type="file" name="file" onChange={onchangeHandler} />
      <button onClick={onClickHandler}>Upload</button>
      {
        resData.length > 0 ?
          <DrawChart gdata={resData} />
          : null
      }
    </div>
  );
}

export default App;
