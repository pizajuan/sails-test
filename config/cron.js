//info: https://www.npmjs.com/package/sails-hook-cron

// ['seconds', 'minutes', 'hours', 'dayOfMonth', 'month', 'dayOfWeek']
module.exports.cron = {
  // firstJob: {
  //   schedule: '* * * * * *',
  //   onTick: function () {
  //     sails.log('You will see this every second');
  //   }
  // },
  // secondJob: {
  //   schedule: '*/5 * * * * *',
  //   onTick: function () {
  //     sails.log('I am triggering every five seconds');
  //   }
  // },
}

// // ['seconds', 'minutes', 'hours', 'dayOfMonth', 'month', 'dayOfWeek']

// module.exports.cron = {
//   firstJob: {
//     schedule: '30 47 15 17 may *',
//     // in May 17 15:47:30 GMT-0300 (BRT)
//     onTick: function() {
//       console.log('I will trigger in May 17 15:47:30');
//     },
//     timezone: 'America/Sao_Paulo'
//     // timezone Brazil example
//   }
// };

// myJob: {
//   schedule: '* * * * * *',
//   onTick: function() {
//     console.log('I am triggering when time is come');
//   },
//   onComplete: function() {
//     console.log('I am triggering when job is complete');
//   },
//   start: true, // Start task immediately
//   timezone: 'Ukraine/Kiev', // Custom timezone
//   context: undefined, // Custom context for onTick callback
//   runOnInit: true // Will fire your onTick function as soon as the requisit initialization has happened.
// }
