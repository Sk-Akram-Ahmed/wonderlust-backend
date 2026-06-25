const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path = require('path');
app.set("view engine" , " ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));
main().then(()=>{
    console.log('Connected to the Database');

})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}
const Listing =require('./models/listing.js');

//index route 
app.get('/listings',async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})
//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id",async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
    
})


//create route
app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.listings);
    await newListing.save();
    res.redirect("/listings");
}
    
)



app.get
app.listen(8080,()=>{
    console.log('Server is running on the port 8080');
})