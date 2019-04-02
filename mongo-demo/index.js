const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

mongoose.connect( mongoURI, { useNewUrlParser: true })
    .then(() => { console.log('Connected to MongoDB...')})
    .catch(err => console.error('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {   
                setTimeout(() => {
                    //Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);  
            },
            message: "A course should have at least one tag."
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});
   
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

    const course = new Course({
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        name: 'my course',
        price: 15.8
    })
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
       for (field in ex.errors)
        console.log(ex.errors[field].message);
    }
    

}

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


async function getCourses() {
    const courses = await Course
    .find({ _id: '5ca26e6e1c9d4400004b912b'})
    .sort({ name: 1})
    .select({name: 1, tags: 1, price: 1});
    console.log(courses[0].price);


    // .or( { price: { $gte: 15} },
    //         { name: /.*by.*/i }
    // )
    
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

getCourses();

