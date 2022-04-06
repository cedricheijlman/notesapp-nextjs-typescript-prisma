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
  } else {
    return res.json({ message: "couldn't delete note" });
  }
}
