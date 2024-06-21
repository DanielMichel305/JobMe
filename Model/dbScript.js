const cron = require('node-cron');
const User = require('./UserModel');
const { entries } = require('./orderModel');

// Define your time duration
const DURATION = 120 * 1000; 

async function checkUserSoftDeletion(){

    console.log('\n\n-------------\nCRON JOB RAN\n-------------\n\n');
    const now = Date.now();
    const expiryTime = now - DURATION;
    console.log(`\n---------\nCurrent Time: ${now}\n EXPIRES AT: ${expiryTime}\n---------\n`);
    console.log(typeof (now));
    try {

        const entriesToDelete = await User.find({activated : false, createdAt : {$lt: new Date(expiryTime)}});
        console.log(entriesToDelete);
        if (entriesToDelete.length > 0) {
            const result = await User.deleteMany({
              _id: { $in: entriesToDelete.map(entry => entry._id) }
            });
      
            console.log('Deleted expired entries:', result);
        }
        
    } catch (error) {
        console.error('Error during cron job execution:', error);
    }
}

// Schedule the task
cron.schedule('* * * * *', checkUserSoftDeletion);


module.exports = checkUserSoftDeletion;

