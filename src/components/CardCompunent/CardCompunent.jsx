import logo from "../../assets/images/logo.png";
import { BsArrowRight } from "react-icons/bs";
import { StarFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import React from "react";
// import {StyleNameProduct,WrapperCardStyle,WrapperDiscountText,WrapperPriceText, WrapperReportText,WrapperStyleTextSell,} from "./style";
import { useNavigate } from "react-router-dom";
// import { convertPrice } from "../../utils";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { ToastContainer,toast } from "react-toastify";
// import { Image } from 'antd'
// import { WrapperStyleImageSmall } from '../ProductDetailComponent/style'

const CardCompunent = (props) => {
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)
  const dispatch = useDispatch()
  const {countInStock,// description,type,
image,name,price,rating,discount,selled,id,} = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  const handleAddOrderProduct = () => {
    if(!user?.id) {
        navigate('/sign-in')
    }else {
      const orderRedux = order?.orderItems?.find((item) => item.product === id)
      if((orderRedux?.amount) <= orderRedux?.countInstock || (!orderRedux && countInStock > 0)) {
            dispatch(addOrderProduct({
                orderItem: {
                    name: name,
                    amount: 1,  
                    image: image,
                    price: price,
                    product: id,
                    discount: discount,
                    countInstock:countInStock
                }
            }))
           toast.success(`${name} được thêm vào giỏ hàng`)
            
          }
          else{
            toast.error(`Thêm giỏ hàng không thành công,sản phẩm hết hàng`)
          }
        }
    }
  return (
    <div className={`w-[100%] flex justify-center`}>
      <div 
     
    //  disabled={countInStock === 0}
     className={`w-[250px] relative group ${countInStock> 0 ? "bg-[#fff]" : "bg-[#ccc] cursor-not-allowed"}`}
   >
     <div  onClick={() => handleDetailsProduct(id)} className="w-full h-[260px]  cursor-pointer overflow-hidden">
       <img
         className="w-full h-full object-cover  group-hover:scale-110 duration-500"
         src={image}
         alt="productImg"
       />
     </div>
     <div className="w-full border-[1px] px-2 py-4">
       <div className="flex justify-between ">
         <div  >
           <h2 className="text-[16px]  font-medium">
             {name?.substring(0, 15)}
           </h2>
         </div>
         <div className=" text-2xl relative w-40 flex justify-end overflow-hidden ">
           <div className=" flex gap-2 transform group-hover:translate-x-[190px] transition-transform duration-500">
               <p className=" flex items-center gap-1 text-gray-500">
                 <span>{rating}</span>
                 <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
               </p>
             <p className="font-medium text-red-600">{price}đ</p>
           </div>
           <p 
           onClick={handleAddOrderProduct} 
            className={`absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-36 group-hover:translate-x-0 transition-transform cursor-pointer duration-500 ${countInStock> 0 ? "bg-[#fff]" : "bg-[#ccc] cursor-not-allowed"}`}>
            add to cart
             <span>
               <BsArrowRight />
             </span>
           </p>
         </div>
       </div>
       <div>
         <p>Da ban {selled || "1000+"}</p>
       </div>
     </div>
     <div className="absolute top-4 right-0">
       <p className="bg-black text-white font-semibold font-titleFont px-6 py-1">
         - {discount || 5}%
       </p>
     </div>
     <ToastContainer
       position="top-left"
       autoClose={2000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
     />
   </div>
    </div>
    //   <WrapperCardStyle
    //   hoverable
    //   style={{ width: 200 }}
    //   bodyStyle={{padding:'10px'}}
    //   cover={<img alt="example" src={image} />}
    //   onClick={() =>  handleDetailsProduct(id)}
    //  disabled={countInStock===0}
    // >
    //   <img src={logo}   style={{
    //                   width: '68px',
    //                   height: '14px',
    //                   position: 'absolute',
    //                   top: -1,
    //                   left: -1,
    //                   borderTopLeftRadius: '3px'
    //               }}/>
    //   <StyleNameProduct>{name}</StyleNameProduct>
    //   <WrapperReportText>
    //       <span style={{marginRight:'4px'}}>
    //       <span>{rating}</span><StarFilled style={{fontSize:'12px',color:'yellow'}}/>
    //       </span>
    //       <WrapperStyleTextSell> | Da ban {selled ||1000}+</WrapperStyleTextSell>
    //   </WrapperReportText>
    //   <WrapperPriceText><span style={{ marginRight: '8px' }}>{convertPrice(price)}</span><WrapperDiscountText> - {discount || 5}%</WrapperDiscountText></WrapperPriceText>
    // </WrapperCardStyle>
  );
};

export default CardCompunent;
