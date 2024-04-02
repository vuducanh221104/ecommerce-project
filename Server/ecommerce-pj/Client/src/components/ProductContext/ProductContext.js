// LoginContext.js
import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [show, setShow] = useState(false);

    return <ProductContext.Provider value={{ show, setShow }}>{children}</ProductContext.Provider>;
}

export function useProductContext() {
    return useContext(ProductContext);
}
