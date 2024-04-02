
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/Layout';
import { Fragment } from 'react';
import ScrollToTop from './components/ScrollToTop';
import axios from 'axios';
import { useSelector } from 'react-redux';

function App() {
    axios.defaults.withCredentials = true;
    const dataUser = useSelector((state) => state.auth.login.currentUser);

    // Lọc danh sách routes dựa trên role của user
    const filteredRoutes = dataUser?.role > 1 ? privateRoutes : publicRoutes;

    return (
        <Router>
            <div className="App">
                <ScrollToTop />
                <Routes>
                    {filteredRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
