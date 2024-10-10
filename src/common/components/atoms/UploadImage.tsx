"use client";

import { NextFillImage } from "@/lib/next-image/NextFillImage";
import { Button } from "@headlessui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import { MdCloudUpload } from "react-icons/md";

interface UploadImageProps {
  onFilesChange: (file: File | null) => void;
  oldThumbnail: string;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  onFilesChange,
  oldThumbnail,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(oldThumbnail || null);

  const onDropRejected = useCallback(() => {
    toast.error("Only png, jpg, jpeg, and webp files are allowed");
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);
        onFilesChange(uploadedFile);
      }
    },
    [onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFilesChange(null);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (!file && oldThumbnail) {
      setPreview(oldThumbnail);
    }
  }, [file, oldThumbnail]);

  return (
    <>
      <div
        {...getRootProps({
          className:
            "cursor-pointer rounded-lg bg-white text-center text-base font-medium leading-[150%] border border-dashed border-gray-300 py-6 dropzone",
        })}>
        <input {...getInputProps()} />
        <div>
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 text-black">
                <MdCloudUpload size={20} />
                Upload property image
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                Drag and drop an image or (PNG or JPEG) (Max 5 MB)
                <Button className="text-blue-600 underline">Browse</Button>
              </div>
            </>
          )}
        </div>
      </div>
      {preview && (
        <div className="mt-2 flex items-center justify-between rounded-md border border-gray-300 px-4 py-2">
          <NextFillImage
            src={preview}
            alt="Preview"
            parentClassName="object-cover size-20 rounded-lg"
          />
          {file && <span className="ml-4 flex-1 text-sm">{file.name}</span>}
          <button
            type="button"
            className="flex items-center text-red-500 transition-colors hover:text-red-600 hover:shadow-none"
            onClick={removeFile}>
            <HiTrash className="mr-1" />
            Remove
          </button>
        </div>
      )}
    </>
  );
};
