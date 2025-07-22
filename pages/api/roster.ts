// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mockData from "../../lib/mockData";
import { Provider } from "../../lib/types";

type Data = {
  providers: Provider[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ providers: mockData });
}
