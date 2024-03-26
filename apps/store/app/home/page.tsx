import Banner from "@home/_components/Banner";
import Container from "@components/Container";
import ProductList from "@components/ProductList";
import { getBanners } from "@/actions/banner";
import { getProducts } from "@/actions/product";

const HomePage = async () => {
  const banners = await getBanners();
  const products = await getProducts();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Banner data={banners} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
