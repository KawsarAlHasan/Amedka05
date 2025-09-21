import { useParams } from "react-router-dom";
import { useGetProductDetails } from "../../api/api";
import fimage from "../../assets/Frame 125.png";
import SimillarProducts from "../../components/SimillarProducts";
import Details from "./Details";
import ProductDetailDemo from "./ProductDetailDemo";
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
        <ProductDetailDemo product={productDetails} />
      </div>

      <div className="my-5">
        <Details product={productDetails} />
      </div>

      <div className="my-6">
        <SimillarProducts />
      </div>
    </div>
  );
}

export default ProductDetails;
