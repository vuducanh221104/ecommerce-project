import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';

import React, { useEffect, useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Table, Modal, Space, Form, Input, Tooltip, Radio, message } from 'antd';
import { DeleteOutlined, SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';

import axios from 'axios';
import InfoDetailProduct from './InfoDetailProduct';
import EditDetailProduct from './EditDetailProduct';
import EditProduct from './EditProduct';
import { NumericFormat } from 'react-number-format';
import { useMessage } from '~/pages/Admin/components/Message';
import { deleteProduct, deleteProductDetail, getListProduct } from '~/pages/Admin/services/productServices';

const cx = classNames.bind(styles);

function ProductList() {
    const { messageSuccess, messageError, contextHolder } = useMessage();
    const [dataProduct, setDataProduct] = useState([]);
    const [selectedId, setselectedId] = useState([]);
    const [selectedSlug, setSelectedSlug] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [editProductDeleteId, setEditProductDeleteId] = useState(null);
    const [infoModal, setInfoModal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [radioBtnValue, setRadioBtnValue] = useState('product');

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    // Handle Search
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
                    padding: 12,
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
                        ghost
                        type="primary"
                        size="small"
                        style={{
                            width: 90,
                            height: 40,
                        }}
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
                    fontSize: '1.8rem',
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) =>
            searchedColumn === dataIndex ? (
                <span>
                    <img src={record.image} style={{ width: '40px', marginRight: '5px' }} />
                    <Tooltip placement="topLeft" title={text}>
                        <Highlighter
                            highlightStyle={{
                                backgroundColor: '#ffc069',
                                padding: 0,
                            }}
                            searchWords={[searchText]}
                            autoEscape
                            textToHighlight={text ? text.toString() : ''}
                        />
                    </Tooltip>
                </span>
            ) : (
                <span>
                    <img src={record.image} style={{ width: '40px', marginRight: '5px' }} />
                    <span style={{ fontWeight: '500' }}>
                        <Tooltip placement="topLeft" title={text}>
                            {text}
                        </Tooltip>
                    </span>
                </span>
            ),
    });

    // HANDLE EDIT
    const showEditModal = (recordId) => {
        setEditProductId(recordId);
    };

    // CALL API DATA
    const fetchApi = () => {
        getListProduct()
            .then((res) => setDataProduct(res))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchApi();
    }, []);

    // HANDLE DELETE
    const showDeleteModal = (recordId) => {
        setEditProductDeleteId(recordId);
    };
    const hideDeleteModal = () => {
        setEditProductDeleteId(null);
    };

    // Click Delete Product & Product Detail
    const handleDeleteCickOk = async (recordId, recordSlug) => {
        try {
            await deleteProduct(recordId);
            await deleteProductDetail(recordSlug);
            fetchApi();
            messageSuccess();
        } catch (error) {
            console.error('Error delete:', error);
            messageError();
        } finally {
            setShowModal(false);
        }
    };

    // Handle Selected Element
    const onSelectChange = (newselectedId, newselectedSlug) => {
        setselectedId(newselectedId);
        const updateSelectedSlugs = newselectedSlug.map((item) => item.slug);
        setSelectedSlug(updateSelectedSlugs);
    };
    const rowSelection = {
        selectedId,
        onChange: onSelectChange,
    };
    const hasSelected = selectedId.length > 0;

    // Set value for each element
    const rows = dataProduct?.map((record) => {
        return {
            key: record._id,
            name: record.name,
            image: record.image,
            type: record.type,
            price: record.price_discount,
            originalPrice: record.price,
            price_prepay: record.price_prepay,
            percent_discount: record.percent_discount,
            brand: record.brand,
            type: record.type,
            category: record.category,
            status:
                record.stored > 0 ? (
                    <Button size={3} style={{ backgroundColor: 'skyblue' }}>
                        Còn hàng
                    </Button>
                ) : (
                    <Button size={3} style={{ backgroundColor: '#FFECED  ' }}>
                        Hết hàng
                    </Button>
                ),
            stored: record.stored,
            actionDelete: record._id,
            actionEdit: record._id,
            slug: record.slug,
        };
    });

    const columns = [
        // _Id
        {
            title: '_Id',
            dataIndex: 'key',
            ellipsis: {
                showTitle: false,
            },
            width: 100,
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
                            setRadioBtnValue('product');
                        }}
                        onCancel={() => {
                            setInfoModal(null);
                            setRadioBtnValue('product');
                        }}
                        className={cx('modal-custom')}
                    >
                        <Radio.Group
                            value={radioBtnValue}
                            defaultValue="product"
                            buttonStyle="solid"
                            onChange={(e) => setRadioBtnValue(e.target.value)}
                        ></Radio.Group>
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
                            className={cx('testInput')}
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
                            <Form.Item label="Name" name="name" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.name} />
                            </Form.Item>
                            <Form.Item label="Image Product" name="image" className={cx('label-edit')}>
                                <Tooltip placement="topLeft" title={record.image}>
                                    <Input disabled defaultValue={record.image} />
                                </Tooltip>
                            </Form.Item>
                            <Form.Item label="Price" name="price" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.price} />
                            </Form.Item>
                            <Form.Item label="Price Discount" name="priceDiscount" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.originalPrice} />
                            </Form.Item>
                            <Form.Item label="Price Prepay" name="price_prepay" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.price_prepay} />
                            </Form.Item>
                            <Form.Item label="Percent Discount" name="percent_discount" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.percent_discount} />
                            </Form.Item>
                            <Form.Item label="Brand" name="brand" className={cx('label-edit')} style={{}}>
                                <Input disabled defaultValue={record.brand} />
                            </Form.Item>
                            <Form.Item label="Type" name="Type" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.type} />
                            </Form.Item>

                            <Form.Item label="Category" name="Category" className={cx('label-edit')}>
                                <div style={{ marginTop: '40px' }}>
                                    <Form.Item label="Category Slug" className={cx('label-edit')}>
                                        <Input disabled defaultValue={record.category.category_slug} />
                                    </Form.Item>
                                    <Form.Item label="Category Item Slug" className={cx('label-edit')}>
                                        <Input disabled defaultValue={record.category.category_item_slug} />
                                    </Form.Item>
                                    <Form.Item label="Category Item Child Slug" className={cx('label-edit')}>
                                        <Input disabled defaultValue={record.category.category_item_child_slug} />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            {/* INFO DETAIL PRODUCT */}
                            <InfoDetailProduct recordSlug={record.slug} />
                            <Form.Item label="Stored" name="stored" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.stored} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            ),
        },

        // NAME
        {
            title: 'Product Name',
            dataIndex: 'name',
            ellipsis: {
                showTitle: false,
            },
            width: 200,
            ...getColumnSearchProps('name'),
        },
        // PRICE
        {
            title: 'Price',
            dataIndex: 'price',
            width: 200,
            render: (text, record) => (
                <span style={{ display: 'flex', flexDirection: 'column', fontWeight: '600' }}>
                    <NumericFormat
                        value={record.price}
                        allowLeadingZeros
                        thousandSeparator=","
                        suffix={'đ'}
                        style={{ fontSize: '1.4rem', fontWeight: '600' }}
                    />
                    <span
                        style={{ textDecoration: 'line-through', marginRight: '4px', color: '#999', fontWeight: '400' }}
                    >
                        <NumericFormat
                            value={record.originalPrice}
                            allowLeadingZeros
                            thousandSeparator=","
                            suffix={'đ'}
                            style={{ fontSize: '1.3rem', textDecoration: 'line-through' }}
                        />
                    </span>
                </span>
            ),
        },

        // CATEGORY
        {
            title: 'Category',
            dataIndex: 'type',
            width: 150,
        },

        // STORED
        {
            title: 'Stored',
            dataIndex: 'stored',
            width: 150,
        },

        // STATUS
        {
            title: 'Status',
            dataIndex: 'status',
            width: 150,
        },

        // ACTION
        {
            title: 'Action',
            dataIndex: 'action',
            width: 150,
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => {
                            showEditModal(record.key);
                        }}
                        style={{ marginRight: '10px' }}
                    >
                        Edit
                    </Button>
                    {/* EDIT COMPONENT  */}
                    <EditProduct
                        editProductId={editProductId}
                        recordId={record.key}
                        setEditProductId={setEditProductId}
                        record={record}
                    />

                    {/* BTN DELETE */}
                    <Space onClick={() => showDeleteModal(record.key)}>
                        <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer', fontSize: '1.8rem' }} />
                    </Space>
                    <Modal
                        title="Bạn Có Chắc Chắn Muốn Xóa Không ?"
                        visible={editProductDeleteId === record.key}
                        onOk={() => {
                            handleDeleteCickOk(record.key, record.slug);
                        }}
                        onCancel={hideDeleteModal}
                        style={{ marginTop: '150px' }}
                    >
                        <p>
                            Xóa
                            <span style={{ fontWeight: '700', fontSize: '1.5rem' }}> {record.actionDelete}</span>
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
                }}
            >
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? (
                        <div>
                            Selected {selectedId.length} items
                            <Button
                                onClick={() => setShowModal(true)}
                                type="primary"
                                danger
                                style={{ marginLeft: '10px' }}
                            >
                                Xóa
                            </Button>
                        </div>
                    ) : (
                        ''
                    )}
                </span>
                <Modal
                    title="Bạn Có Chắc Chắn Muốn Xóa Không ?"
                    visible={showModal}
                    onOk={() => handleDeleteCickOk(selectedId, selectedSlug)}
                    onCancel={() => setShowModal(false)}
                    style={{ marginTop: '150px' }}
                >
                    <p>
                        Xóa:
                        {selectedId.map((item, index) => (
                            <div style={{ fontWeight: '700', fontSize: '1.5rem' }} key={index}>
                                {' '}
                                {item}
                            </div>
                        ))}
                    </p>
                </Modal>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={rows} scroll={{ x: 'max-content' }} />
        </div>
    );
}
export default ProductList;
