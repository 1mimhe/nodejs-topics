const lotteryPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5)
    resolve('You WIN');
  else
    reject('You LOSE');
});

lotteryPromise
  .then(data => console.log(data))
  .catch(err => console.log(err));