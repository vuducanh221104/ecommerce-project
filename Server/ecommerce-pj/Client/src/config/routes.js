const routes = {
    user: {
        home: '/',
        search: '/search',
        user: '/user',
        login: '/login',
        register: '/register',
        logout: '/logout',
        chatAdmin: '/chatAdmin',
        cart: '/cart',
        cartCustomer: '/cart/customer',
        cartPayment: '/cart/payment',
        cartComplete: '/cart/complete',
        storeLocatiobn: '/he-thong-cua-hang',
        news: '/news',
        newsDetails: '/news/:slug',
        product: '/:slug',
        contentProduct: '/product/:slug',
        profile: '/profile',
        verify: '/verify',
        changePassword: '/changePassword',
        changeEmail: '/changeEmail',
        changeAvatar: '/changeAvatar',
        forgotPassword: '/forgotPassword',
        confirmForgotPass: '/forgotPassword/comfirm/?',
    },

    admin: {
        admin: '/admin',
        dashboard: '/admin/dashboard',
        productList: '/admin/productList',
        addProduct: '/admin/addProduct',
        addProductDetail: '/admin/addProductDetail',
        editDetailProduct: '/admin/editDetailProduct/:slug',
        // Home
        imageHome: '/admin/edit/imageHome',
        imageCustomer: '/admin/edit/imageCustomer',
        boxProductHome: '/admin/edit/boxProductHome',
        // ~Category Box
        categoryboxProduct: '/admin/edit/categoryboxProduct/:slug',
        addBoxProduct: '/admin/edit/addBoxProduct',
        editBoxProduct: '/admin/edit/editBoxProduct/:slug',
        //Category Thumb Image
        addCategoryImage: '/admin/edit/addCategoryImage',
        editCategoryImage: '/admin/edit/editCategoryImage/:slug',
        // Order
        orderList: '/admin/orderList',
        // User
        addUser: '/admin/addUser',
        userList: '/admin/userList',
        // Payment
        // Payment: '/admin/Payment',
        // Chat realtime
        chat: '/admin/chat',
    },
};

export default routes;
