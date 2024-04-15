import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


const Billing = () => {
  const [totalPayments, setTotalPayments] = useState({});
  const [payments, setPayments] = useState([]);
  const [salary, setSalary]= useState([]); 
  const [serviceCount1, setServiceCount1] = useState(0);
  const [serviceCount2, setServiceCount2] = useState(0);
  const [serviceCount3, setServiceCount3] = useState(0);
  const [serviceCount4, setServiceCount4] = useState(0);
  const [serviceCount5, setServiceCount5] = useState(0);
  // line chart
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Expenditure',
        data: [0],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        lineTension: 0.4,
      },
      {
        label: 'Income',
        data: [1],
        borderColor: 'Green',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        lineTension: 0.4,
      }
    ]
  });

  
  // Fetch payment data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/payments`);
        const responseData = await response.json();
  
        if (Array.isArray(responseData)) {
          setPayments(responseData);
        } else {
          console.error("Response data is not an array:", responseData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSalary = async () => {
      try {
        const response = await fetch(`http://localhost:8081/expenditure`);
        const responseData = await response.json();
  
        if (Array.isArray(responseData)) {
          setSalary(responseData);
        } else {
          console.error("Response data is not an array:", responseData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    
  fetchSalary();
    fetchData();
  }, []);

// Update chart data based on payment data
useEffect(() => {
  const totalCostByMonth = {};
  const totalSalaryByMonth = {};
  const currentMonth = new Date().getMonth(); // Get the current month index
  payments.forEach(payment => {
    const date = new Date(payment.date);
    const monthIndex = date.getMonth(); 
    if (totalCostByMonth[monthIndex]) {
      totalCostByMonth[monthIndex] += payment.cost;
    } else {
      totalCostByMonth[monthIndex] = payment.cost;
    }
  });
  for (let i = 0; i < 12; i++) {
    if (!(i in totalCostByMonth) && i === currentMonth) {
    
      totalCostByMonth[i] = 0;
    }
  }

  // for salary
  salary.forEach(salary => {
    const date = new Date(salary.date);
    const monthIndex = date.getMonth(); 
    if (totalSalaryByMonth[monthIndex]) {
      totalSalaryByMonth[monthIndex] += salary.salary;
    } else {
      totalSalaryByMonth[monthIndex] = salary.salary;
    }
  });
  for (let i = 0; i < 12; i++) {
    if (!(i in totalSalaryByMonth) && i === currentMonth) {
    
      totalSalaryByMonth[i] = 0;
    }
  }
  const sortedTotalSalaryByMonth = Object.fromEntries(
    Object.entries(totalSalaryByMonth).sort(([monthIndexA], [monthIndexB]) => monthIndexA - monthIndexB)
  );
  const totalSalaryData = Object.values(sortedTotalSalaryByMonth);
  
   const hasRedData2 = totalSalaryData.some(data => data > 0);
//
  const sortedTotalCostByMonth = Object.fromEntries(
    Object.entries(totalCostByMonth).sort(([monthIndexA], [monthIndexB]) => monthIndexA - monthIndexB)
  );
  const totalCostData = Object.values(sortedTotalCostByMonth);
  
  const hasRedData = totalCostData.some(data => data > 0);
  const greenData = totalCostData.map(data => hasRedData ? 0 : data);
  setChartData(prevChartData => ({
    ...prevChartData,
    datasets: [
      {
        ...prevChartData.datasets[0],
        data:totalSalaryData,
      },
      {
        ...prevChartData.datasets[1],
        data: totalCostData,
      }
    ]
    
  }));
  console.log(totalCostData)
  
  setTotalPayments(sortedTotalCostByMonth);
}, [payments]);


  
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Income & Expenditure 2024'
      }
    },
    scales: {
      y: {
        stacked: false
      }
    }
  };
  // fetch request data
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`http://localhost:8081/servicerequestData`);
        const responseData = await response.json();
  
        if (Array.isArray(responseData)) {
          countServiceIds(responseData);
        } else {
          console.error("Response data is not an array:", responseData);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchRequest();
  }, []);
 // Function to count occurrences of each service ID
const countServiceIds = (data) => {
  // Initialize counts object to keep track of each service count
  const counts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  // Count occurrences of each service ID
  data.forEach((request) => {
    const { service_id } = request;
    counts[service_id]++;
  });

  // Update state for each service count
  setServiceCount1(counts[1]);
  setServiceCount2(counts[2]);
  setServiceCount3(counts[3]);
  setServiceCount4(counts[4]);
  setServiceCount5(counts[5]);
};
  // Doughnut chart
  const doughnutData = {
    labels: ['Construction', 'Painting', 'Plumbing', 'Electrical', 'Roofing'],
    datasets: [
      {
        label: 'Services',
        data:[serviceCount1, serviceCount2, serviceCount3, serviceCount4, serviceCount5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Distribution of Services 2024'
      },
      legend: {
        display: false 
      },
      datalabels: {
        display: false 
      }
    }
  };


  return (
    <div className='billing'>
       <div className='container_bm'>
          <div className='flex_box_bm'>
        
            <div className='row_bm'>
            <div style={{margin:'20px'}} className='title_box'>
            <h6>Income & Expenditure </h6>
          </div>
                <div className='row_inline'>
                    <div className='row_inline flex'>
                        <div>
                            <div className='total_boxmb'>
                            <div  className='ad_project_table'>
                            <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Month</th>
                    {chartData.labels.map((label, index) => (
                      <th key={index}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{color:'green', fontSize:'13px'}}>Total Revenue</td>
                    {chartData.datasets[1].data.map((data, index) => (
                      <td style={{fontSize:'12px'}} key={index}>{data}</td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{color:'red', fontSize:'13px'}}>Total Expenditure</td>
                    {chartData.datasets[0].data.map((data, index) => (
                      <td style={{fontSize:'12px'}} key={index}>{data}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
                    </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='row_inline'>
                    <div style={{display:'flex',justifyContent:'space-between'}} className='flex_box_bt'>
                        
                        <div  style={{ boxSizing: 'border-box', display: 'block', height: '390px', width: '800px',margin:'20px' }}> <Line data={chartData} options={chartOptions} /></div>
                    </div>

               
                </div>
                </div>
            <div className='row_bm'>
              <div className='m_left'>
              <div className='title_box_mtp' >
                <p style={{fontWeight:'bold'}}>Ivoice</p>
              </div>
              </div>
            </div>
         </div>
         <div style={{justifyContent:'space-between'}} className='flex_box_bm'>
         <div className='row_bm'>
          <div style={{margin:'20px'}} className='title_box'>
            <h6>Avarage service </h6>
          </div>
          <div className='bil_table'>
          <div style={{width:'150%'}} className='ad_project_table'>
          <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>Service id</th>
                                    <th>Service</th>
                                    <th>Request</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{fontSize:'12px'}}>#1</td>
                                    <td style={{fontSize:'14px',fontWeight:"bold",color:'rgba(255, 99, 132, 0.6)'}}>Construction</td>
                                    <td style={{fontSize:'12px'}}>{serviceCount1}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>#2 </td>
                                    <td style={{fontSize:'14px',fontWeight:"bold",color:'rgba(54, 162, 235, 0.6)'}}>Painting</td>
                                    <td style={{fontSize:'12px'}}>{serviceCount2}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>#3 </td>
                                    <td style={{fontSize:'14px',fontWeight:"bold",color:'rgba(255, 206, 86, 0.6)'}}>Plumbing</td>
                                    <td style={{fontSize:'12px'}}>{serviceCount3}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>#4 </td>
                                    <td style={{fontSize:'14px',fontWeight:"bold",color:'rgba(75, 192, 192, 0.6)'}}>Electrical</td>
                                    <td style={{fontSize:'12px'}}>{serviceCount4}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'12px'}}>#5 </td>
                                    <td style={{fontSize:'14px',fontWeight:"bold",color:'rgba(153, 102, 255, 0.6)'}}>Roofing</td>
                                    <td style={{fontSize:'12px'}}>{serviceCount5}</td>
                                </tr>
                            </tbody>
                        </table>
          </div>
          </div>
         </div>
         <div className='row_bm'>
          <div className='d_chart'>
          <Doughnut style={{marginLeft:'150px'}} data={doughnutData} options={doughnutOptions} />

          </div>
         </div>
         </div>
       </div>
    </div>
  )
}

export default Billing