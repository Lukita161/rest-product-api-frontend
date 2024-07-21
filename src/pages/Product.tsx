import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getAllProducts, updateAvailability } from "../services/ProductServices"
import { ProductsType } from "../schemas"
import { ProductDetail } from "../components/ProductDetail"

export const loader = async()=> {
    const products = await getAllProducts()
    return products
}
export const action = async({ request }: ActionFunctionArgs)=> {
    const data = Object.fromEntries(await request.formData())
    await updateAvailability(+data.id)
    return {}
}

export const Product = ()=> {
    const products = useLoaderData() as ProductsType
    return (
        <section>
            <div className="flex justify-between rounded-lg m-auto">
                <h1 className="text-4xl font-black text-gray-900">Productos</h1>
                <Link className="text-sm bg-purple-400 rounded-md p-4 text-white font-bold uppercase hover:cursor-pointer hover:bg-purple-500" to={'new/product'} > Agregar producto </Link>
            </div>
            <div className="p-2">
  <table className="w-full mt-5 table-auto">
    <thead className="bg-slate-800 text-white">
        <tr>
            <th className="p-2">Producto</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Disponibilidad</th>
            <th className="p-2">Acciones</th>
        </tr>
    </thead>
    <tbody>
        {products.map(product => (
            <ProductDetail key={product.id} product={product}/>
        )) }
    </tbody>
  </table>
</div>
        </section>
    )
}