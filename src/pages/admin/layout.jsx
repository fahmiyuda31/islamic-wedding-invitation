import React, { useState } from 'react';
import config from '@/config/config';
import Icon, { LaptopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, Modal, theme } from 'antd';
import Guest from './guest';
const { Header, Content, Footer, Sider } = Layout;
const listMenu = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Guest',
        path: '/guest',
    },
    // {
    //     key: '2',
    //     icon: <LaptopOutlined />,
    //     label: 'nav 2',
    //     path: '/nav2',
    // },
    // {
    //     key: '3',
    //     icon: <NotificationOutlined />,
    //     label: 'nav 3',
    //     path: '/nav3',
    // },
];

const MainLayout = ({ db }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const pathname = window.location.pathname;
    const selectedKey = listMenu.find((item) => item.path === pathname)?.key;

    const handleClickMenu = (select) => {
        const selectedKey = listMenu.find((item) => item.key === select.key);
        window.location.href = selectedKey.path;
    };

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ flex: 1, color: '#fff' }}>Weedig App</p>
                    <div style={{ width: 30 }}></div>
                    <Button type="primary" className='text-white bg-amber-600' onClick={() => window.location.href = '/'}>Open Guest App</Button>
                </div>

                <div className="demo-logo" style={{ color: '#fff' }} />
                <p style={{ flex: 1, textAlign: 'right', color: '#fff' }}>Admin</p>
                <div style={{ width: 30 }}></div>
                <Button
                    type="primary"
                    danger
                    icon={<Icon type="logout" />} db
                    onClick={() => {
                        Modal.confirm({
                            title: 'Konfirmasi Logout',
                            content: 'Apakah Anda yakin ingin logout?',
                            okText: 'Ya',
                            cancelText: 'Tidak',
                            onOk: () => {
                                // Fungsi logout disini
                                localStorage.removeItem('user');
                                window.location.href = "/login";
                            },
                        });
                    }}
                >
                    Logout
                </Button>
            </Header>
            <div style={{ padding: '0 48px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Layout
                    style={{ padding: '24px 0', minHeight: 'calc(90vh - 64px)', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    <Sider >
                        {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button> */}
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[selectedKey]}
                            defaultOpenKeys={['sub1']}
                            inlineCollapsed={collapsed}
                            items={listMenu}
                            onClick={handleClickMenu}
                            // theme="dark"
                            style={{
                                minHeight: '100%',
                            }}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {pathname === '/guest' && <Guest db={db} />}
                        {/* {pathname === '/nav2' && <Nav2 />}
                        {pathname === '/nav3' && <Nav3 />} */}
                    </Content>
                </Layout>
            </div>
            <Footer style={{ textAlign: 'center' }}>
                Weeding Inviatio {config.data.brideName} & {config.data.groomName} - April 2025
            </Footer>
        </Layout>
    );
};

export default MainLayout;