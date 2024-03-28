import { Suspense } from "react";
import { FullScreenLoader } from "@repo/ui/components/service";
import CategoryForm from "./_components/CategoryForm";
import { getCategories } from "@/actions/storeCategory";

export const revalidate = 0;

const CategoryFormPage = async () => {
  const largeCategories = await getCategories("large");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<FullScreenLoader />}>
          <CategoryForm largeCategories={largeCategories} />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryFormPage;
