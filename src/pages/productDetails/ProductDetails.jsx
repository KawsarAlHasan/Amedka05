import { useParams } from "react-router-dom";
import { useGetProductDetails } from "../../api/api";
import SimillarProducts from "../../components/SimillarProducts";
import Details from "./Details";
import ProductView from "./ProductView";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";

function ProductDetails() {
  const { id } = useParams();

  const { productDetails, isLoading, isError, error, refetch } =
    useGetProductDetails(id);

  if (isLoading) {
    return <IsLoading rows={4} />;
  }

  if (isError) {
    return <IsError refetch={refetch} error={error} />;
  }

  return (
    <div>
      <div className="my-6">
        <ProductView product={productDetails} />
      </div>

      <div className="my-5">
        <Details product={productDetails} />
      </div>

      <div className="my-6">
        <SimillarProducts category={productDetails?.category} />
      </div>
    </div>
  );
}

export default ProductDetails;
