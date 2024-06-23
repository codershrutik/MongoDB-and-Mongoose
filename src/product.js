const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch(err=>{
        console.log("Error connecting to MongoDB",err)
    })

const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

productSchema.methods.greet = function(){
    console.log('Hello, Hi!');
    console.log(`- from ${this.name}`)
}

productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    this.save();
}

productSchema.statics.fireSale = function(){
    return this.updateMany({},{onSale: true, price: 0});
}

const Product = mongoose.model('Product',productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Mountain Bike'})
    console.log(foundProduct)
    foundProduct.toggleOnSale();
    console.log(foundProduct)
}

Product.fireSale().then(res=>console.log(res))

// const bike = new Product({name: 'Mountain Bike',price: 50000});
// bike.save()
//     .then(data=>{
//         console.log("Data saved successfully",data)
//     })
//     .catch(err=>{
//         console.log("Error saving data",err)
//     });