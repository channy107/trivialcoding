import ImageCarousel from "./ImageCarousel";

interface IProps {
  images: string[];
}

const ProductTitleImages = ({ images = [] }: IProps) => {
  return (
    <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
      <ImageCarousel images={images} />
    </div>
  );
};

export default ProductTitleImages;
