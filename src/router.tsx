import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { Product, action as ProductAction } from "./pages/Product";
import { NewProduct } from "./pages/NewProduct";
import { action as newProductAction } from "./pages/NewProduct";
import { loader as ProductsLoader } from "./pages/Product";
import { EditProduct } from "./pages/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetail";
import { loader as EditProductsLoader, action as EditProductAction} from "./pages/EditProduct";
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                element: <Product />,
                index: true,
                loader: ProductsLoader,
                action: ProductAction
            },
            {
                path: 'new/product',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct />,
                loader: EditProductsLoader,
                action: EditProductAction
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction
            }
        ]
    }
])