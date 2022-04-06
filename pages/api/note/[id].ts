import { prisma } from "../../../lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body;
  const noteId = req.query.id;

  if (req.method === "POST") {
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
  }

  if (req.method === "DELETE") {
    const note = await prisma.note.delete({
      where: { id: Number(noteId) },
    });
    return res.json(noteId);
  } else {
    return res.json({ message: "error" });
  }
}
