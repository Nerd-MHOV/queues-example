import 'dotenv/config';
import express from "express"
import UserController from "./app/controllers/UserController";

import Queue from "./app/lib/Queue"
import {ExpressAdapter} from "@bull-board/express";
import {createBullBoard} from "@bull-board/api";
import {BullAdapter} from "@bull-board/api/bullAdapter";


const port = 3333;
const routeBullBoard = "/admin/queues";

// Bull-Board config
const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath(routeBullBoard)
createBullBoard({
    queues: Queue.queues.map(queue => new BullAdapter(queue.bull)),
    serverAdapter
})

const app = express();


app.use(express.json());
app.post("/users", UserController.store);


app.use(routeBullBoard, serverAdapter.getRouter())

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})