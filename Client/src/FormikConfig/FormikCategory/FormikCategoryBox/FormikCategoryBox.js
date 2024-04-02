import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useFormikCategoryBox = () => {
    const formik = useFormik({
        initialValues: {
            box_product: [
                {
                    box_product_name: '',
                    box_product_image: '',
                    box_product_slug: '',
                },
            ],
            category_name: '',
            category_image: '',
            category_slug: '',
            category_parent_slug: '',
        },
        validationSchema: Yup.object({
            box_product: Yup.array().of(
                Yup.object({
                    box_product_name: Yup.string().required('Required is a name'),
                    box_product_image: Yup.string().required('Required is an image'),
                    box_product_slug: Yup.string().required('Required is a slug'),
                }),
            ),
            category_name: Yup.string().required('Required is a name'),
            category_image: Yup.string().required('Required is a image'),
            category_slug: Yup.string().required('Required is a slug'),
            category_parent_slug: Yup.string().required('Required is a parent slug'),
        }),
        isInitialValid: false,
    });
    return formik;
};
