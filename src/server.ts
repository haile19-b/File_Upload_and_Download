import express,{Response,Request} from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import UploadeRouter from "./routes/upload";
import downloadRouter from "./routes/download";

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("Server Running success Fully!")
})

app.use("/api",UploadeRouter)
app.use('/api',downloadRouter)

app.listen(PORT,()=>{
    console.log(`server is runnig on http://localhost:${PORT}`)
})