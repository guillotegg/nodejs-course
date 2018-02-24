console.log('starting app');

setTimeout(() => {
    console.log('inside callback')
}, 2000);

setTimeout(() => {
    console.log('inside callback zero waiting')
}, 0);


console.log('finishin app');