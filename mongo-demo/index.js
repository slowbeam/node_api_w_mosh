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

    async function getCourses() {
        return await Course
        .find({ isPublished: true})
        .or( { price: { $gte: 15} },
             { name: /.*by.*/i }
        )
        

        // Starts with Mosh
        // .find({ author: /^Mosh/ })

        // Ends with Hamedani
        // .find({ author: /Hamedani$/i })

        // Filter the search to only display certain attributes
        // .select({ name: 1, author: 1, _id: 0})

        // Contains the word Mosh
        // .find({ author: /.*Mosh.*/i })

        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        
        // .count()
      
    }

    // async function run() {
    //     const courses = await getCourses();
    //     console.log(courses);
    // }

    // run();

    async function updateCourse(id) {
        // Approach 1: query first
        // findById()
        // Modify its properties
        // save

        // const course = await Course.findById(id);
        // if (!course) return;

        // course.isPublished = true;
        // course.author = 'Another Author';
        
        // const result = await course.save();
        // console.log(result);

        // Approach 2: update first
        // findById()
        // Modify its properties
        // save() 

        const result = await Course.findByIdAndUpdate( id, {
            $set: {
                author: 'BABA',
                isPublished: false
            }
        }, {new: true} );

        console.log(result);

        
    }
    

    async function removeCourse(id) {
        // const result = await Course.deleteOne({ _id: id });
        const result = await Course.findByIdAndRemove( id );
        console.log(result);
        
    }

    removeCourse('5ca26d6e1c9d4400004b912a');
    
   
}

getCourses();