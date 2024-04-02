import PropTypes from 'prop-types';
function MessageFormikError({ formikErrorValue }) {
    return formikErrorValue && <p className={'error-message'}>{formikErrorValue}</p>;
}

MessageFormikError.propTypes = {
    formikErrorValue: PropTypes.string || PropTypes.number || PropTypes.object || PropTypes.array || PropTypes.bool,
};

export default MessageFormikError;
