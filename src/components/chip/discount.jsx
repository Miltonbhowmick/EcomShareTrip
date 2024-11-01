import { TbCurrencyTaka } from "react-icons/tb";

const DiscountChip = ({ amount }) => {
  return (
    <div className="px-1 h-[30px] absolute top-[10px] -left-[10px] flex items-center  bg-gradient-to-r from-gradientLeft to-gradientRight">
      <p className="text-paragraph flex items-center text-white">
        -<TbCurrencyTaka />
        {amount}
      </p>
      <div>
        <div className="absolute w-[15px] h-[30px] top-0 right-[-11px] z-[99] clip-arrow-down bg-gradientRight h-full"></div>
        <div className="absolute w-[15px] h-[30px] top-0 right-[-11px] z-[9] clip-arrow-up bg-gradientLeft h-full"></div>
        <div className="absolute w-[10px] h-[15px] bottom-[-15px] left-0 z-[9] clip-arrow-right-bottom bg-gradientRight"></div>
      </div>
    </div>
  );
};

export default DiscountChip;
