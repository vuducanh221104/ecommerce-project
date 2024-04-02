import React from 'react';
import PropTypes from 'prop-types';

function FormattedPrice({ value }) {
    const formattedPrice = () => {
        return value?.toLocaleString('vi-VN', {
            currency: 'VND',
        });
    };

    const formattedPriceString = formattedPrice();

    return <>{formattedPriceString + 'đ'}</>;
}

FormattedPrice.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FormattedPrice; 
