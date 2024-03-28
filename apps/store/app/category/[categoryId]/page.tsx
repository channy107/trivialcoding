import { Plus } from "lucide-react";
import Container from "@components/Container";
import NoResults from "@components/NoResults";
import ProductCard from "@components/ProductCard";
import MediumCategories from "./_components/MediumCategories";
import { getProducts } from "@/actions/product";
import { getCategories, getCategory } from "@/actions/category";
import SmallCategories from "./_components/SmallCategories";
import MobileSheet from "@/components/MoblieSheet";
import { Button } from "@repo/ui/components/ui/button";

export const revalidate = 0;

interface IProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    mediumCategoryId: string;
    smallCategoryId: string;
  };
}

const CategoryPage = async ({ params, searchParams }: IProps) => {
  const products = await getProducts({
    largeCategoryId: params.categoryId,
    mediumCategoryId: searchParams.mediumCategoryId,
    smallCategoryId: searchParams.smallCategoryId,
  });

  const smallCategories = await getCategories("small");
  const mediumCategories = await getCategories("medium");
  const largeCategory = await getCategory(params.categoryId);

  return (
    <div className="mt-10">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileSheet
              triggerComponent={
                <Button className="flex items-center gap-x-2 lg:hidden">
                  Filters
                  <Plus size={20} />
                </Button>
              }
              content={
                <MediumCategories
                  valueKey="mediumCategoryId"
                  name={largeCategory?.name || ""}
                  data={mediumCategories}
                />
              }
            />

            <div className="hidden lg:block">
              <MediumCategories
                valueKey="mediumCategoryId"
                name={largeCategory?.name || ""}
                data={mediumCategories}
              />
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {searchParams.mediumCategoryId && (
                <div className="mb-6">
                  <SmallCategories
                    data={smallCategories}
                    valueKey="smallCategoryId"
                  />
                </div>
              )}
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
