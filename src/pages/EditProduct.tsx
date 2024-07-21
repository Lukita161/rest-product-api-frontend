import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom"
import { getProductById, updateProduct } from "../services/ProductServices"
import { Product } from "../schemas"
import { ProductForm } from "../components/ProductForm"
const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]
export const loader = async({ params }: LoaderFunctionArgs)=> {
    if(params.id !== undefined) {
        const product = await getProductById(+params.id)
        if(!product) {
            throw new Response('', {status:404, statusText: 'Producto no encontrado'})
        }
        return product
    }
}

export const action = async({ request, params }: ActionFunctionArgs)=> {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }
    if(params.id) {
        await updateProduct(data, +params.id)
        return redirect('/')
    }
}

export const EditProduct = ()=> {
    const product = useLoaderData() as Product
    return (
        <>
            <div>
                <Link className="text-sm font-bold uppercase bg-purple-400 rounded-md p-4 text-white hover:cursor-pointer hover:bg-purple-500" to={'/'}>Volver</Link>
            </div>
            <Form
      method="POST"
    className="mt-10"      
>
    
    <ProductForm product={product}/>
    


    <div className="mb-4">
        <label
            className="text-gray-800"
            htmlFor="availability"
        >Disponibilidad:</label>
        <select 
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
        >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
        </select>
    </div>
    <input
      type="submit"
      className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
      value="Editar Producto"
    />
</Form>
        </>
    )
}