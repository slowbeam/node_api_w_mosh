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

    const courses =  await Course
        // .find({ author: 'Mosh', isPublished: true })
        .find({ price: { $gte: 10 } })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses);
}

getCourses();