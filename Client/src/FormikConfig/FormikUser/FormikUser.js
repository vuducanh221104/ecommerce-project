import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useFormikUser = () => {
    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            avatar: '',
            email: '',
            phone: '',
            password: '',
            isVerified: true,
            role: 0,
            // Have and Haven't cũng ok
            verificationToken: '',
            newEmail: '',
            newEmailVerificationToken: '',
        },
        validationSchema: Yup.object({
            // avatar: Yup.string().required('Required'),
            fullname: Yup.string().required('Required'),
            username: Yup.string().required('Required'),
            email: Yup.string().required('Required'),
            phone: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            isVerified: Yup.boolean().required('Required'),
            role: Yup.number().required('Required'),
        }),
        isInitialValid: false,
    });
    return formik;
};
