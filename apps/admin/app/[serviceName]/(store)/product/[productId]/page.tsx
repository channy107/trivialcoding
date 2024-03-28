import ProductForm from "./components/ProductForm";
import { getProduct } from "@actions/storeProduct";
import { getColors } from "@actions/storeColor";
import { getCategories } from "@actions/storeCategory";
import { getBrands } from "@actions/storeBrand";
import { getSizes } from "@actions/storeSize";

interface Props {
  params: { productId: string };
}

export const revalidate = 0;

const ProductFormPage = async ({ params }: Props) => {
  const product = await getProduct(
    params.productId !== "new" ? params.productId : undefined
  );

  const brands = await getBrands();
  const colors = await getColors();
  const sizes = await getSizes();

  const smallCategories = await getCategories("small");
  const mediumCategories = await getCategories("medium");
  const largeCategories = await getCategories("large");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          smallCategories={smallCategories}
          mediumCategories={mediumCategories}
          largeCategories={largeCategories}
          sizes={sizes}
          colors={colors}
          brands={brands}
        />
      </div>
    </div>
  );
};

export default ProductFormPage;
