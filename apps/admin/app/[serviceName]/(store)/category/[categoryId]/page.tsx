import { Suspense } from "react";
import { FullScreenLoader } from "@repo/ui/components/service";
import CategoryForm from "./_components/CategoryForm";
import { getCategories } from "@/actions/storeCategory";

const CategoryFormPage = async () => {
  const largeCategories = await getCategories("large");
  const mediumCategories = await getCategories("medium");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<FullScreenLoader />}>
          <CategoryForm
            largeCategories={largeCategories}
            mediumCategories={mediumCategories}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryFormPage;
