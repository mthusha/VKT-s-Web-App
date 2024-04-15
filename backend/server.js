const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const session = require('express-session'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const app = express();
app.use(cors(
  {
    origin:["http://localhost:3000"],
    methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({ 
  secret: 'Mykey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password: '',
    database : 'vkt_database'
    
    })

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

const verify =(req, res, next)=>{
  const token  = req.cookies.token;
  if(!token){
    return res.json({ message:"No Token Provided"})
  }else{
    jwt.verify(token, "Mykey" ,(err, decoded)=> {
      if(err) {
        return res.json({ message: 'Failed to authenticate token.' });
      }else{
        req.email = decoded.email;
        req.role = decoded.role;
        next();
      }
    })
  }
}

app.get('/',verify,(req,res)=>{
  return res.json({Status:"Success", email:req.email,role: req.role })
} )

// endpoint.

// login
app.post('/loginb', (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (data.length > 0) {
      const secondColumnData = data[0].role;
      const email = data[0].email;
      const token = jwt.sign({email},"Mykey",{expiresIn:'1d'});
      res.cookie('token',token)
     console.log(email);
      return res.status(200).json({ message: 'Login Successfully', secondColumnData });
    } else {
      return res.json({ message:'Incorrect email or password'});
    }
  });
});


// app.post('/logout', (req, res) => {
  
//   res.clearCookie('token');
//   // req.session.destroy((err) => {
//   //   if (err) {
//   //     return res.status(500).json({ error: 'Failed to destroy session' });
//   //   } else {
//   //     return res.status(200).json({ message: 'Logout successful' });
//   //   }
//   // });
// });


//fetch user data based on email
app.get('/userData/:email', (req, res) => {
  const userEmail = req.params.email;
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [userEmail], (err, data) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      const username = data[0];
      return res.status(200).json(username);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
});

//fetch pros data based on email in base table
app.get('/prosData/:email', (req, res) => {
  const userEmail = req.params.email;
  const sql = "SELECT * FROM provider WHERE email = ?";
  db.query(sql, [userEmail], (err, data) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      const username = data[0];
      return res.status(200).json(username);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
});
// fetch service status id's for pros
app.get("/ssId/:id", (req, res) => {
  const userId = req.params.id;
   const sql = "SELECT * FROM service_status WHERE provider_id = ?";
   db.query(sql, [userId], (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        
      }));
      return res.json(formattedData);
     } else {
       return res.json({ message :'data not found' });
     }
   });
 });
 //service request data by requat_id
 app.get("/servicerequestData/:id", (req, res) => {
  const id = req.params.id; 
  const sql = "SELECT * FROM required_service WHERE requst_id = ?";
  db.query(sql, [id], (err, data) => { 
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
     const formattedData = data[0]
     return res.json(formattedData);
    } else {
      return res.json({ message :'No requst found' });
    }
  });
});

// Ets.Close Date
app.put("/est_date/:id", (req, res) => {
  const id = req.params.id;
  const { date} = req.body;
  const sql = `UPDATE service_status SET end_time=?, chk=? WHERE status_id=?`;
  db.query(sql, [date ,1,id], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: 'Record updated successfully', id });
  });
});


 // fetch service req data for pros table
app.get("/userdata_p/:id", (req, res) => {
  const userId = req.params.id;
   const sql = "SELECT u.*, s.description, rs.email,ss.status_id,rs.requst_id,ss.start_time,ss.chk FROM user u INNER JOIN service_status ss ON ss.user_id = u.id INNER JOIN provider p ON ss.provider_id = p.provider_id INNER JOIN service s ON ss.service_id=s.service_id INNER JOIN required_service rs ON ss.request_id = rs.requst_id WHERE p.provider_id = ?";
   db.query(sql, [userId], (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        
      }));
      return res.json(formattedData);
     } else {
       return res.json({ message :'data not found' });
     }
   });
 });





// all user data
app.get("/userData", (req, res) => {
   const sql = "SELECT * FROM user";
   db.query(sql, (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        
      }));
      return res.json(formattedData);
     } else {
       return res.json({ message :'No user found' });
     }
   });
 });

 // all pros data
app.get("/prosData", (req, res) => {
  const sql = "SELECT * FROM provider";
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
     const formattedData = data.map(item => ({
       ...item,
       
     }));
     return res.json(formattedData);
    } else {
      return res.json({ message :'No pros found' });
    }
  });
});



// all service request data
app.get("/servicerequestData", (req, res) => {
  const sql = "SELECT * FROM required_service";
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
     const formattedData = data.map(item => ({
       ...item,
       
     }));
     return res.json(formattedData);
    } else {
      return res.json({ message :'No requst found' });
    }
  });
});



//User Update
app.put("/updateuser/:email", (req, res) => {
  const email = req.params.email;
  const { name, last_name, phone } = req.body;
  const sql = `UPDATE user SET name=?, last_name=?, phone=? WHERE email=?`;
  db.query(sql, [name, last_name, phone, email], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: 'Record updated successfully', email });
  });
});

// pass change
app.put("/updatepassword/:email", (req, res) => {
  const email = req.params.email;
  const {newPass} = req.body;
  const sql = `UPDATE user SET password=? WHERE email=?`;
  db.query(sql, [newPass, email], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: 'Record updated successfully', email });
  });
});
// admin status update
app.put("/updateStatus/:status_id", (req, res) => {
  const statusid = req.params.status_id;
  const {status} = req.body;
  const sql = `UPDATE service_status SET status=? WHERE status_id=?`;
  db.query(sql, [status, statusid], (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: 'Record updated successfully'});
  });
});

// user register
app.post('/useradd', (req, res) => {
  const { name, last_name, email, role, password, phone } = req.body;
  
  if (!name || !last_name || !email || !password) {
    console.log('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check for duplicate email
  const checkDuplicateSql = 'SELECT * FROM `user` WHERE `email` = ?';
  db.query(checkDuplicateSql, [email], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to check for duplicate email.' });
    }

    if (rows.length > 0) {
      return res.json({ message: 'Email already exists.' });
    }

    // Insert new user
    const insertSql = 'INSERT INTO `user` (`name`, `last_name`, `email`, `phone`, `role`, `password`) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertSql, [name, last_name, email, phone, role, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert record.' });
      }

      // Log in the new user
      const loginSql = "SELECT * FROM user WHERE email = ? AND password = ?";
      db.query(loginSql, [email, password], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        if (data.length > 0) {
          const secondColumnData = data[0].name;
          const email = data[0].email;
          const token = jwt.sign({ email }, "Mykey", { expiresIn: '1d' });
          res.cookie('token', token);
          return res.status(200).json({ message: 'Login Successfully', secondColumnData });
        } else {
          return res.status(401).json({ message: 'Incorrect email or password' });
        }
      });
    });
  });
});

// service require
app.post('/sr_requir', (req, res) => {
  const { requst_id, user_id,service_id ,service_name, type_of_service,need_item,need_item_count,cut_wall_st,ladder_height,purchasing_item_st,anything,time,date,email,phone } = req.body;
  const currentDate = new Date().toISOString().split('T')[0];
  //  if (!user_id || !service_id || !service_name || !type_of_service || !email || !phone) {
  //    return res.status(400).json({ error: 'All fields are required.' });
  //  }
    const sql = 'INSERT INTO `required_service` ( `user_id`, `service_id`, `service_name`, `type_of_service`, `need_item`, `need_item_count`, `cut_wall_st`, `ladder_height`, `purchasing_item_st`, `anything`, `time`,`curren_date` ,`date`,`email`, `phone`) VALUES ( ? ,?,?, ?,?,?,?,?,?,?,?,?,?,?,?)';
    db.query(sql, [ user_id,service_id ,service_name, type_of_service,need_item,need_item_count,cut_wall_st,ladder_height,purchasing_item_st,anything,time,currentDate,date,email,phone ], (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert record.' });
      }
      return res.status(201).json({ message: 'Record inserted successfully', insertId: result.insertId });
    });
  });
//add timeline
app.post('/addtimeline', (req, res) => {
  const {service_id, distribution,nd_description  } = req.body;
  const currentDate = new Date().toISOString().split('T')[0];
    const sql = 'INSERT INTO `timeline` (`status_id`, `distribution`, `2nd_description`, `date`) VALUES ( ? ,?,?, ?)';
    db.query(sql, [ service_id,distribution,nd_description,currentDate ], (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert record.' });
      }
      return res.status(201).json({ message: 'Record inserted successfully', insertId: result.insertId });
    });
  });
// fetch timeline
app.get("/timeline/:id", (req, res) => {
  const user_id = req.params.id;
   const sql = "SELECT * FROM `timeline` WHERE `status_id` = ?";
   db.query(sql, [user_id], (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        
      }));
      return res.json(formattedData);
     } else {
       return res.json({ message :'Data not found' });
     }
   });
 });

  //servicebox data
  app.get("/servicebox/:id", (req, res) => {
    const user_id = req.params.id;
     const sql = "SELECT rs.service_name, rs.type_of_service, rs.time, rs.email AS service_email, rs.phone, ss.start_time, ss.end_time, ss.status, rs.requst_id , p.firsr_name AS provider_firsr_name, p.last_name AS provider_last_name, p.phone AS provider_email FROM user u INNER JOIN required_service rs ON u.id = rs.user_id LEFT JOIN  service_status ss ON rs.requst_id = ss.request_id INNER JOIN provider p ON ss.provider_id = p.provider_id WHERE u.id = ? OR ss.user_id IS NULL";
     db.query(sql, [user_id], (err, data) => {
       if (err) {
         console.error('Error fetching user data:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       }
       if (data.length > 0) {
        const formattedData = data.map(item => ({
          ...item,
          
        }));
        return res.json(formattedData);
       } else {
         return res.json({ message :'User not found' });
       }
     });
   });

   // active service
   app.get("/active", (req, res) => {
    const user_id = req.params.id;
     const sql = "SELECT DISTINCT rs.service_name,u.name, ss.status_id, s.description, rs.type_of_service, rs.time, rs.email AS service_email, rs.phone, ss.start_time, ss.end_time, ss.status, rs.requst_id, p.firsr_name AS provider_firsr_name, p.last_name AS provider_last_name, p.phone AS provider_email FROM user u INNER JOIN required_service rs ON u.id = rs.user_id LEFT JOIN service_status ss ON rs.requst_id = ss.request_id INNER JOIN provider p ON ss.provider_id = p.provider_id INNER JOIN service s ON ss.service_id = s.service_id;";
     db.query(sql, [user_id], (err, data) => {
       if (err) {
         console.error('Error fetching user data:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       }
       if (data.length > 0) {
        const formattedData = data.map(item => ({
          ...item,
          
        }));
        return res.json(formattedData);
       } else {
         return res.json({ message :'No active service at the moment' });
       }
     });
   });

  //servicebox data
  app.get("/servicedetail/:id", (req, res) => {
    const user_id = req.params.id;
     const sql = "SELECT rs.service_name, rs.type_of_service, rs.time, rs.email AS service_email, rs.phone,ss.status_id, ss.start_time, ss.end_time, ss.status, rs.requst_id, p.firsr_name AS provider_firsr_name, p.last_name AS provider_last_name,p.address AS p_add, p.phone AS provider_email FROM user u INNER JOIN required_service rs ON u.id = rs.user_id LEFT JOIN  service_status ss ON rs.requst_id = ss.request_id INNER JOIN provider p ON ss.provider_id = p.provider_id WHERE rs.requst_id = ? OR rs.requst_id IS NULL";
     db.query(sql, [user_id], (err, data) => {
       if (err) {
         console.error('Error fetching user data:', err);
         return res.status(500).json({ error: 'Internal Server Error' });
       }
       if (data.length > 0) {
        const S_Data = data[0];
        return res.status(200).json(S_Data);
       } else {
         return res.json({ message :'User not found' });
       }
     });
   });



 
//waiting data
app.get("/waiting/:id", (req, res) => {
  const user_id = req.params.id;
  const sql ="SELECT * FROM `required_service` WHERE `user_id` = ?"
   db.query(sql, [user_id], (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        
      }));
      return res.json(formattedData);
     } else {
       return res.json({ message :'User not found' });
     }
   });
 });

 //waitting all data
 app.get("/waiting_all", (req, res) => {
  const user_id = req.params.id;
  const sql ="SELECT rs.*, s.description AS service_description FROM required_service rs JOIN service s ON rs.service_id = s.service_id"
   db.query(sql, [user_id], (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        
      }));
      return res.json(formattedData);
     } else {
       return res.json({ message :'User not found' });
     }
   });
 });
/// add work
 app.post('/add_requir', (req, res) => {
  const { service_id, user_id, provider_id, request_id, start_time, end_time, status } = req.body;
  const mt=0;
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sql2 = `UPDATE required_service SET status='0' WHERE requst_id=?`;
  db.query(sql2, [request_id], (err2, result2) => {
    if (err2) {
      console.error('SQL error:', err2);
      console.error(err2);
      return res.status(500).json({ error: 'Failed to update required_service table.' });
    }
    
    const sql = 'INSERT INTO `service_status` ( `service_id`, `user_id`, `provider_id`, `request_id`, `start_time`, `end_time`, `status`,`chk`) VALUES (?,?,?,?,?,?,?,?)';
    db.query(sql, [service_id, user_id, provider_id, request_id, end_time, end_time, status, mt], (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert record into service_status table.' });
      }
      return res.status(201).json({ message: 'Record inserted successfully', insertId: result.insertId });
    });
  });
});

// add pros
app.post('/prosadd', (req, res) => {
  const { first_name, last_name, address, role, phone, email, password } = req.body;
  if (!last_name || !email || !password) {
    console.log('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const checkDuplicateSql = 'SELECT * FROM `user` WHERE `email` = ?';
  db.query(checkDuplicateSql, [email], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to check for duplicate email.' });
    }
    if (rows.length > 0) {
      return res.json({ message: 'Email already exists.' });
    }
    // Insert into the 'provider' table
    const insertProviderSql = 'INSERT INTO `provider` (`firsr_name`, `last_name`, `address`, `phone`, `email`, `status`) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertProviderSql, [first_name, last_name, address, phone, email, 'Wait for response'], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert record into provider table.' });
      }
      // Insert into the 'user' table
      const insertUserSql = 'INSERT INTO `user` (`name`, `last_name`, `email`, `phone`, `role`, `password`) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(insertUserSql, [first_name, last_name, email, phone, role, password], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to insert record into user table.' });
        }
        return res.status(201).json({ message: 'Record inserted successfully', insertId: result.insertId });
      });
    });
  });
});

  
// popular data fetch
app.get('/popolar', (req, res)=> {
  const sql = "SELECT * FROM popolar";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      // Convert the Blob image data to a Base64 encoded string
      data.forEach((item) => {
        item.ct_image = item.ct_image.toString('base64');
      });
      return res.json(data);
    }
  });
});


// Service data fetch
app.get('/service_data', (req, res) => {
  const sql = "SELECT * FROM service";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    
 
    const formattedData = data.map(item => ({
      ...item,
      icon: item.icon.toString('base64') 
    }));

    return res.json(formattedData);
  });



});
// Service data fetch
app.get('/service_data', (req, res) => {
  const sql = "SELECT * FROM service";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    
    const formattedData = data.map(item => ({
      ...item,
      icon: item.icon.toString('base64') 
    }));

    return res.json(formattedData);
  });
});

// payment details
app.get("/payment/:id", (req, res) => {
  const serviceId = req.params.id;
  const sql ="SELECT * FROM `payment` WHERE `status_id` = ?"
   db.query(sql, [serviceId], (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        
      }));
      return res.json(formattedData);
     } else {
       return res.json({ message :'Payments not found' });
     }
   });
 });


// add payment
app.post('/addpayment', (req, res) => {
  const { description,cost,status_id, status } = req.body;
  const currentDate = new Date().toISOString().split('T')[0];
    const sql = 'INSERT INTO `payment` ( `description`, `cost`, `status_id`, `date`, `status`) VALUES( ? ,?,?, ?,?)';
    db.query(sql, [description,cost,status_id, currentDate ,status], (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert record.' });
      }
      return res.status(201).json({ message: 'Record inserted successfully', insertId: result.insertId });
    });
  });
  
// fetch paymeent details
app.get("/payments", (req, res) => {
  const sql = "SELECT * FROM `payment`";
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
      }));
      return res.json(formattedData);
    } else {
      return res.json({ message: 'Payments not found' });
    }
  });
});

// fetch expenditure details
app.get("/expenditure", (req, res) => {
  const sql = "SELECT * FROM `provider_salary`";
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
      }));
      return res.json(formattedData);
    } else {
      return res.json({ message: 'salary not found' });
    }
  });
});


 // get feedback
 app.get("/feeback/:id", (req, res) => {
  const serviceId = req.params.id;
  const sql ="SELECT * FROM `feedback` WHERE `status_id` = ?"
   db.query(sql, [serviceId], (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        
      }));
      return res.json(formattedData);
     } else {
       return res.json({ message :'feedback not found' });
     }
   });
 });
 // add feedback
 app.post('/addfeedback', (req, res) => {
  const { serviceId,sender, feedback_mgs } = req.body;
  const currentDate = new Date().toISOString().split('T')[0];
    const sql = 'INSERT INTO `feedback` (`status_id`, `sender`,`message`, `date`) VALUES( ? ,?,?,?)';
    db.query(sql, [serviceId, sender,feedback_mgs, currentDate ], (err, result) => {
      if (err) {
        console.error('SQL error:', err);
        console.error(err);
        return res.status(500).json({ error: 'Failed to insert record.' });
      }
      return res.status(201).json({ message: 'Record inserted successfully', insertId: result.insertId });
    });
  });



// service details for pros by ss.status_id
// fetch service data for pros
app.get("/servicedata_pros/:id", (req, res) => {
  const selectedOption = req.params.id;
   const sql = "SELECT rs.service_name,s.description AS sd, rs.type_of_service, rs.email , rs.phone, ss.start_time, ss.end_time, ss.status, u.email AS user_mail,u.name AS user_firsr_name, u.last_name AS user_last_name, u.phone AS user_email FROM service_status ss INNER JOIN required_service rs ON ss.request_id = rs.requst_id LEFT JOIN user u ON u.id = ss.user_id INNER JOIN provider p ON ss.provider_id = p.provider_id INNER JOIN service s ON s.service_id = ss.service_id WHERE ss.status_id=?";
   db.query(sql, [selectedOption], (err, data) => {
     if (err) {
       console.error('Error fetching user data:', err);
       return res.status(500).json({ error: 'Internal Server Error' });
     }
     if (data.length > 0) {
      const S_Data = data[0]
      return res.status(200).json(S_Data);
     } else {
       return res.json({ message :'User not found' });
     }
   });
 });
// delete requst
app.delete("/requst_d/:id", (req, res) => {
  const id = req.params.id;
  const sql ="DELETE FROM `required_service` WHERE `requst_id` = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting feedback:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows > 0) {
      return res.json({ message: 'requst deleted successfully' });
    } else {
      return res.json({ message: 'requst not found' });
    }
  });
});

//delete user
app.delete("/user_d/:id", (req, res) => {
  const id = req.params.id;
  const sql ="DELETE FROM `user` WHERE `id` = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting feedback:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows > 0) {
      return res.json({ message: 'requst deleted successfully' });
    } else {
      return res.json({ message: 'requst not found' });
    }
  });
});


// provider availabile status update
app.post('/prosStatus/:email', (req, res) => {
  const email = req.params.email;
  db.query('SELECT status FROM provider WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error fetching provider status:', err);
      res.sendStatus(500);
      return;
    }
    const newStatus = result[0].status === 'Available' ? 'Unavailable' : 'Available';
    db.query('UPDATE provider SET status = ? WHERE email = ?', [newStatus, email], (err, result) => {
      if (err) {
        console.error('Error updating provider status:', err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});


// app.get('/', (req, res) => {
//   return res.json("Backend is up and running!");
// });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



