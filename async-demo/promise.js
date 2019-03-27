// An object that holds the eventual result of an asynchronous operation
// A promise either gives a result(value) or an error

// Promises have 3 states

// Pending: This means the promise was initialized and will kick off an Async operation

// Fulfilled: This means the promise was able to resolve and return a value

// Rejected" This means the promise was not able to resolve and instead returned an error

const p = new Promise((resolve, reject) => {
    // Kick off some async work
    // ...
    setTimeout(() => {
        // resolve(1);
        reject(new Error('error message'));
    }, 2000);
    
    
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));
