import React, { useEffect, useRef, useState } from "react";
import * as ProductService from "../../services/ProductService";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import CardCompunent from "../../components/CardCompunent/CardCompunent";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebource";
import Banner from "../../components/Banner/Banner";
import Slider from "react-slick";
// import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
const HomePage = () => {
  const diacritics = require("diacritics");

  // Tìm sản phầm theo dạnh mục truyện tranh
  // const [productstype, setProductstype] = useState([]);
  // const fetchProductType = async (type) => {
  //   setLoading(true);
  //   const res = await ProductService.getProductType(type);
  //   if (res?.status == "OK") {
  //     setLoading(false);
  //     setProductstype(res?.data);
  //     console.log(res?.data);
  //   } else {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //     fetchProductType("Truyện tranh");
  // }, ["Truyện tranh"]);

  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [typeProducts, setTypeProducts] = useState([]);
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };
  // Load danh mục sản phẩm
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  // Gọi tất cả sản phẩm qua react-query
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };
  return (
    <>
      <Banner />
      <Loading isLoading={isLoading || loading}>
        <div style={{ width: "1280px", margin: "0 auto" }}>
          {/* ,backgroundColor: "#efefef"  */}
          <div className="w-[1270px] flex flex-col justify-center bg-[#fff]">
            <div className=" flex items-center ">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu_red.svg"
                alt=""
              />
              <h1 className="p-4  font-bold text-[26px] text-[#212121]">
                Danh mục sản phẩm
              </h1>
            </div>
            <div className="flex justify-between items-center">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/_am_m_.jpg"
                alt=""
              />
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/tpkds1.jpg"
                alt=""
              />

              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/Ti_u_Thuy_t.jpg"
                alt=""
              />
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/9786043654370.jpg"
                alt=""
              />
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/Thao_t_ng.jpg"
                alt=""
              />
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/thieunhis2.jpg"
                alt=""
              />
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/T_m_linh.jpg"
                alt=""
              />
            </div>
            <div className=" flex justify-between items-center w-full mt-2">
              {typeProducts.map((item) => {
                return <TypeProduct name={item} key={item} />;
              })}
            </div>
          </div>

          <div className="body w-full mx-auto">
            <div id="container" className="mx-auto">
              <div>
                <div className="max-w-[1260px] my-[30px] gap-y-24 grid grid-cols-4 ">
                  {products?.data
                    ?.filter((pro) => {
                      if (searchDebounce == "") {
                        return pro;
                      } else if (
                        diacritics
                          .remove(pro?.name)

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
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                
                {/* Button load sản phẩm */}
                <div
                  onClick={() => setLimit((prev) => prev + 8)}
                  type="outline"
                  className={`${
                    products?.total === products?.data?.length ||
                    products?.totalPage === 1
                      ? "bg-[#ccc] cursor-not-allowed"
                      : "bg-gradient-to-r from-[#ff9900d9] to-[#f76a5dce]"
                  }  w-[140px] h-[37px] shadow-[2px_3px_5px_#ccc] p-[10px] m-[10px] rounded-[30px] text-center font-bold text-[#fff] text-[12px] inline-block hover:shadow-[0px_6px_8px_#e6e6e6]`}
                >
                  {isPreviousData ? "Load more" : "Xem thêm"}
                </div>
                {/* <WrapperButtonMore
                  textbutton={isPreviousData ? "Load more" : "Xem thêm"}
                  type="outline"
                  styleButton={{
                    border: `1px solid ${
                      products?.total === products?.data?.length
                        ? "#f5f5f5"
                        : "#9255FD"
                    }`,
                    color: `${
                      products?.total === products?.data?.length
                        ? "#f5f5f5"
                        : "#9255FD"
                    }`,
                    width: "240px",
                    height: "38px",
                    borderRadius: "4px",
                  }}
                  disabled={
                    products?.total === products?.data?.length ||
                    products?.totalPage === 1
                  }
                  styleTextButton={{ fontWeight: 500 }}
                  onClick={() => setLimit((prev) => prev + 8)}
                /> */}
              </div>
              <div className="m-6 w-[1270px]">
                  <div>
                    <h1 className="font-medium text-4xl py-2 pl-8">
                      Sản phẩm mới nhất
                    </h1>

                    <Slider
                      {...settings}
                      className="grid lg:grid-cols-5  py-5 sm:grid-cols-2 md:grid-cols-4"
                    >
                      {products?.data?.map((product) => (
                        <div key={product?.id} className="px-8">
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
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </Loading>
    </>
  );
};

export default HomePage;
