//location api using postal code canada
//Zippopotam

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "api.zippopotam.us/CA/";
app.use(express.urlencoded());
app.use(express.json());



//Render the page
app.get("/", (req, res)=>{
    res.render("index.ejs");
});

//Check the postal code for location info
//using axios and the api{
app.post("/info", async (req, res) => {
    
    try{
        const code = req.body["coded"];
        const response = await axios.get("https://api.zippopotam.us/CA/"+code);
        const result = response.data;
        const resobj = result.places[0];
        console.log(resobj["place name"]);
        res.render("index.ejs", { 
            // post code, country, place name, state
            content: result,
            post: result["post code"],
            country: result["country"],
            place: resobj["place name"],
            state: resobj["state"]
        });

        

    }  catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: error.message,});
    }
   
});


app.listen(port , ()=>{
    console.log(`listening on port ${port}`);
});