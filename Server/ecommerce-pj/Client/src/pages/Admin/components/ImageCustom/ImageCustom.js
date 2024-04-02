import React, { useState, useEffect } from 'react';
import { Image } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import 'react-markdown-editor-lite/lib/index.css';
import styles from './ImageCustom.module.scss';

const cx = classNames.bind(styles);

function ImageCustom({ file, handleDelete, handleEdit, handleFileChange, width, height }) {
    const [blobURL, setBlobURL] = useState(null);

    useEffect(() => {
        if (file instanceof File) {
            const objectURL = URL.createObjectURL(file);
            setBlobURL(objectURL);

            return () => {
                URL.revokeObjectURL(objectURL);
            };
        }
    }, [file]);

    return (
        <div className={cx('wrapper-images-preview-content')} style={{ width, height }}>
            {file ? (
                <>
                    <Image src={blobURL ? blobURL : file} className={cx('wrapper-images-preview-img')} />
                    {handleEdit ? (
                        <EditOutlined className={cx('icon-trash-in-image')} onClick={handleEdit} />
                    ) : (
                        <DeleteOutlined className={cx('icon-trash-in-image')} onClick={handleDelete} />
                    )}
                </>
            ) : (
                <div className={cx('upload-wrapper')} style={{ width, height }}>
                    <span className={cx('upload-content')}>
                        <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e)} />
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: '8px' }}>Upload</div>
                        </div>
                    </span>
                </div>
            )}
        </div>
    );
}

export default ImageCustom;
