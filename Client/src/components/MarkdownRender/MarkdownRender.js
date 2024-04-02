import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const MarkdownRender = ({ content }) => {
    return <ReactMarkdown>{content}</ReactMarkdown>;
};

MarkdownRender.propTypes = {
    content: PropTypes?.string.isRequired,
};
export default MarkdownRender;
