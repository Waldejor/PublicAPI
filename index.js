import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const API_URL = "https://api.frankfurter.app/";



// Show initial page

app.get("/", (req,res)  => {
    res.render("index.ejs");

});

// Get selected currency

app.post("/submit", async (req,res) => {
   console.log(req.body.choice);
   var currency = req.body.choice;
   try {
    const result = await axios.get(API_URL + "latest");
    var rate = result.data.rates[`${currency}`];
    console.log(result.data.rates[`${currency}`]);
    res.render("index.ejs", {content:{
                                   currency,
                                   rate}});

    
   } catch (error) {
    console.log(error);
    
   }

});

app.listen(port, () => {
    console.log(`api test server started on port ${port}`);
});
