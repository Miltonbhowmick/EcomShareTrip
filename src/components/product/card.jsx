import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
} from "../../utils/cart";

import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import DiscountChip from "../chip/discount";

const ProductCard = ({ itemData }) => {
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const sellingPrice = useMemo(() => {
    // Calculate the selling price after discount of product regular price
    return parseFloat(
      itemData.price - (itemData?.price * itemData?.discountPercentage) / 100
    ).toFixed(2);
  }, [itemData.price, itemData.discountPercentage]);

  useEffect(() => {
    let cartItems = getCartItems();
    let cartItem = cartItems.find((item) => item.id === itemData.id);
    let quantity = cartItem?.quantity || 0;
    setTotalItemInCart(quantity);
  }, []);

  const handleAddCart = (item) => {
    // Add an item to cart
    if (totalItemInCart >= item.minimumOrderQuantity) {
      alert(`You cannot order more than ${item.minimumOrderQuantity} items.`);
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

  const getShortTitle = (title) => {
    if (title && title.length > 35) {
      return title.substring(0, 35) + "...";
    }
    return title;
  };

  return (
    <div className="w-3/4 sm:w-2/5 md:w-[30%] lg:1/4 mx-2 p-[8px] lg:w-[266px] relative group flex flex-col justify-center rounded-lg hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.06)] hover:bg-white transition duration-500">
      <div className="h-[300px] md:h-[200px] rounded-lg overflow-hidden">
        <img
          src={itemData.thumbnail}
          alt={"product-image-" + itemData.title}
          loading="lazy"
          className={`object-cover h-full w-full transition duration-300 ease-in-out ${
            isImageLoading ? "blur-sm" : "blur-0"
          }`}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>
      <div className="p-2 h-[100px] md:h-[120px]">
        <p className="h-[25px] text-paragraph-md">{itemData?.brand}</p>
        <h6 className="font-semibold h-[40px] md:h-[60px] leading-1 md:leading-6">
          {getShortTitle(itemData.title)}
        </h6>
        <div className="flex gap-2 items-center">
          <p className="text-xl text-primaryBg font-semibold flex items-center">
            <TbCurrencyTaka className="-ms-3" />
            {sellingPrice}
          </p>
          {itemData.price && (
            <p className="text-paragraph-md text-neutral-700 line-through flex items-center">
              <TbCurrencyTaka />
              {itemData.price}
            </p>
          )}
        </div>
      </div>
      {sellingPrice && sellingPrice > 0 && (
        <DiscountChip
          amount={parseFloat(itemData.price - sellingPrice).toFixed(2)}
        />
      )}
      <div className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 flex flex-col gap-2 justify-center items-center z-[99] h-[100px]">
        <div className="backdrop-blur-sm bg-white/30 w-11/12 rounded-lg border-2 border-black overflow-hidden">
          {totalItemInCart > 0 ? (
            <div className="bg-primaryBg flex justify-between items-center">
              <button
                onClick={() => {
                  handleRemoveCart(itemData);
                }}
                className="py-2 bg-blue-100 w-[30px] bg-transparent flex justify-center items-center"
              >
                <BsFillTrash3Fill className="text-md text-white" />
              </button>
              <span className="text-paragraph md:text-paragraph-md text-white">
                {totalItemInCart} Added in Cart
              </span>
              <button
                onClick={() => {
                  handleAddCart(itemData);
                }}
                className="py-2 bg-blue-100 w-[30px] bg-transparent flex justify-center items-center"
              >
                <BsPlusLg className="text-md text-white" />
              </button>
            </div>
          ) : (
            <div className="flex gap-1 justify-center">
              <button
                onClick={() => {
                  handleAddCart(itemData);
                }}
                className="py-1 w-full"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
        <Link
          to={`/products/${itemData.id}`}
          className="py-1 cursor-pointer w-100 backdrop-blur-sm bg-white/30 w-11/12 rounded-lg text-center border-2 border-black"
        >
          Quick View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
