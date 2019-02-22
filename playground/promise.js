

let somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('It worked!');
    reject('Unable to fullfill promise!')
  },2500);
});
somePromise.then((message) => {
  console.log('success: ',message);
},(err) => {
  console.log('Error: ',err);
});
