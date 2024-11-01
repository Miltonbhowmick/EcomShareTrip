import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../api/products";
import {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
} from "../../utils/cart";
import PageFullLoader from "../../components/loading/page-full";
import { ToastContainer, toast } from "react-toastify";

const ProductIndexPage = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentLargeImage, setCurrentLargeImage] = useState();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [productDetail, setProductDetail] = useState(null);
  const [totalItemInCart, setTotalItemInCart] = useState(0);

  const sellingPrice = useMemo(() => {
    // Calculate the selling price after discount of product regular price
    let price = parseFloat(
      productDetail?.price -
        (productDetail?.price * productDetail?.discountPercentage) / 100
    ).toFixed(2);

    if (totalItemInCart > 0) {
      return (price * totalItemInCart).toFixed(2);
    } else {
      return price;
    }
  }, [
    productDetail?.price,
    productDetail?.discountPercentage,
    totalItemInCart,
  ]);

  const totalPrice = useMemo(() => {
    if (totalItemInCart > 0)
      return (productDetail?.price * totalItemInCart).toFixed(2);
    else return productDetail?.price;
  }, [productDetail?.price, totalItemInCart]);

  useEffect(() => {
    setLoading(true);
    fetchSingleProduct({ id: productId }).then((data) => {
      let cartItems = getCartItems();
      let cartItem = cartItems.find((item) => item.id === data.id);
      let quantity = cartItem?.quantity || 0;
      setTotalItemInCart(quantity);
      setProductDetail(data);
      setCurrentLargeImage(data?.images[0]);
      setLoading(false);
    });
  }, [productId]);

  const handleAddCart = (item) => {
    // Add an item to cart
    if (totalItemInCart >= item.minimumOrderQuantity) {
      toast(`You cannot order more than ${item.minimumOrderQuantity} items.`);
      return;
    }

    let cartObj = {
      id: item.id,
      sku: item.sku,
    };
    let done = addItemToCart(cartObj);
    if (done) {
      setTotalItemInCart(totalItemInCart + 1);
    }
  };

  const handleRemoveCart = (item) => {
    // Remove an item to cart
    let cartObj = {
      id: item.id,
      sku: item.sku,
    };
    let done = removeItemFromCart(cartObj);
    if (done && totalItemInCart > 0) {
      setTotalItemInCart(totalItemInCart - 1);
    }
  };

  if (loading) {
    return <PageFullLoader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer position="bottom-right" theme="dark" />
      <div className="py-2 border-b">
        <Link to="/" className="underline">
          Home
        </Link>
        <h2 className="font-bold">{productDetail?.title}</h2>
      </div>
      <div className="py-2 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/4">
          <div className="h-[550px] md:h-[700px] rounded-lg overflow-hidden border">
            <img
              src={currentLargeImage}
              alt="selected-product-image"
              loading="lazy"
              className={`object-cover h-full w-full transition duration-300 ease-in-out ${
                isImageLoading ? "blur-sm" : "blur-0"
              }`}
              onLoad={() => setIsImageLoading(false)}
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto ">
            {productDetail?.images.map((image, index) => {
              return (
                <div
                  className="h-[100px] border  grow-0 shrink-0 basis-[100px]"
                  key={`image_${index}`}
                >
                  <img
                    src={image}
                    alt={"product-image-"}
                    loading="lazy"
                    className={`object-cover h-full w-full transition duration-300 ease-in-out`}
                    onClick={() => setCurrentLargeImage(image)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-2/4">
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <strong>{productDetail?.sku}</strong>
              {productDetail?.brand && (
                <p>
                  <span>brand: </span>
                  <span>{productDetail?.brand}</span>
                </p>
              )}
              {productDetail?.category && (
                <p>
                  <span>category: </span>
                  <span>{productDetail?.category}</span>
                </p>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <h3 className="text-primaryBg font-semibold flex items-center">
                <TbCurrencyTaka className="-ms-1 md:-ms-3" />
                {sellingPrice}
              </h3>
              {productDetail?.price && (
                <h5 className="text-neutral-700 line-through flex items-center">
                  <TbCurrencyTaka />
                  {totalPrice}
                </h5>
              )}
            </div>
            <div className="flex flex-col">
              <h5>
                <span>Minimum Order: </span>
                <span>{productDetail?.minimumOrderQuantity}</span>
              </h5>
              <p>
                <span>Warranty: </span>
                <span>{productDetail?.warrantyInformation}</span>
              </p>
            </div>
            <div className="mt-4">
              {totalItemInCart > 0 ? (
                <div className="bg-primaryBg flex justify-between items-center rounded-lg">
                  <button
                    onClick={() => {
                      handleRemoveCart(productDetail);
                    }}
                    className="py-3 bg-blue-100 w-[50px] bg-transparent flex justify-center items-center"
                  >
                    <BsFillTrash3Fill className="text-md text-white" />
                  </button>
                  <h6 className="py-3 text-white text-white font-bold">
                    {totalItemInCart} Added in Cart
                  </h6>
                  <button
                    onClick={() => {
                      handleAddCart(productDetail);
                    }}
                    className="py-3 bg-blue-100 w-[50px] bg-transparent flex justify-center items-center"
                  >
                    <BsPlusLg className="text-md text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-1 justify-center">
                  <button
                    onClick={() => {
                      handleAddCart(productDetail);
                    }}
                    className="py-3 w-full bg-primaryBg text-white font-bold rounded-lg"
                  >
                    <h6>Add to Cart</h6>
                  </button>
                </div>
              )}
            </div>
            <div>
              <p>{productDetail?.description}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductIndexPage;
