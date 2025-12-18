// components/LocalImageUpload.tsx
"use client";
import React, { useRef, useState } from "react";
import { Plus, X, Loader2, Image as ImageIcon } from "lucide-react";
import {
  compressImage,
  isValidImageFile,
  formatFileSize,
  CompressedImageResult,
} from "@/utils/ImageUploadUtils";

interface LocalImageUploadProps {
  maxImages?: number;
  images: CompressedImageResult[];
  onImagesChange: (images: CompressedImageResult[]) => void;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

const LocalImageUpload = ({
  maxImages = 5,
  images,
  onImagesChange,
  maxWidth = 1024,
  maxHeight = 1024,
  quality = 0.8,
}: LocalImageUploadProps) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Filter valid image files
    const validFiles = files.filter(isValidImageFile);

    if (validFiles.length === 0) {
      alert("Please select valid image files (JPEG, PNG, GIF, WebP)");
      return;
    }

    // Check if we exceed max images
    if (images.length + validFiles.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    setIsCompressing(true);
    const compressedImages: CompressedImageResult[] = [];

    // Process each file
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];

      try {
        setCompressionProgress(Math.round(((i + 1) / validFiles.length) * 100));

        // Compress image
        const compressed = await compressImage(
          file,
          maxWidth,
          maxHeight,
          quality
        );
        compressedImages.push(compressed);

        console.log(`Compressed ${file.name}:`, {
          originalSize: formatFileSize(file.size),
          compressedSize: formatFileSize(compressed.size),
          path: compressed.path,
          compressionRatio: `${Math.round(
            (1 - compressed.size / file.size) * 100
          )}% reduction`,
        });
      } catch (error) {
        console.error(`Error compressing ${file.name}:`, error);
        alert(`Failed to compress ${file.name}`);
      }
    }

    // Add all compressed images
    onImagesChange([...images, ...compressedImages]);

    setIsCompressing(false);
    setCompressionProgress(0);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = images[index];
    console.log(`Removing image:`, imageToRemove.path);

    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        Upload images
      </label>

      <div className="flex gap-2 pb-2 ">
        {/* Existing Images */}
        {images.map((image, index) => (
          <div key={image.id} className="relative group">
            <div className="w-20 h-20 border-2 border-gray-300 rounded overflow-hidden bg-gray-50">
              <img
                src={image.preview}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-white" />
            </button>
            {/* Size indicator */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-0.5 text-center">
              {formatFileSize(image.size)}
            </div>
          </div>
        ))}

        {/* Compression Progress Indicator */}
        {isCompressing && (
          <div className="relative ">
            <div className="w-20 h-20 border-2 border-dashed border-primary rounded flex flex-col items-center justify-center bg-blue-50">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="text-xs text-primary font-medium mt-1">
                {compressionProgress}%
              </span>
            </div>
          </div>
        )}

        {/* Add New Image Slots */}
        {!isCompressing &&
          images.length < maxImages &&
          Array.from({ length: maxImages - images.length }).map((_, index) => (
            <div key={`empty-${index}`} className="relative flex-shrink-0">
              <button
                type="button"
                onClick={handleAddClick}
                disabled={isCompressing}
                className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-primary hover:bg-blue-50 transition-all cursor-pointer bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                {index === 0 && images.length === 0 && (
                  <span className="text-[9px] text-gray-400 mt-1">Add</span>
                )}
              </button>
            </div>
          ))}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        multiple
        onChange={handleFileSelect}
        disabled={isCompressing}
        className="hidden"
      />

      {/* Help Text */}
      <div className="flex items-start gap-1 mt-2">
        <ImageIcon className="w-3 h-3 text-gray-400 mt-0.5 " />
        <p className="text-xs text-gray-500">
          Upload up to {maxImages} images (JPEG, PNG, GIF, WebP). Images will be
          compressed to {maxWidth}x{maxHeight}px at {quality * 100}% quality.
        </p>
      </div>

      {/* Image Paths Info */}
      {images.length > 0 && (
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-1">Saved Paths:</p>
          <div className="space-y-1">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="text-xs text-gray-600 font-mono break-all"
              >
                {idx + 1}. {img.path}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalImageUpload;
