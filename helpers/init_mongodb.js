const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to mongo');
    })
    .catch((err) => console.log(err.message));

mongoose.connection.on('connected', () => {
    console.log("connected to db...");
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log("disconnected from mongo");
});

process.on('SIGINT', async () => {
    try {
        
        console.log('Closing MongoDB connection...');
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    } catch (err) {
        console.error('Error while closing MongoDB connection:', err.message);
        process.exit(1);
    }
});