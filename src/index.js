const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieApp',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('connected to database');

        const movieSchema = new mongoose.Schema({
            title: String,
            year: Number,
            score: Number,
            rating: String
        });

        const Movie = mongoose.model('Movie',movieSchema);

        console.log('Inserting movies...');

        Movie.insertMany([
            {title: 'Iron Man',year: 2008, score: 7.9, rating: 'PG-13'},
            {title: 'Iron Man 2',year: 2010, score: 6.9, rating: 'PG-13'},
            {title: 'The Avengers', year: 2012, score: 8.0, rating: 'PG-13'},
            {title: 'Iron Man 3', year: 2013, score: 7.1, rating: 'PG-13'},
            {title: 'Thor', year: 2011, score: 7.0, rating: 'PG-13'}
        ])
        .then(data => {
            console.log('Many movies added');
            console.log(data);
            mongoose.connection.close();  // Close the connection after the operation
        })
        .catch(err => {
            console.log("ERROR!");
            console.log(err);
            mongoose.connection.close();  // Close the connection in case of an error
        });

    })
    .catch((err)=>{
        console.log("ERROR!")
        console.log(err)
    });