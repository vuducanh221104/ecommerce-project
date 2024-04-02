import config from '~/config';
import ChatAdmin from '~/pages/ChatAdmin';
import ChangeAvatar from '~/pages/ChangeAvatar';
// Page Admin
import Dashboard from '~/pages/Admin/pagesAdmin/Dashboard';
import ProductList from '~/pages/Admin/pagesAdmin/Products/ProductList';
import AddProduct from '~/pages/Admin/pagesAdmin/Products/AddProduct';
import EditDetailProduct from '~/pages/Admin/pagesAdmin/Products/ProductList/EditDetailProduct';
// import AddProductDetail from '~/pages/Admin/pagesAdmin/Products/AddProduct/AddProductDetail';
import ImageHome from '~/pages/Admin/pagesAdmin/HomeDetail/ImageHome';
import ImageCustomer from '~/pages/Admin/pagesAdmin/HomeDetail/ImageCustomer';
import BoxProductHome from '~/pages/Admin/pagesAdmin/HomeDetail/BoxProductHome';
import ListCategoryBoxProduct from '~/pages/Admin/pagesAdmin/CategoryDetail/CategoryBoxProduct/ListCategoryBoxProduct';
import EditBoxProduct from '~/pages/Admin/pagesAdmin/CategoryDetail/EditBoxProduct';
import CategoryBoxProduct from '~/pages/Admin/pagesAdmin/CategoryDetail/CategoryBoxProduct';
import AddBoxProduct from '~/pages/Admin/pagesAdmin/CategoryDetail/AddBoxProduct';
import AddCategoryImage from '~/pages/Admin/pagesAdmin/CategoryDetail/CategoryImage/AddCategoryImage';
import EditCategoryImage from '~/pages/Admin/pagesAdmin/CategoryDetail/CategoryImage/EditCategoryImage';
import UserList from '~/pages/Admin/pagesAdmin/User/UserList';
import AddUser from '~/pages/Admin/pagesAdmin/User/UserList/AddUser';
import OrderList from '~/pages/Admin/pagesAdmin/Order/OrderList';
import Chat from '~/pages/Admin/pagesAdmin/Chat';

// Layouts
import { HeaderOnly } from '~/Layout';
import { LayoutCart } from '~/Layout';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import Slug from '~/pages/Slug';
import SlugContent from '~/pages/SlugContent';
import Home from '~/pages/Home';
import Cart from '~/pages/Cart/Cart';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import VerifyEmail from '~/pages/VerifyEmail';
import Logout from '~/pages/Logout';
import User from '~/pages/User';
import ChangePassword from '~/pages/ChangePassword';
import { ChangeEmail } from '~/pages/ChangeEmail';
import StoreLocation from '~/pages/StoreLocation';
import News from '~/pages/News';
import NewsDetails from '~/pages/News/NewsDetails';
import CartCustomer from '~/pages/Cart/CartCustomer';
import CartPayment from '~/pages/Cart/CartPayment';
import CartComplete from '~/pages/Cart/CartComplete';
import Search from '~/pages/Search';
import ForgotPassword from '~/pages/ForgotPassword';
// import ConfirmForgotPass from '~/pages/ForgotPassword/ConfirmForgotPass';

// Public Routes
const publicRoutes = [
    { path: config.routes.search, component: Search },
    { path: config.routes.chatAdmin, component: ChatAdmin },
    { path: config.routes.storeLocatiobn, component: StoreLocation },
    { path: config.routes.news, component: News },
    { path: config.routes.newsDetails, component: NewsDetails },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.logout, component: Logout, layout: HeaderOnly },
    { path: config.routes.product, component: Slug },
    { path: config.routes.contentProduct, component: SlugContent },
    { path: config.routes.verify, component: VerifyEmail, layout: HeaderOnly },
    { path: config.routes.home, component: Home },

    { path: config.routes.user, component: User, layout: HeaderOnly },
    { path: config.routes.cart, component: Cart, layout: LayoutCart },
    { path: config.routes.cartCustomer, component: CartCustomer, layout: LayoutCart },
    { path: config.routes.cartPayment, component: CartPayment, layout: LayoutCart },
    { path: config.routes.cartComplete, component: CartComplete, layout: LayoutCart },
    { path: config.routes.changePassword, component: ChangePassword, layout: HeaderOnly },
    { path: config.routes.changeEmail, component: ChangeEmail, layout: HeaderOnly },
    { path: config.routes.changeAvatar, component: ChangeAvatar, layout: HeaderOnly },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: HeaderOnly },
    // { path: config.routes.confirmForgotPass, component: ConfirmForgotPass, layout: HeaderOnly },
];

const privateRoutes = [
    { path: config.routes.search, component: Search },
    { path: config.routes.chatAdmin, component: ChatAdmin },
    { path: config.routes.storeLocatiobn, component: StoreLocation },
    { path: config.routes.news, component: News },
    { path: config.routes.newsDetails, component: NewsDetails },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.logout, component: Logout, layout: HeaderOnly },
    { path: config.routes.product, component: Slug },
    { path: config.routes.contentProduct, component: SlugContent },
    { path: config.routes.verify, component: VerifyEmail, layout: HeaderOnly },
    { path: config.routes.home, component: Home },
    { path: config.routes.user, component: User, layout: HeaderOnly },
    { path: config.routes.cart, component: Cart, layout: LayoutCart },
    { path: config.routes.cartCustomer, component: CartCustomer, layout: LayoutCart },
    { path: config.routes.cartPayment, component: CartPayment, layout: LayoutCart },
    { path: config.routes.cartComplete, component: CartComplete, layout: LayoutCart },
    { path: config.routes.changePassword, component: ChangePassword, layout: HeaderOnly },
    { path: config.routes.changeEmail, component: ChangeEmail, layout: HeaderOnly },
    { path: config.routes.changeAvatar, component: ChangeAvatar, layout: HeaderOnly },
    // LayoutAdmin
    { path: config.routesAdmin.admin, component: Dashboard, layout: LayoutAdmin },
    { path: config.routesAdmin.dashboard, component: Dashboard, layout: LayoutAdmin },
    { path: config.routesAdmin.productList, component: ProductList, layout: LayoutAdmin },
    { path: config.routesAdmin.addProduct, component: AddProduct, layout: LayoutAdmin },
    // { path: config.routesAdmin.addProductDetail, component: AddProductDetail, layout: LayoutAdmin },
    { path: config.routesAdmin.editDetailProduct, component: EditDetailProduct, layout: LayoutAdmin },
    { path: config.routesAdmin.listCategoryBoxProduct, component: ListCategoryBoxProduct, layout: LayoutAdmin },
    // Page  Home
    { path: config.routesAdmin.imageHome, component: ImageHome, layout: LayoutAdmin },
    { path: config.routesAdmin.imageCustomer, component: ImageCustomer, layout: LayoutAdmin },
    { path: config.routesAdmin.boxProductHome, component: BoxProductHome, layout: LayoutAdmin },
    // Category Box Product
    { path: config.routesAdmin.addBoxProduct, component: AddBoxProduct, layout: LayoutAdmin },
    { path: config.routesAdmin.editBoxProduct, component: EditBoxProduct, layout: LayoutAdmin },
    { path: config.routesAdmin.categoryboxProduct, component: CategoryBoxProduct, layout: LayoutAdmin },
    { path: config.routesAdmin.addCategoryImage, component: AddCategoryImage, layout: LayoutAdmin },
    { path: config.routesAdmin.editCategoryImage, component: EditCategoryImage, layout: LayoutAdmin },
    // User
    { path: config.routesAdmin.userList, component: UserList, layout: LayoutAdmin },
    { path: config.routesAdmin.addUser, component: AddUser, layout: LayoutAdmin },
    // Order
    { path: config.routesAdmin.orderList, component: OrderList, layout: LayoutAdmin },
    // Chat realtime
    { path: config.routesAdmin.chat, component: Chat, layout: LayoutAdmin },
];

export { publicRoutes, privateRoutes };
