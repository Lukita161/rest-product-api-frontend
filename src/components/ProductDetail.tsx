import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../schemas"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductServices"

type ProductDetailProps = {
    product: Product
}

export const action = async({params}: ActionFunctionArgs)=> {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export const ProductDetail = ({ product }:ProductDetailProps)=> {
    const isAvailibly = product.availability ? 'Disponible' : "No disponible"
    const navigate = useNavigate()

    const fetcher = useFetcher()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        if(!confirm('Estas seguro de querer eliminarlo')) {
            e.preventDefault()
        }
    }
    return (
        <tr className="border-b ">
    <td className="p-3 text-lg text-gray-800">
        {product.name}
    </td>
    <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
    </td>
    <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="PATCH">
            <button name="id" value={product.id}>{isAvailibly}</button>
        </fetcher.Form>
    </td>
    <td className="p-3 text-lg text-gray-800 ">
        <div className="flex justify-between">
            <button onClick={()=> {
                navigate(`products/${product.id}/edit`)
            }}>Editar</button>
            <Form method="DELETE" onSubmit={handleSubmit} action={`products/${product.id}/delete`}>
                <input type="submit" value='Eliminar'/>
            </Form>
        </div>
    </td>
</tr> 
    )
}