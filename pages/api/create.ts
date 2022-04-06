import { prisma } from "../../lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body;

  try {
    await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    return res.status(200).json({ message: "Note Created" });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
}
