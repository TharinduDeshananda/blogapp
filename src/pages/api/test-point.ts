import s3Client from "@/lib/s3client";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // if (req.method !== "POST") {
  //   res.setHeader("Allow", "POST");
  //   res.status(405).json({
  //     message: "Failed",
  //     data: null,
  //     error: "Method Not Allowed",
  //   });
  //   return;
  // }

  res.status(200).json({ message: "Hello from Next.js!", data: { key: null } });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
