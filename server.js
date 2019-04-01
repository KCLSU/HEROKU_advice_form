var express = require('express')
var app = express();
var PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send("SUCCESS");
})

app.post('/', (req, res) => {
  let testString = req.params.stri;
  res.status(200).json({testString: testString});
})

app.listen(PORT, () => {
  console.log("The server is running and listening on port " + PORT)
});
