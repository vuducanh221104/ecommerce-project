import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0);
        };
        // Thực hiện scrollToTop trong requestAnimationFrame
        const scrollHandle = requestAnimationFrame(scrollToTop);

        // Cancel requestAnimationFrame khi component unmounts
        return () => {
            cancelAnimationFrame(scrollHandle);
        };
    }, [pathname]);

    return null;
};

export default ScrollToTop;
