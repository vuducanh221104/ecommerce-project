import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useFormikHome = () => {
    const formik = useFormik({
        initialValues: {
            image_home: [
                {
                    image: '',
                    link: '',
                },
            ],
            image_customer: [''],
            container: [
                {
                    thumbnail: {
                        image: '',
                        link: '',
                    },
                    backgroundColor: '',
                    link: '',
                    linkButton: '',
                    productBoxTheme: [
                        {
                            imageBox: '',
                            titleBox: '',
                            slugBox: '',
                        },
                    ],
                },
            ],
        },
        validationSchema: Yup.object({
            image_home: Yup.array().of(
                Yup.object({
                    image: Yup.string().required('Required is a name'),
                    link: Yup.string().required('Required is a link'),
                }),
            ),
            image_customer: Yup.array().of(Yup.string().required('Customer image URL is required')),
            container: Yup.array().of(
                Yup.object({
                    thumbnail: Yup.object({
                        image: Yup.string().required('Required is a thumbnail image'),
                        link: Yup.string().required('Required is a thumbnail link'),
                    }),
                    backgroundColor: Yup.string().required('Required is a backgroundColor'),
                    link: Yup.string().required('Required is a link'),
                    linkButton: Yup.string().required('Required is a linkButton'),
                    productBoxTheme: Yup.array().of(
                        Yup.object({
                            imageBox: Yup.string().required('Required is a productBoxTheme imageBox'),
                            titleBox: Yup.string().required('Required is a productBoxTheme titleBox'),
                            slugBox: Yup.string().required('Required is a productBoxTheme slugBox'),
                        }),
                    ),
                }),
            ),
        }),
        isInitialValid: false,
    });
    return formik;
};
