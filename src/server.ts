import app from "./app";
import { connectDB } from "./config/db.config";
import { ENV } from "./config/env";

// const server = http.createServer(app);
const PORT = ENV.APP.PORT || 4000;

async function startServer() {
    // skip the DB connection in CI
    if(!process.env.CI){
        try {
            await connectDB();
        } catch (error) {
            console.log('Failed to start server', error);
            process.exit(1);
        }
    }else {
        console.log("CI detected, skipping database")
    }

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
        console.log(`Health endpoint: http://localhost:${PORT}/health`);
    })
}

startServer();