import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { Content, Footer, Header } from 'antd/es/layout/layout';

export default function LayoutMenu() {
    return (
        <Layout>
            {/* Header Navbar */}
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#001529' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                        <Link to="/cart">Cart</Link>
                    </Menu.Item>
                </Menu>
            </Header>

            {/* Main Content */}
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-content">
                    <Outlet />
                </div>
            </Content>

            {/* Footer */}
            <Footer style={{ textAlign: 'center' }}>
                Movie Store ©2025 Created by YourCompany
            </Footer>
        </Layout>
    );
}