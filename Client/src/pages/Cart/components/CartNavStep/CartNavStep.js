import styles from './CartNavStep.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { BsCart2, BsCheckCircle, BsPersonCircle, BsWallet2 } from 'react-icons/bs';
const cx = classNames.bind(styles);

function CartNavStep({ activeStep }) {
    const steps = [
        { icon: <BsCart2 className={cx('icon-cart-1')} />, title: 'Kiểm tra', title2: 'giỏ hàng' },
        { icon: <BsPersonCircle className={cx('icon-cart-1')} />, title: 'Thông tin ', title2: 'mua hàng' },
        { icon: <BsWallet2 className={cx('icon-cart-1')} />, title: 'Hình thức ', title2: 'thanh toán' },
        {
            icon: <FontAwesomeIcon icon={faCheckCircle} className={cx('icon-cart-4')} />,
            title: 'Đặt hàng ',
            title2: 'thành công',
        },
    ];

    return (
        <div className={cx('cart-navstep', 'mb-5')}>
            {steps.map((step, index) => (
                <span className={cx('cart-navstep-item', { active: index + 1 <= activeStep })} key={index}>
                    {step.icon} {/* Sử dụng biểu tượng trực tiếp */}
                    <div className={cx('cart-navstep-description')}>
                        <BsCheckCircle className={cx('btn-check')} />
                        <div className={cx('cart-nav-step-title')}>
                            <p>{step.title}</p>
                            <p>{step.title2}</p>
                        </div>
                    </div>
                </span>
            ))}
        </div>
    );
}

export default CartNavStep;
