import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useFormikProduct = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
            price: 0,
            price_discount: 0,
            price_prepay: 0,
            percent_discount: 0,
            brand: '',
            type: '',
            stored: 0,
            category: {
                category_slug: '',
                category_item_slug: '',
                category_item_child_slug: '',
            },
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Required is a string'),
            image: Yup.string().required('Required is a string'),
            price: Yup.number().required('Required is a number'),
            price_discount: Yup.number().required('Required is a number'),
            price_prepay: Yup.number().required('Required is a number'),
            percent_discount: Yup.number().required('Required is a number'),
            category: Yup.object({
                category_slug: Yup.string().required('Required is a string'),
            }),
            type: Yup.string().required('Required is a string'),
            brand: Yup.string().required('Required is a string'),
            stored: Yup.number().required('Required is a number'),
        }),
        isInitialValid: false,
    });
    return formik;
};

export const useFormikProductDetail = () => {
    const formik = useFormik({
        initialValues: {
            images: [],
            color: '',
            storage: '',
            description: '',
            introduce: '',
            infomation: '',
            subcategorySlug: '',
            amount: 1,
        },
        validationSchema: Yup.object({
            images: Yup.array().min(1, 'At least one image is required'),
            color: Yup.array().of(
                Yup.object().shape({
                    image: Yup.string().required('Required'),
                    name: Yup.string().required('Required is a string'),
                    price: Yup.number().required('Required is a number'),
                    stored: Yup.number().required('Required is a number'),
                }),
            ),
            subcategorySlug: Yup.string().required('Required is a string'),
            storage: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required('Required is a string'),
                    price: Yup.number().required('Required is a number'),
                    link: Yup.string().required('Required is a string'),
                }),
            ),
            description: Yup.string().required('Required is a string'),
            introduce: Yup.string().required('Required is a string'),
            infomation: Yup.string().required('Required is a string'),
        }),
        isInitialValid: false,
    });
    return formik;
};

export const useFormikProductBoth = () => {
    const formik = useFormik({
        initialValues: {
            image: '',
            name: '',
            price: '',
            price_discount: '',
            price_prepay: '',
            percent_discount: '',
            brand: '',
            type: '',
            stored: '',
            category: {
                category_slug: '',
                category_item_slug: '',
                category_item_child_slug: '',
            },
            images: '',
            color: [
                {
                    name: '',
                    image: '',
                    price: '',
                    stored: '',
                },
            ],
            subcategory_slug: '',
            storage: [
                {
                    link: '',
                    name: '',
                    price: '',
                },
            ],
            description: '',
            introduce: '',
            infomation: '',
            amount: 1,
        },
        validationSchema: Yup.object({
            image: Yup.string().required('Required is a string'),
            name: Yup.string().required('Required is a string'),
            price: Yup.number().required('Required is a number'),
            price_discount: Yup.number().required('Required is a number'),
            price_prepay: Yup.number().required('Required is a number'),
            percent_discount: Yup.number().required('Required is a number'),
            type: Yup.string().required('Required is a string'),
            stored: Yup.number().required('Required is a number'),
            brand: Yup.string().required('Required is a string'),
            category: Yup.object({
                category_slug: Yup.string().required('Required is a string'),
            }),
            // DETAILS
            images: Yup.array().required('Required'),
            color: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required('Required is a string'),
                    image: Yup.string().required('Required is a string'),
                    price: Yup.number().required('Required is a number'),
                    stored: Yup.number().required('Required is a number'),
                }),
            ),

            subcategory_slug: Yup.string().required('Required is a string'),
            storage: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required('Required is a string'),
                    price: Yup.number().required('Required is a number'),
                    link: Yup.string().required('Required is a string'),
                }),
            ),

            description: Yup.string().required('Required is a string'),
            introduce: Yup.string().required('Required is a string'),
            infomation: Yup.string().required('Required is a string'),
        }),
        isInitialValid: false,
    });
    return formik;
};
