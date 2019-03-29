const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

mongoose.connect( mongoURI, { useNewUrlParser: true })
    .then(() => { console.log('Connected to MongoDB...')})
    .catch(err => console.error('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
   
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: [ 'angular', 'frontend' ],
        isPublished: true
    })

    const result = await course.save();
    console.log(result);
}

async function getCourses() {

    // Comparison operators in MongoDB:
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

    // Logical operators
    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;

    const courses =  await Course
        .find({ author: 'Mosh', isPublished: true })

        // Starts with Mosh
        // .find({ author: /^Mosh/ })

        // Ends with Hamedani
        // .find({ author: /Hamedani$/i })

        // Contains the word Mosh
        // .find({ author: /.*Mosh.*/i })

        .skip()
        .limit(10)
        .sort({ name: 1 })
        .count()
    console.log(courses);
}

getCourses();