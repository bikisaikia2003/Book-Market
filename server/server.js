import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import bookRoutes from "./src/books/book_route.js";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT || 3000;

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.db_url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ================= ROUTES ================= */
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Welcome...");
});

/* ================= SOCKET.IO ================= */
const ROOM = 'group'

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on('joinRoom',async(userName)=>{
        console.log(`${userName} is joining the group .`)
        await socket.join(ROOM)
  })

  socket.on('typing',async(userName)=>{
    socket.to(ROOM).emit('typing',userName)
  })

  socket.on("chatMessage", (msg) => {
    socket.to(ROOM).emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    })
  });

/* ================= START SERVER ================= */
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
