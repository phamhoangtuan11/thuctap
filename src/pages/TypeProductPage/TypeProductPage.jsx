import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardCompunent from "../../components/CardCompunent/CardCompunent";
import * as ProductService from "../../services/ProductService";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebource";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [typeProducts, setTypeProducts] = useState([]);
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status == "OK") {
      setLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

  // call api danh muc
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    var allProductType = res?.data
    if (res?.status === "OK") {
      setTypeProducts(allProductType);
    }
  };
  const priceMax = () => {
    const reverseSortedProducts = products.sort((a, b) => b.price - a.price)
    setProducts([...reverseSortedProducts])
  }
  const priceMin = () => {
    const sortedProducts = products.sort((a, b) => a.price - b.price)
    setProducts([...sortedProducts])
  }
  const nameMax = () => {
    const sortedProducts = [...products].sort((a, b) => a.name?.localeCompare(b.name))

    setProducts(sortedProducts)
  }
  const nameMin = () => {
    const sortedProducts = [...products].sort((a, b) => b.name?.localeCompare(a.name))

    setProducts(sortedProducts)
  }
  const newproduct = () => {
    const sortedProducts = [...products].sort((a, b) =>  {
      // Sắp xếp dựa trên trường "updated_at"
      return new Date(b.updated_at) - new Date(a.updated_at);
      
    })
    setProducts(sortedProducts)
  }

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  return (
    // <Loading isLoading={loading}>
    //         <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
    //             <div style={{ width: '1280px', margin: '0 auto', height: '100%' }}>
    //                 <div style={{ flexWrap: 'nowrap',display:'flex', paddingTop: '10px',height: 'calc(100% - 20px)' }}>
    //                     <WrapperNavbar span={4} >
    //                         <NavbarComponent />
    //                     </WrapperNavbar>
    //                     <div >
    //                         <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-10 py-10" >
    //                             {products?.filter((pro) => {
    //                                 if(searchDebounce === '') {
    //                                     return pro
    //                                 }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
    //                                     return pro
    //                                 }
    //                             })?.map((product) => {
    //                                 return (
    //                                     <CardCompunent
    //                                         key={product._id}
    //                                         countInStock={product.countInStock}
    //                                         description={product.description}
    //                                         image={product.image}
    //                                         name={product.name}
    //                                         price={product.price}
    //                                         rating={product.rating}
    //                                         type={product.type}
    //                                         selled={product.selled}
    //                                         discount={product.discount}
    //                                         id={product._id}
    //                                     />
    //                                 )
    //                             })}
    //                         </div>
    //                         <Pagination  defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
    //                     </div>
    //                 </div>

    //     </div>
    // </div>
    // </Loading>

    <div className="w-[1280px] mx-auto">
      <div className="flex justify-between mt-[60px] gap-8">
        <div className="w-[258px] p-[15px] mb-[30px]">
        <div className='bg-[#f5f5f5] p-8'>
          <h3 className="font-bold text-[1.4rem] mb-[24px]">
            DANH MỤC SẢN PHẨM
          </h3>
          <div className="">
            <ul>
              {typeProducts.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-[#616161] text-[1.6rem] pt-[10px] border-b"
                  >
                    <TypeProduct name={item} key={item} />
                  </li>
                );
              })}
            </ul>
          </div>
          </div>
          <div className="mt-[40px]">
            <h4 className="font-bold text-[1.6rem] mb-[24px]">MỨC GIÁ</h4>
            <ul>
              <li className="d-flex items-center mb-[8px]">
                <input type="checkbox" className="checkboxmr-[6px]" />
                <label htmlFor="#" className="text-[1.4rem]">
                  Giá dưới 100.000đ
                </label>
              </li>
              <li className="d-flex items-center mb-[8px]">
                <input type="checkbox" className="checkboxmr-[6px]" />
                <label htmlFor="#" className="text-[1.4rem]">
                  100.000đ - 200.000đ
                </label>
              </li>
              <li className="d-flex items-center mb-[8px]">
                <input type="checkbox" className="checkbox mr-[6px]" />
                <label htmlFor="#" className="text-[1.4rem]">
                  200.000đ - 300.000đ
                </label>
              </li>
              <li className="d-flex items-center mb-[8px]">
                <input type="checkbox" className="checkbox mr-[6px]" />
                <label htmlFor="#" className="text-[1.4rem]">
                  300.000đ - 500.000đ
                </label>
              </li>
              <li className="d-flex items-center mb-[8px]">
                <input type="checkbox" className="checkbox mr-[6px]" />
                <label htmlFor="#" className="text-[1.4rem]">
                  Giá trên 500.000đ
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-[1122px] ">
          <div className="d-flex items-center border-b-[1px] border-solid border-[#dee2e6] mb-[10px]">
            <div className="mr-[20px]">Sắp xếp theo: </div>
            <button
                  onClick={nameMax}
                  className='p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2'
                >
                  Tên A - Z
                </button>
                <button
                  onClick={nameMin}
                  className='p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2'
                >
                  Tên Z - A
                </button>
                <button
                  onClick={priceMin}
                  className='p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2'
                >
                  Giá tăng dần
                </button>
                <button
                  onClick={priceMax}
                  className='p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2'
                >
                  Giá giảm dần
                </button>
                <button
                onClick={newproduct}
                  className='p-[10px] text-[#898989] hover:border-[#bb141a] hover:text-[#df171e] hover:border-b-2'
                >
                  Hàng mới
                </button>
                
          </div>
          <div>
            {/* Product list */}
            <Loading isLoading={loading}>
              <ul className="grid grid-cols-4 gap-[25px]">
                {/* Product item */}
                {products
                  ?.filter((pro) => {
                    if (searchDebounce === "") {
                      return pro;
                    } else if (
                      pro?.name
                        ?.toLowerCase()
                        ?.includes(searchDebounce?.toLowerCase())
                    ) {
                      return pro;
                    }
                  })
                  ?.map((product) => {
                    return (
                      <CardCompunent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        selled={product.selled}
                        discount={product.discount}
                        id={product._id}
                      />
                    );
                  })}
              </ul>
            </Loading>
          </div>
          <div className=" mt-16">
            <Pagination
              defaultCurrent={panigate.page + 1}
              total={panigate?.total}
              onChange={onChange}
              style={{ textAlign: "center", marginTop: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeProductPage;
