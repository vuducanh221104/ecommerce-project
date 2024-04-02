import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    large = false,
    text = false,
    disabled = false,
    rounded = false,
    roundedText = false,
    leftIcon,
    rightIcon,
    borderTop,
    children,
    menuFix,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        menuFix,
        rounded,
        roundedText,
        borderTop,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon-left')}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={cx('icon-right')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    roundedText: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    borderTop: PropTypes.node,
    children: PropTypes.node.isRequired,
    menuFix: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
