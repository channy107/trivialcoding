import Container from "@components/Container";
import ProductTitleImages from "@/components/ProductTitleImages";
import ProductList from "@components/ProductList";
import Info from "@components/Info";
import { getProduct, getProducts } from "@actions/product";

export const revalidate = 0;

interface IProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: IProps) => {
  const product = await getProduct(params.productId);

  if (!product) {
    return null;
  }

  const products = await getProducts({
    smallCategoryId: product.smallCategoryId,
  });
  const suggestedProducts = products.filter((item) => item.id !== product?.id);

  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <ProductTitleImages images={product.images} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Info data={product} />
          </div>
        </div>
        <hr className="my-10" />
        <ProductList title="관련 상품" items={suggestedProducts} />
      </div>
    </Container>
  );
};

export default ProductPage;
