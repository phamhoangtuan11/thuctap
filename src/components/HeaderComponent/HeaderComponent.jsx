import React, { useEffect, useState } from "react";
// https://www.fahasa.com/

import phoneLogo from "../../assets/images/phone_icon.webp";
import cartIcon from "../../assets/images/cart_icon.webp";
import useIcon from "../../assets/images/account_icon.webp";
import headerIcon1 from "../../assets/images/policy_header_image_1.webp";
import headerIcon2 from "../../assets/images/policy_header_image_2.webp";
import headerIcon3 from "../../assets/images/policy_header_image_3.webp";

import {WrapperContentPopup, // WrapperHeader,WrapperHeaderAccout,WrapperTextHeader,WrapperTextHeaderSmall //
} from "./style";
import { Badge, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import ButttonInputSearch from "../ButtonInputSearch/ButttonInputSearch";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import "./style.css";
// import {UserOutlined,CaretDownOutlined,ShoppingCartOutlined,} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlide";
// import { clearCart} from '../../redux/slides/orderSlide';
const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    // localStorage.removeItem("persist:root");
    dispatch(resetUser());
    // dispatch(clearCart)
    setLoading(false);
  };

  useEffect(() => {
    const setTimeoutId = setTimeout(()=>{
      setLoading(true);
      setUserName(user?.name);
      setUserAvatar(user?.avatar);
      setLoading(false);
    },290)
    return ()=>{
      clearTimeout(setTimeoutId)
    }
  }, [user?.name, user?.avatar]);
  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}> Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (<WrapperContentPopup onClick={() => handleClickNavigate("admin")}>Quản lí hệ thống</WrapperContentPopup>)}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );
  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    // dispatch(searchProduct(e.target.value));
  };
  const searchSubmit = () => {
    dispatch(searchProduct(search));
  };
  return (
    <>
      <div className="max-w-[1280px] mx-auto">
        <img
          src="https://bookbuy.vn/Images/frontend/sieu-sale-thang-10.jpg"
          alt=""
        />
      </div>
      <header className="header-search-sticky shadow-lg">
        <div>
          <div className="max-w-[1280px] mx-auto">
            <div className="d-flex justify-between items-center pt-[10px] pb-[4px]">
              <Link to="/">
                <img
                  className="w-24 h-[60px]"
                  src="https://tse3.mm.bing.net/th?id=OIP.81UCff8-qpTLhW8wLY9k7AHaHa&pid=Api&P=0&h=180"
                  alt=""
                />
              </Link>
              {!isHiddenSearch && (
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="header-input"
                    onChange={onSearch}
                  />
                  <SearchOutlined
                    onClick={searchSubmit}
                    className="fa-solid fa-magnifying-glass w-[57px] rounded-r-[99px] icon"
                  />
                </div>
                <ul className="d-flex mt-[8px] ">
                  <li className="mr-[8px] ">
                    <a
                      href="!#"
                      className=" no-underline text-[1.2rem] text-[#6c757d]"
                    >
                      Sách
                    </a>
                  </li>
                  <li className="mr-[8px]">
                    <a
                      href="!#"
                      className=" no-underline text-[1.2rem] text-[#6c757d]"
                    >
                      Đồ chơi
                    </a>
                  </li>
                  <li className="mr-[8px]">
                    <a
                      href="!#"
                      className="no-underline text-[1.2rem] text-[#6c757d]"
                    >
                      Quà tặng
                    </a>
                  </li>
                  <li className="mr-[8px]">
                    <a
                      href="!#"
                      className=" no-underline text-[1.2rem] text-[#6c757d]"
                    >
                      Vpp
                    </a>
                  </li>
                </ul>
              </div>
              )}
              <div className="flex items-center gap-[16px]">
              {!isHiddenSearch && (
                <div className="flex items-center">
                  <img
                    className="w-[32px] h-[32px] mr-[16px]"
                    src={phoneLogo}
                    alt=""
                  />
                  <div>
                    <p className="my-0 text-[14px] text-[#000000]">
                      Hỗ trợ khách hàng
                    </p>
                    <div
                      className="no-underline text-[14px] text-[#000000] font-bold hover:text-[#BC141B]"
                    >
                      0968.715.858
                    </div>
                  </div>
                </div>
                )}
                <Loading isLoading={loading}>
                  <div className="flex items-center gap-2">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt="avatar"
                        style={{
                          height: "35px",
                          width: "35px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        className="w-[32px] h-[32px] mr-[16px]"
                        src={useIcon}
                        alt=""
                      />
                    )}
                    {user?.access_token ? (
                      <>
                        <Popover
                          content={content}
                          trigger="click"
                          open={isOpenPopup}
                        >
                          <div
                            className="cursor-pointer font-normal tracking-tighter"
                            onClick={() => setIsOpenPopup((prev) => !prev)}
                          >
                            {userName?.length ? userName : user?.email}
                          </div>
                        </Popover>
                      </>
                    ) : (
                      <div
                        onClick={handleNavigateLogin}
                        style={{ cursor: "pointer" }}
                      >
                        <div className=" no-underline text-[14px] text-[#000000] hover:text-[#BC141B] block">
                          Đăng nhập
                        </div>
                        <div className=" no-underline text-[11px] text-[#000000] hover:text-[#BC141B]">
                          Tài khoản
                        </div>
                      </div>
                    )}
                  </div>
                </Loading>

                {!isHiddenCart ? (
                  <div
                    onClick={() => navigate("/order")}
                    className="cursor-pointer flex items-center header-cart"
                  >
                    <Badge count={`${user?.access_token && order?.orderItems?.length}`} size="small"> 
                      <img
                        src={cartIcon}
                        alt=""
                        className="w-[24px] h-[24px]"
                      />
                    </Badge>

                    <p className="text-[1.4rem] text-[#000000] my-0 mx-[8px]">
                      Giỏ hàng
                    </p>
                  </div>
                ): (<div className="mr-[100px]"></div>)}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="bg-gradient-to-r from-[#ff9900d9] to-[#f76a5dce] pt-[10px]">
        <div className="container-wrap">
          <div className="d-flex h-[48px]">
            <div className="d-flex items-center">
              <img
                src={headerIcon1}
                className="w-[32px] h-[32px] mr-[10px]"
                alt=""
              />
              <Link
                to="/polyci"
                className=" no-underline text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]"
              >
                Chính sách đổi trả
              </Link>
            </div>
            <div className="d-flex items-center">
              <img
                src={headerIcon2}
                className="w-[32px] h-[32px] mr-[10px]"
                alt=""
              />
              <Link
                to="!#"
                className=" no-underline text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]"
              >
                Hệ thống cửa hàng
              </Link>
            </div>
            <div className="d-flex items-center">
              <img
                 src={headerIcon3}
                className="w-[32px] h-[32px] mr-[10px]"
                alt=""
              />
              <Link
                to="!#"
                className="no-underline text-[1.6rem] text-[#ffffff] mr-[28px] hover:text-[#fbd947]"
              >
                Kiểm tra đơn hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div style={{  heiht: '100%', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
    //   <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
    //     <Col span={5}>
    //       <WrapperTextHeader to='/'><img className='w-24 h-[60px]' src="https://tse3.mm.bing.net/th?id=OIP.81UCff8-qpTLhW8wLY9k7AHaHa&pid=Api&P=0&h=180" alt="" /></WrapperTextHeader>
    //     </Col>
    //     {!isHiddenSearch && (
    //        <div className='relative'>
    //        <input onChange={onSearch} type='text' placeholder='Tìm kiếm sản phẩm...' className='header-input'/>
    //        <SearchOutlined className='fa-solid fa-magnifying-glass w-[57px] rounded-r-[99px] icon' />
    //      </div>
    //   //   <Col span={13}>
    //   //   <ButttonInputSearch
    //   //     size="large"
    //   //     bordered={false}
    //   //     placeholder="Tìm kiếm sản phẩm..."
    //   //     onChange={onSearch}
    //   //     backgroundcolorbutton="#5a20c1"
    //   //     width= "450px"
    //   //     />
    //   // </Col>
    //     )}
    //     <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
    //     <Loading isLoading={loading}>
    //     <WrapperHeaderAccout>

    //     {userAvatar ? (
    //         <img src={userAvatar} alt="avatar" style={{
    //           height: '30px',
    //           width: '30px',
    //           borderRadius: '50%',
    //           objectFit: 'cover'
    //         }} />
    //       ) : (
    //         <UserOutlined style={{ fontSize: '  30px' }} />
    //       )}
    //         {user?.access_token ? (
    //           <>

    //          <Popover content={content} trigger="click" open={isOpenPopup}>
    //             <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
    //           </Popover>
    //         </>
    //         ):(
    //         <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
    //           <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
    //           <div>
    //             <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
    //             <CaretDownOutlined />
    //           </div>
    //         </div>
    //         )}

    //     </WrapperHeaderAccout>
    //     </Loading>
    //     {!isHiddenCart && (
    //        <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
    //        <Badge count={order?.orderItems?.length} size="small">
    //         <ShoppingCartOutlined style={{ fontSize: '30px'}} />
    //       </Badge>
    //       <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
    //     </div>
    //     )}
    //     </Col>
    //   </WrapperHeader>
    // </div>
  );
};

export default HeaderComponent;
