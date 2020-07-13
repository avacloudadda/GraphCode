import React, { useState,PureComponent } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  PieChart, Pie, Sector, Cell,
// } from 'recharts';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  PieChart, Pie
} from 'recharts';
/*jshint -W030 */
function App() {
  
  const [fileData, setFileData] = useState();
  const [resData, setResData] = useState([]);
  const [internalBarData,setinternalBarData]=useState([]);
  const [internalPieData,setinternalPieData]=useState([]);
  // const dataval = [
  //   {
  //     month: 'jan', pv: 0.60, per: 0.60,
  //   },
  //   {
  //     month: 'feb', pv: 0.70, per: 0.70,
  //   },

  // ];
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#e74c3c'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
// }) => {
//    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
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

          let graphArrVal =[...response.data.message];
          //console.log(graphArrVal);
          let internalGraphArr;
          let internalPieChartArr;
          for(let i=0;i<graphArrVal.length;i++)
          {
            if(i===0)
            {
              //console.log(graphArrVal["0"]);
              internalGraphArr = [...graphArrVal["0"]];
              setinternalBarData([...internalBarData,internalGraphArr]);
            }
            else if(i===1){
               internalPieChartArr = [...graphArrVal["1"]];
               setinternalPieData([...internalPieData,internalPieChartArr]);
            }
           
          }
         
          setResData([...resData, response.data.message]);




        }

      );

  }

  // function DrawChart(gdata) {
  //   console.log(gdata);

  //   let graphArrVal =[...gdata];
  //   let internalGraphArr=[];
  //   let internalPieChartArr =[];
  //   for(let i=0;i<graphArrVal.length;i++)
  //   {
  //     if(i===0)
  //     {
  //       internalGraphArr = [...graphArrVal[0][i]];
  //     }
  //     else if(i===1){
  //        internalPieChartArr = [...graphArrVal[1][i]];
  //     }
     
  //   }
  //    console.log(internalGraphArr);
  //   let keyNameArr = [];
  //   let count = 0;
    
  //   if(internalGraphArr.length>0)
  //   {
  //     for (var name in internalGraphArr[count]) {
  //       keyNameArr[count] = name;
  //       ++count;
  //     }
  //      <DrawBarChart chartData={internalGraphArr[0]} keyXName={keyNameArr[0]} keyYName={keyNameArr[1]}/>
  //   }
    
  //   if(internalPieChartArr.length>0){
  //     keyNameArr.pop();
  //     for (var name in internalPieChartArr[count]) {
  //       keyNameArr[count] = name;
  //       ++count;
  //     }
  //   //  <DrawPieChart chartData={internalPieChartArr}  keyYName={keyNameArr[1]} />
  //   }
   
  // }
  function DrawBarChart(props)
  {
    let graphData = [...props.chartData[0]];
    let keyNameArr = [];
    let count = 0;
   // console.log(graphData);
    // console.log(graphData[0]);
    for (var name in graphData[count]) {
      keyNameArr[count] = name;
      ++count;
    }
  //  console.log(keyNameArr[0]+keyNameArr[1]);
    return (
      <div>
        <BarChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
        {/* dataKey={keyNameArr[0]} */}
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
  // function DrawPieChart(props)
  // {
  //   let graphData = [...props.chartData[0]];
  //   console.log(graphData);
  //   let keyNameArr = [];
  //   let count = 0;
  //   for (var name in graphData[count]) {
  //     keyNameArr[count] = name;
  //     ++count;
  //   }
  //   return (
  //     <PieChart width={400} height={400}>
  //       <Pie
  //         data={graphData}
  //         cx={200}
  //         cy={200}
  //         labelLine={false}
  //         label={renderCustomizedLabel}
  //         outerRadius={80}
  //         fill="#8884d8"
  //         dataKey={keyNameArr[1]}
  //       >
  //         {
  //           graphData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
  //         }
  //       </Pie>
  //     </PieChart>
  //   );
  // }
   function DrawPieChart(props)
  {
    let graphData = [...props.chartData[0]];
    console.log(graphData);
    let keyNameArr = [];
    let count = 0;
    for (var name in graphData[count]) {
      keyNameArr[count] = name;
      ++count;
    }
    console.log(keyNameArr[1]);
    return (
      <PieChart width={400} height={400}>
        <Pie dataKey={keyNameArr[1]} isAnimationActive={false} data={graphData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
      
        <Tooltip />
      </PieChart>
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
      {/* {
        resData.length > 0 ?
          DrawChart(resData)
          : null
      } */}
{
  internalBarData.length >0? <DrawBarChart chartData={internalBarData} />:null
}
     
{
  internalPieData.length >0?    <DrawPieChart chartData={internalPieData} />:null
}
   
      {/* <BarChart />
      <PieChart /> */}
    </div>
  );
}

export default App;
