import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom";
import { ErrorMessage } from "../components/Error";
import { addProduct } from "../services/ProductServices";
import { ProductForm } from "../components/ProductForm";

export async function action ({ request }:ActionFunctionArgs ){
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }
    await addProduct(data)
    return redirect('/')
}

export const NewProduct = () => {
    const error = useActionData() as string
  return (
    <>
    <div>
    <Link
        className="text-sm font-bold uppercase bg-purple-400 rounded-md p-4 text-white hover:cursor-pointer hover:bg-purple-500"
        to={"/"}
      >
        {" "}
        Atras{" "}
      </Link>
    </div>
    {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form
      method="POST"
    className="mt-10"      
>
    <ProductForm />
    <input
      type="submit"
      className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
      value="Registrar Producto"
    />
</Form>
    </>
  );
};
