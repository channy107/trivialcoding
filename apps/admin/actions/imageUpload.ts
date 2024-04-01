"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const Bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!,
  },
});

export const uploadImage = async (formData: FormData, name: string) => {
  const imageTypesString = formData
    .getAll("imageTypes")
    .map((item) => item.toString());

  const files = formData.getAll(`images`) as unknown as File[];
  if (files.length === 0) return;

  try {
    await Promise.all(
      files.map(async (file, index) => {
        const type = imageTypesString[index];
        const originalName = file.name;
        const Body = (await file.arrayBuffer()) as Buffer;
        const Key = `${name}/${type}/${originalName}`;
        await s3Client.send(new PutObjectCommand({ Bucket, Key, Body }));
      })
    );
  } catch (error) {
    throw new Error("이미지를 업로드하는 데 실패하였습니다.");
  }
};
