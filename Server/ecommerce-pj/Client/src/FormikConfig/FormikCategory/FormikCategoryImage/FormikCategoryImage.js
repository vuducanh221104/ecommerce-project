import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useFormikCategoryImage = () => {
    const formik = useFormik({
        initialValues: {
            images_theme: [
                {
                    image: '',
                    link: '',
                },
                {
                    image: '',
                    link: '',
                },
            ],
            slug: '',
        },
        validationSchema: Yup.object({
            images_theme: Yup.array().of(
                Yup.object().shape({
                    image: Yup.string().required('Required'),
                    link: Yup.string().required('Required'),
                }),
            ),
        }),
        isInitialValid: false,
    });
    return formik;
};
