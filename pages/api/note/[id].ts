import { prisma } from "../../../lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const noteId = req.query.id;

  if (req.method === "DELETE") {
    const note = await prisma.note.delete({
      where: { id: Number(noteId) },
    });
    return res.json(noteId);
  } else if (req.method === "POST") {
    const { title, content } = req.body;
    const updatedNote = await prisma.note.update({
      where: {
        id: Number(noteId),
      },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json({ message: "succesfully updated note" });
  } else {
    console.log("Error");
    return res.status(400).json({ message: "error" });
  }
}
