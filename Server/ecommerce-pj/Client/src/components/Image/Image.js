import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';
import React, { memo } from 'react';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const handleError = () => {
        return setFallback(customFallback);
    };

    const [fallback, setFallback] = useState('');
    return (
        <img
            ref={ref}
            className={classNames(styles.wrapper, className)}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};
export default Image;
