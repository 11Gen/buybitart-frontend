import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { imagesOnly } from "../utils";
import LoadingCircle from "./LoadingCircle";

const Dropzone = ({ data, setData, autoCSS }) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setLoading(true);
      const processFiles = async () => {
        const updatedData = [...data];
        for (const file of acceptedFiles) {
          try {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1024,
              useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();
            reader.onload = () => {
              const newFile = { name: file.name, src: reader.result };
              updatedData.push(newFile);
              setData(updatedData);
            };
            reader.readAsDataURL(compressedFile);
          } catch (error) {
            console.error("Error compressing the image:", error);
          }
        }
        setLoading(false);
      };

      processFiles();
    },
    [data, setData]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: imagesOnly,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full ${
        autoCSS
          ? "text-xs text-center h-[83px] sm:h-[110px]"
          : "lg:h-[600px] h-[394px] text-lg"
      } bg-[#2B2B2B] font-main group font-[300] cursor-pointer rounded-3xl flex justify-center items-center overflow-hidden`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23FFFFFF4F' stroke-width='4' stroke-dasharray='20' stroke-dashoffset='11' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <input {...getInputProps()} />
      <div
        className={`flex h-auto flex-col w-auto max-w-[80%] justify-center items-center ${
          autoCSS ? "gap-2" : "gap-4"
        }`}
      >
        {loading ? (
          <LoadingCircle />
        ) : (
          <>
            <svg
              width={autoCSS ? "34" : `44`}
              height={autoCSS ? "34" : `44`}
              viewBox="0 0 24 24"
              fill="none"
              className={`group-hover:scale-125 transition-transform duration-300 ${
                isDragReject && "rotate-45 scale-125"
              } ${isDragAccept && "scale-125"}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_360_6082"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" className="fill-[#D9D9D9]" />
              </mask>
              <g mask="url(#mask0_360_6082)">
                <path
                  d="M12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20V13H4C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H11V4C11 3.71667 11.0958 3.47917 11.2875 3.2875C11.4792 3.09583 11.7167 3 12 3C12.2833 3 12.5208 3.09583 12.7125 3.2875C12.9042 3.47917 13 3.71667 13 4V11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H13V20C13 20.2833 12.9042 20.5208 12.7125 20.7125C12.5208 20.9042 12.2833 21 12 21Z"
                  className={`fill-white group-hover:fill-[#FCCB00] transition-colors duration-300 ${
                    isDragReject && "fill-red-500"
                  } ${isDragAccept && "fill-[#FCCB00]"}`}
                />
              </g>
            </svg>
          </>
        )}

        {autoCSS ? (
          <></>
        ) : isDragActive ? (
          isDragAccept ? (
            <p>Drop the files here ...</p>
          ) : (
            isDragReject && <p>Only .jpg, .png, .jpeg, .webp, .avif, .jfif</p>
          )
        ) : loading ? (
          <p>Compressing and loading...</p>
        ) : (
          <p className="group-hover:tracking-wider transition-[letter-spacing,opacity] duration-300 group-hover:opacity-80">
            Load image or drag and drop
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
