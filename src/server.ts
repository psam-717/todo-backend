import app from "./app";
import { connectDB } from "./config/db.config";

// const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log('Failed to start server', error);
        process.exit(1);
    }
}

startServer();