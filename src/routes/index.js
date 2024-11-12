import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../pages/HomePage/HomePage";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import NotFoundPage from "../pages/NotfoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
    {
        path:'/',
        page:HomePage,
        ishowHeader:true
    },
    {
        path:'/order',
        page:OrderPage,
        ishowHeader:true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        ishowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        ishowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        ishowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true
    },
    {
        path:'/products',
        page:ProductPage,
        ishowHeader:true
    },
    {
        path: '/product/:type',
        page:TypeProductPage,
        ishowHeader:true
    },
    {
        path:'/sign-in',
        page:SignInPage,
        ishowHeader:false
    },
    {
        path:'/sign-up',
        page:SignUpPage,
        ishowHeader:false
    },
    {
        path:'/product-details/:id',
        page:ProductDetailPage,
        ishowHeader:true
    },
    {
        path:'/profile-user',
        page:ProfilePage,
        ishowHeader:true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        ishowHeader:false,
    },
    {
        path:'*',
        page:NotFoundPage
    },
]