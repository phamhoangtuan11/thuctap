import React, { useState } from 'react'
import { getItem } from '../../utils';
import { Menu } from 'antd';
import { AppstoreOutlined, UserOutlined,ShoppingCartOutlined  } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'users', <UserOutlined />),
    getItem('Sản phẩm', 'products', <AppstoreOutlined />),
    getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
  ];
  const [keySelected, setKeySelected] = useState('');
  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return (
          <AdminUser />
        )
      case 'products':
        return (
          <AdminProduct />
        )
        case 'order':
          return (
            <OrderAdmin />
          )
      default:
        return <></>
    }
  }



  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  return (
    <>
    <HeaderComponent isHiddenSearch isHiddenCart/>
    <div style={{ display: 'flex',overflowX: 'hidden' }}>
       <Menu
      mode="inline"
      style={{
        width: 256,
        boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
      }}
      items={items}
      onClick={handleOnCLick}
    />
    <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
    {renderPage(keySelected)}
    </div>
    </div>
    </>
  )
}

export default AdminPage