interface IImages {
  thumbnail: File[];
  product: File[];
}

export const getProductImageFormData = (images: IImages) => {
  const formData = new FormData();

  Object.keys(images).forEach((key) => {
    const value = images[key as keyof IImages];

    value.forEach((file: File) => {
      formData.append("images", file);
      formData.append("imageTypes", key);
    });
  });

  return formData;
};
