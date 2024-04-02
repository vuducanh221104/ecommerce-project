import classNames from 'classnames/bind';
import styles from './LayoutAdmin.module.scss';

import React, { useState } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    FolderAddOutlined,
    MessageOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button, theme, Row, Col, Avatar, Typography, Drawer } from 'antd';

import '~/pages/Admin/styles/main.scss';
import '~/pages/Admin/styles/resposive.scss';
import config from '~/config';

const { Header, Sider, Content } = Layout;

const cx = classNames.bind(styles);

const LayoutAdmin = ({ children }) => {
    const { SubMenu } = Menu;
    const [collapsed, setCollapsed] = useState(false);

    const [visible, setVisible] = useState(false);
    const [placement, setPlacement] = useState('right');

    const openDrawer = () => setVisible(!visible);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Drawer
                title={false}
                placement={'left'}
                closable={true}
                onClose={() => setVisible(false)}
                visible={visible}
                key={'left'}
                width={250}
            >
                <Layout>
                    <Sider
                        trigger={null}
                        width={210}
                        className={cx('sider-primary ant-layout-sider-primary')}
                        style={{}}
                    >
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <Link to="/admin/dashboard">Dashboard</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<FolderAddOutlined />} title={<span>Products</span>}>
                                <Menu.Item key="2">
                                    <Link to="/admin/productList">Product List</Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/admin/addProduct">Add Product</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<ShoppingCartOutlined />} title={<span>Orders</span>}>
                                <Menu.Item key="4">
                                    <Link to={config.routesAdmin.orderList}>Order List</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<UserOutlined />} title={<span>User</span>}>
                                <Menu.Item key="5">
                                    <Link to={config.routesAdmin.userList}>User List</Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to={config.routesAdmin.addUser}>Add User</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<FolderAddOutlined />} title={<span>Edit</span>}>
                                <SubMenu key="sub5" icon={<FolderAddOutlined />} title={<span>Home</span>}>
                                    <Menu.Item key="7">
                                        <Link to={config.routesAdmin.imageHome}>Image Home</Link>
                                    </Menu.Item>
                                    <Menu.Item key="8">
                                        <Link to={config.routesAdmin.imageCustomer}>Image Customer</Link>
                                    </Menu.Item>
                                    <Menu.Item key="9">
                                        <Link to={config.routesAdmin.boxProductHome}> Box Product Home</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub6" icon={<FolderAddOutlined />} title={<span>Category</span>}>
                                    <Menu.Item key="10">
                                        <Link to={config.routesAdmin.categoryboxProduct}>Category List</Link>
                                    </Menu.Item>
                                    <Menu.Item key="11">
                                        <Link to={config.routesAdmin.addCategoryImage}>Add Image</Link>
                                    </Menu.Item>
                                    <Menu.Item key="12">
                                        <Link to={config.routesAdmin.addBoxProduct}>Add Box Product</Link>
                                    </Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu key="sub7" icon={<FolderAddOutlined />} title={<span>News</span>}>
                                <Menu.Item key="13">
                                    <Link to={'/admin/news'}>News List</Link>
                                </Menu.Item>
                            </SubMenu>

                            <Typography.Title
                                c
                                style={{
                                    fontSize: '1.4rem',
                                    color: '#fff',
                                    fontWeight: '400',
                                    marginLeft: '19px',
                                    marginTop: '20px',
                                }}
                            >
                                APP CHAT
                            </Typography.Title>
                            <Menu.Item key="14" icon={<MessageOutlined />}>
                                <Link to={config.routesAdmin.chat}>Chat With Customer </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </Layout>
            </Drawer>

            {/* Default Sider */}
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {}}
                // collapsed={collapsed ? collapsed : null}
                trigger={null}
                width={210}
                style={{ minHeight: '100vh' }}
                className={cx('navbar')}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<FolderAddOutlined />} title={<span>Products</span>}>
                        <Menu.Item key="2">
                            <Link to="/admin/productList">Product List</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/admin/addProduct">Add Product</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<ShoppingCartOutlined />} title={<span>Orders</span>}>
                        <Menu.Item key="4">
                            <Link to={config.routesAdmin.orderList}>Order List</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<UserOutlined />} title={<span>User</span>}>
                        <Menu.Item key="5">
                            <Link to={config.routesAdmin.userList}>User List</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to={config.routesAdmin.addUser}>Add User</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<FolderAddOutlined />} title={<span>Edit</span>}>
                        <SubMenu key="sub5" icon={<FolderAddOutlined />} title={<span>Home</span>}>
                            <Menu.Item key="7">
                                <Link to={config.routesAdmin.imageHome}>Image Home</Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Link to={config.routesAdmin.imageCustomer}>Image Customer</Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to={config.routesAdmin.boxProductHome}> Box Product Home</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" icon={<FolderAddOutlined />} title={<span>Category</span>}>
                            <Menu.Item key="10">
                                <Link to={config.routesAdmin.categoryboxProduct}>Category List</Link>
                            </Menu.Item>
                            <Menu.Item key="11">
                                <Link to={config.routesAdmin.addCategoryImage}>Add Image</Link>
                            </Menu.Item>
                            <Menu.Item key="12">
                                <Link to={config.routesAdmin.addBoxProduct}>Add Box Product</Link>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub7" icon={<FolderAddOutlined />} title={<span>News</span>}>
                        <Menu.Item key="13">
                            <Link to={'/admin/news'}>News List</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Typography.Title
                        c
                        style={{
                            fontSize: '1.4rem',
                            color: '#fff',
                            fontWeight: '400',
                            marginLeft: '19px',
                            marginTop: '20px',
                        }}
                    >
                        APP CHAT
                    </Typography.Title>
                    <Menu.Item key="14" icon={<MessageOutlined />}>
                        <Link to={config.routesAdmin.chat}>Chat With Customer </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Row>
                        <Col md={18}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setVisible(true)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                                className={cx('btn-sidebar-toggler')}
                            />
                        </Col>
                        <Col md={6}>
                            <Avatar size={'default'} icon={<UserOutlined />} /> Admin
                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        // margin: '24px 16px',
                        padding: 24,
                        background: '#eaeaea',
                    }}
                    className={cx('content')}
                >
                    <div className={'container'}>{children}</div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayoutAdmin;
