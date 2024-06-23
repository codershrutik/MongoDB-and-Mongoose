const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch(err=>{
        console.log("Error connecting to MongoDB",err)
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function(){
    return `${this.first} ${this.last}`
});

personSchema.pre('save',async function(){
    this.first = 'Hi';
    this.last = 'Baby';
    console.log("About to save")
})
personSchema.post('save',async function(){
    console.log("Just saved")
})

const Person = mongoose.model('Person',personSchema);