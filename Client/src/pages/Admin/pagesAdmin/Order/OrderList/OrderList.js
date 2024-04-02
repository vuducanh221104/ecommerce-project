import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';

import React, { useEffect, useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Table, Modal, Tag, Space, Form, Input, Tooltip, Radio, message } from 'antd';
import { DeleteOutlined, SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';

import axios from 'axios';
import EditUser from '../../User/UserList/EditUser';
import ExchangeTime from '~/components/ExchangeTIme';
import { useMessage } from '~/pages/Admin/components/Message';
import { deleteOrder, getListOrder } from '~/pages/Admin/services/orderServices';

const cx = classNames.bind(styles);
function OrderList() {
    const { messageSuccess, messageError, contextHolder } = useMessage();
    const { TextArea } = Input;
    const [dataUser, setDataUser] = useState([]);
    const [selectedListId, setSelectedListId] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [userDeleteId, setUserDeleteId] = useState(null);
    const [infoModal, setInfoModal] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                            height: 40,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                            height: 40,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        danger
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // CALL API DATA
    const fetchApi = () => {
        getListOrder()
            .then((res) => setDataUser(res))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchApi();
    }, []);

    // HANDLE DELETE
    const showDeleteModal = (recordId) => {
        setUserDeleteId(recordId);
    };

    const hideDeleteModal = () => {
        setUserDeleteId(null);
    };

    // Click Delete Product & Product Detail
    const handleDeleteCickOk = (listId) => {
        deleteOrder(listId)
            .then(() => {
                fetchApi();
                messageSuccess();
            })
            .catch((err) => {
                console.error('Detele Error', err);
                messageError();
            })
            .finally(() => {
                setUserDeleteId(null);
            });
    };

    // Handle Selected Element
    const onSelectChange = (newselectedListId) => {
        setSelectedListId(newselectedListId);
    };
    const rowSelection = {
        selectedListId,
        onChange: onSelectChange,
    };

    // Set value for each element
    const rows = dataUser.map((record) => ({
        key: record._id,
        id: record._id,
        orderId: record.orderId,
        deliveryMethod: record.deliveryMethod,
        methodPayment: record.methodPayment,
        fullname: record.dataCustomer.fullname,
        username: record.dataCustomer.username ? record.dataCustomer.username : 'Customer Online',
        email: record.dataCustomer.email,
        phone: record.dataCustomer.phone,
        phone: record.dataCustomer.phone,
        nameOtherPeople: record.dataCustomer.nameOtherPeople,
        phoneOtherPeople: record.dataCustomer.phoneOtherPeople,
        descriptionCustomer: record.dataCustomer.descriptionCustomer,
        dataProduct: record.dataProduct,
        infoPayment: record.infoPayment,
        createdAt: <ExchangeTime time={record.createdAt} />,
    }));

    const columns = [
        // _Id
        {
            title: 'Order Id',
            dataIndex: 'orderId',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('orderId'),
            width: 70,
            render: (text, record) => (
                <div className="modal-info-detail">
                    <InfoCircleOutlined
                        onClick={() => setInfoModal(record.key)}
                        style={{ color: '#08c', fontSize: '1.6rem' }}
                    />
                    <span style={{ marginLeft: '10px' }}>
                        <Tooltip placement="topLeft" title={text}>
                            {text}
                        </Tooltip>
                    </span>
                    <Modal
                        title="Info"
                        visible={infoModal === record.key}
                        onOk={() => {
                            setInfoModal(null);
                        }}
                        onCancel={() => {
                            setInfoModal(null);
                        }}
                        className={cx('modal-custom')}
                    >
                        <Form
                            name="basic"
                            labelCol={{
                                span: 3,
                                style: {
                                    lineHeight: '40px',
                                },
                            }}
                            wrapperCol={{
                                span: 21,
                            }}
                            className={cx('text-form-custom ')}
                            style={{
                                maxWidth: '100%',
                                marginLeft: '10px',
                                fontWeight: '600',
                                padding: '0 20px',
                                overflowY: 'scroll',
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                        >
                            <Form.Item label="Order Id" name="orderId">
                                <Input disabled defaultValue={record.orderId} />
                            </Form.Item>
                            <Form.Item label="Fullname" name="fullname">
                                <Input disabled defaultValue={record.fullname} />
                            </Form.Item>
                            {/* <Form.Item label="username" name="username" >
                                    <Input disabled defaultValue={record.username} />
                                </Form.Item> */}
                            <Form.Item label="Email" name="email">
                                <Input disabled defaultValue={record.email} />
                            </Form.Item>
                            <Form.Item label="Phone" name="phone">
                                <Input disabled defaultValue={record.phone} />
                            </Form.Item>
                            <Form.Item label="Payment Method" name="methodPayment">
                                <Input disabled defaultValue={record.methodPayment} />
                            </Form.Item>
                            {record.descriptionCustomer && (
                                <Form.Item label="Description" name="descriptionCustomer">
                                    <Input disabled defaultValue={record.descriptionCustomer} />
                                </Form.Item>
                            )}
                            {record.nameOtherPeople && (
                                <Form.Item label="Receiver Other " name="descriptionCustomer">
                                    <div className={'mt-5 mx-4'}>
                                        <Form.Item label="Name" name="">
                                            <Input disabled defaultValue={record.nameOtherPeople} />
                                        </Form.Item>
                                        <Form.Item label="Phone" name="">
                                            <Input disabled defaultValue={record.phoneOtherPeople} />
                                        </Form.Item>
                                    </div>
                                </Form.Item>
                            )}
                            <Form.Item label="Delivery Method" name="deliveryMethod">
                                <div className={'mt-5 mx-4'}>
                                    <Form.Item label="Name">
                                        <Input disabled defaultValue={record.deliveryMethod.name} />
                                    </Form.Item>
                                    <Form.Item label="Info">
                                        <Input disabled defaultValue={record.deliveryMethod.info} />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            <Form.Item label="Info Products" name="dataProduct">
                                {record.dataProduct.products.map((item, index) => (
                                    <Form.Item label={index + 1} className={'mt-5 mx-4'} key={index}>
                                        <>
                                            <img
                                                src={item.image}
                                                className={cx('avatar-img')}
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                            <Form.Item label="Name">
                                                <Input disabled defaultValue={item.name} />
                                            </Form.Item>
                                            <Form.Item label="Color">
                                                <Input disabled defaultValue={item.selectedColor} />
                                            </Form.Item>
                                            <Form.Item label="Link">
                                                <Input disabled defaultValue={item.link} />
                                            </Form.Item>
                                            <Form.Item label="Price">
                                                <Input disabled defaultValue={item.price} />
                                            </Form.Item>
                                            <Form.Item label="Quantity">
                                                <Input disabled defaultValue={item.quantity} />
                                            </Form.Item>
                                            <Form.Item label="Description">
                                                <TextArea
                                                    value={item.description}
                                                    rows={4}
                                                    className={cx('custom-text-arena')}
                                                />
                                            </Form.Item>
                                        </>
                                    </Form.Item>
                                ))}
                            </Form.Item>
                            <Form.Item label="Info Payment">
                                <TextArea
                                    value={record.infoPayment || 'null'}
                                    rows={3}
                                    className={cx('custom-text-arena')}
                                />
                            </Form.Item>
                            <Form.Item label="Created At">
                                <div style={{ marginTop: '7px', fontSize: '1.6rem' }}>{record.createdAt}</div>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            ),
        },
        // NAME
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            ellipsis: {
                showTitle: true,
            },
            width: 140,
            ...getColumnSearchProps('fullname'),
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // USER NAME
        {
            title: 'User Name',
            dataIndex: 'username',
            ellipsis: {
                showTitle: true,
            },
            width: 140,
            ...getColumnSearchProps('username'),
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // EMAIL
        {
            title: 'Email',
            dataIndex: 'email',
            ellipsis: {
                showTitle: false,
            },
            width: 150,
            ...getColumnSearchProps('email'),
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // PHONE
        {
            title: 'Phone',
            dataIndex: 'phone',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('phone'),
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // DELIVERY METHOD
        {
            title: 'Delivery Method',
            dataIndex: 'deliveryMethod',
            ellipsis: {
                showTitle: false,
            },
            width: 50,
            ...getColumnSearchProps('deliveryMethod.name'),
            render: (text) => (
                <Tooltip title={text.info}>
                    <span>{text.name}</span>
                </Tooltip>
            ),
        },
        // PAYMENT METHOD
        {
            title: 'Payment Method',
            dataIndex: 'methodPayment',
            ellipsis: {
                showTitle: false,
            },
            width: 50,
            ...getColumnSearchProps('methodPayment'),
            render: (text) => (
                <Tooltip title={text}>
                    <Tag color={text === 'cash' ? '#87d068' : '#108ee9'}>{text}</Tag>
                </Tooltip>
            ),
        },
        // PRODUCT QUANTITY
        {
            title: 'Quantity',
            dataIndex: 'dataProduct',
            ellipsis: {
                showTitle: false,
            },
            width: 50,
            // ...getColumnSearchProps('dataProduct'),
            render: (text) => <span>{text.products.length}</span>,
        },
        // CREATED AT
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('createdAt'),
        },
        // ACTION
        {
            title: 'Action',
            dataIndex: 'action',
            width: 30,
            render: (text, record) => (
                <>
                    {/* BTN DELETE */}
                    <Space onClick={() => showDeleteModal(record.id)}>
                        <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer', fontSize: '1.8rem' }} />
                    </Space>
                    <Modal
                        title="Bạn Có Chắc Chắn Muốn Xóa Không ?"
                        visible={userDeleteId === record.id}
                        onOk={() => {
                            handleDeleteCickOk(record.id);
                        }}
                        onCancel={hideDeleteModal}
                        style={{ marginTop: '150px' }}
                    >
                        <p>
                            Xóa:
                            <span style={{ fontWeight: '700', fontSize: '1.5rem' }}> {record.orderId}</span>
                        </p>
                    </Modal>
                </>
            ),
        },
    ];

    return (
        <div>
            {contextHolder}
            <div
                style={{
                    marginBottom: 16,
                    display: 'flex',
                }}
            >
                <span
                    style={{
                        marginLeft: 8,
                    }}
                    className={'ant-col ant-col-md-22 css-dev-only-do-not-override-pr0fja'}
                >
                    {selectedListId.length > 0 ? (
                        <span>
                            Selected {selectedListId.length} items
                            <Button
                                onClick={() => {
                                    setShowModalDelete(true);
                                }}
                                type="primary"
                                danger
                                style={{ marginLeft: '10px' }}
                            >
                                Xóa
                            </Button>
                        </span>
                    ) : (
                        ''
                    )}
                    <Modal
                        title="Bạn Có Chắc Chắn Muốn Xóa Không ?"
                        visible={showModalDelete}
                        onOk={() => {
                            handleDeleteCickOk(selectedListId);
                            setShowModalDelete(false);
                            setSelectedListId([]);
                        }}
                        onCancel={() => setShowModalDelete(false)}
                        style={{ marginTop: '150px' }}
                    ></Modal>
                </span>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={rows}
                rowKey={(record) => record.id}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
}
export default OrderList;
