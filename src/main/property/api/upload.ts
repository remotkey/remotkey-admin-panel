import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import QRCode from "qrcode";
import mimeTypes from "mime-types";

const s3 = new S3Client({
  endpoint: String(process.env.DO_SPACES_ENDPOINT),
  region: "sfo3",
  credentials: {
    accessKeyId: String(process.env.DO_SPACES_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.DO_SPACES_SECRET_ACCESS_KEY),
  },
});

export const uploadToS3 = async (
  file: any,
  uploadPath: string
): Promise<string> => {
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const fileType = mimeTypes.lookup(file.name) || "application/octet-stream";
  const filePath = uploadPath;

  const params: PutObjectCommandInput = {
    Bucket: process.env.DO_SPACES_BUCKET_NAME!,
    Key: filePath,
    Body: buffer,
    ContentType: fileType,
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const fileUrl = `https://${process.env.DO_SPACES_BUCKET_NAME}.sfo2.digitaloceanspaces.com/${filePath}`;
  return fileUrl;
};

export const uploadQrToS3 = async (savedProperty: {
  slug: string;
  _id: string;
}) => {
  const propertyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/property/${savedProperty.slug}?id=${savedProperty._id}`;

  const qrCodeSvg = await QRCode.toString(propertyUrl, {
    type: "svg",
    width: 600,
    margin: 2,
  });

  const buffer = Buffer.from(qrCodeSvg);

  const params: PutObjectCommandInput = {
    Bucket: process.env.DO_SPACES_BUCKET_NAME!,
    Key: `properties/${savedProperty._id}/qr/${savedProperty._id}.svg`,
    Body: buffer,
    ContentType: "image/svg+xml",
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const fileUrl = `https://${process.env.DO_SPACES_BUCKET_NAME}.sfo2.digitaloceanspaces.com/properties/${savedProperty._id}/qr/${savedProperty._id}.svg`;
  return fileUrl;
};

export const deleteFromS3 = async (path: string) => {
  const params: DeleteObjectCommandInput = {
    Bucket: process.env.DO_SPACES_BUCKET_NAME!,
    Key: path,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};
