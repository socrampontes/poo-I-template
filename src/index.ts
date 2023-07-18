import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { TVideos } from "./types";
import { Videos } from "./models/Videos";
import { title } from "process";


const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});




app.get("/videos", async (req: Request, res: Response) => {
  try {
    const q = req.query.q;

    let videosDB;

    if (q) {
      const result: TVideos[] = await db("videos").where(
        "name",
        "LIKE",
        `%${q}%`
      );
      videosDB = result;
    } else {
      const result: TVideos[] = await db("videos");
      videosDB = result;
    }
    const result = videosDB.map((videos) => {
      return new Videos(
        videos.id,
        videos.title,
        videos.duration_in_seconds,
        videos.created_at
      );
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
 
app.post("/videos", async (req: Request, res: Response) => {
  try {
    const { id, title, durationInSeconds} = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }

    if (typeof title !== "string") {
      res.status(400);
      throw new Error("'title' deve ser string");
    }

    if (typeof durationInSeconds !== "string") {
      res.status(400);
      throw new Error("'duration_in_seconds' deve ser string");
    }
    const [videosDBExists]: TVideos[] | undefined[] = await db("videos").where({
      id,
    });

    if (videosDBExists) {
      res.status(400);
      throw new Error("'id' já existe");
    }
    const newVideo: Videos = new Videos(
      id,
      title,
      durationInSeconds,
      new Date().toISOString()
    );
    await db("videos").insert({
      id: newVideo.getId(),
      title: newVideo.getTitle(),
      duration_in_seconds: newVideo.getDuration(),
      created_at: newVideo.getCreatedAt(),
    });
    const [videosDB]: TVideos[] = await db("videos").where({ id });

    const result = new Videos(
      videosDB.id,
      videosDB.title,
      videosDB.duration_in_seconds,
      videosDB.created_at
    );

    res.status(201).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});


app.put("/videos/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newTitle = req.body.title
    const newDuration = req.body.duration

    const [videosDB]: TVideos[] | undefined[] = await db("videos").where({
      id,
    });

    if (!videosDB) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }
    if (newTitle === undefined) {
      if (typeof newTitle !== "string") {
        res.status(400);
        throw new Error("'title' da must be string");
      }
    };
    
    if(newDuration !== undefined){
      if (typeof newDuration !== "string") {
        res.status(400);
        throw new Error("'duration in segunds' da must be string");
      }
    }

    const newVideo : Videos = new Videos(
        videosDB.id,
        videosDB.title,
        videosDB.duration_in_seconds,
        videosDB.created_at
      );
      newVideo.setTitle(newTitle)
      newVideo.setDuration(newDuration)

    await db("videos").update({ 
    title:  newVideo.getTitle() || videosDB.title,
    duration_in_seconds: newVideo.getDuration() || videosDB.duration_in_seconds
    }).where({ id });

    res.status(200).send("update sucessfully");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
 
app.delete("/videos/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    if (idToDelete.substring(0, 1) !== 'v') {
      res.status(400);
      throw new Error('id must start with the letter V');
    }
    const [videosIdToDelete]: TVideos[] = await db(
      'videos'
    ).where({ id: idToDelete });
    if (!videosIdToDelete) {
      res.status(404);
      throw new Error('ID not found');
    }
   const video = new Videos(
    videosIdToDelete.id,
    videosIdToDelete.title,
    videosIdToDelete.duration_in_seconds,
    videosIdToDelete.created_at
   )
    await db('videos').del().where({ id: video.getId() });
    res.status(200).send('video deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send('Unknown error');
  }
  });