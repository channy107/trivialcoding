import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { productFormSchema } from "@/schemas";

interface IProps {
  initialPreviewUrls: string[];
  key: "thumbnailImages" | "productImages";
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
}

const useImageUploadForm = ({ initialPreviewUrls = [], key, form }: IProps) => {
  const { watch, setValue, clearErrors, setError } = form;
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialPreviewUrls);
  const images = watch(key);

  const onDrop = async (acceptedFiles: File[]) => {
    setValue(key, acceptedFiles);
    setPreviewUrls(acceptedFiles.map((file) => URL.createObjectURL(file)));
    clearErrors(key);
  };

  const onDelete = (index: number) => {
    const newPreviewUrls = previewUrls.filter((_, idx) => idx !== index);
    const newImages = images.filter((_, idx) => idx !== index);

    if (newImages.length === 0) {
      setError(key, {
        type: "required",
        message: "이미지를 업로드해주세요.",
      });
    }

    setValue(key, newImages);
    setPreviewUrls(newPreviewUrls);
  };

  return {
    previewUrls,
    setPreviewUrls,
    onDrop,
    onDelete,
  };
};

export default useImageUploadForm;
