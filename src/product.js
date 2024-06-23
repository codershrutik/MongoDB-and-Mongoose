const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch(err=>{
        console.log("Error connecting to MongoDB",err)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL']
    }
    // onSale: Boolean
});

productSchema.methods.greet = function(){
    console.log('Hello, Hi!');
}

const Product = mongoose.model('Product',productSchema);

// const bike = new Product({name: 'Yamaha Bike',price: 50000});
// bike.save()
//     .then(data=>{
//         console.log("Data saved successfully",data)
//     })
//     .catch(err=>{
//         console.log("Error saving data",err)
//     });