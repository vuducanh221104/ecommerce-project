import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorWarning from '~/components/ErrorWarning';
import { logOutSuccess } from '~/redux/authSlice';
import { useDispatch } from 'react-redux';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // DELETE COOKIE

    useEffect(() => {
        const handleLogOut = () => {
            dispatch(logOutSuccess());
        };
        handleLogOut();
        // onClick={() => handleLogOut()
    }, []);

    return (
        <div className={('logout', 'd-flex  justify-content-center')}>
            <ErrorWarning message="BLOCKING" />
        </div>
    );
}

export default Logout;
