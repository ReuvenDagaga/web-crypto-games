import dotenv from 'dotenv';
import connectDB from './config/database';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3222;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
