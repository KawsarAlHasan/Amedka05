import fimage from "../../assets/Frame 125.png";
import SimillarProducts from "../../components/SimillarProducts";
import Details from "./Details";
import ProductDetailDemo from "./Test";

function ProductDetails() {
  return (
    <div>
      <div className="my-6">
        <ProductDetailDemo />
      </div>
      {/* <img src={fimage} alt="" className="my-6" /> */}
      {/* description */}
      <div className="my-5">
        <Details />
      </div>

      <div className="my-6">
        <SimillarProducts />
      </div>
    </div>
  );
}

export default ProductDetails;
