const order = false;

const breakfastPromise = new Promise( (resolve, reject)  => {
	setTimeout(() => {
		if (order) {
		resolve('Your order is complete!'); // The promise was fulfilled.
		} else {
		reject( Error('Oh no! There was a problem with your order.')); // The promise failed.
		}
	}, 3000);
});

console.log(breakfastPromise);
breakfastPromise
.then( val => console.log(val))
.catch( err => console.log(err));