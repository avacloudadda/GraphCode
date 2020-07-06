const express = require('express');
const xlsx = require('xlsx');

const fileupload = require('express-fileupload');

const cors = require('cors')
const app = express();
const port = 4000;

app.use(fileupload());
app.use(cors());
app.get('/', (req, res) => res.send('Hello Nodemon working!!!'));

app.post('/upload', (req, res, next) => {
   // console.log(req);

    const file = req.files.fileData

    file.mv(__dirname+"/upload/"+file.name,function(err,result){
         if(err)
         {
             console.log(err);
         }
         else{
var wb = xlsx.readFile(__dirname+"/upload/"+file.name)
   var ws = wb.Sheets["Data"];
   var data = xlsx.utils.sheet_to_json(ws);
     console.log(data);

            res.send({
                success: true,
                message: data,
            })
         }
    })

   

});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))