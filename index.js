const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({dest: 'uploads/'})

const app = new express()
app.get('/',(req,res)=>{
  res.send('hello service')
})
app.options('/upload', cors());
app.post('/upload',cors(), upload.single('file'), (req,res)=>{
  let filename = req.file.filename
  let params = {id: filename}
  res.send(JSON.stringify(params))
})


app.get('/preview/:key',cors(), (req,res)=>{
  res.sendFile(
    `uploads/${req.params.key}`,
    {
      root: __dirname,
      headers: {
        'Content-Type': 'image/jpeg',
      }
    },
    error=>{
      console.log(error)
    }
  )
})
const port = process.env.PORT || 3000

app.listen(port)