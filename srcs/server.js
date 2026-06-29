import "dotenv/config";
import app from "./index.js"

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});