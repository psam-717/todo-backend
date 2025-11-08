import app from "./app";
import { connectDB } from "./config/db.config";
import { ENV } from "./config/env";

// const server = http.createServer(app);
const PORT = ENV.APP.PORT;

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