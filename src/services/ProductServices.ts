import { parse, safeParse, pipe, number, transform, string } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../schemas";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async( data : ProductData) => {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success) {
            const url = import.meta.env.VITE_API_URL + '/api/products'
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = async()=> {
    try {
        const url = import.meta.env.VITE_API_URL + '/api/products'
        const { data } = await axios.get(url)
        const response = safeParse(ProductsSchema, data.data)
        if(response.success) {
            return response.output
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async(id: Product['id'])=> {
    try {
        const url = import.meta.env.VITE_API_URL + `/api/products/${id}`
        const { data } = await axios.get(url)
        const response = safeParse(ProductSchema, data.data)
        if(response.success) {
            return response.output
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async(data: ProductData, id: Product['id'])=> {
    const NumberSchema = pipe(string(), transform(Number), number())
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        if(result.success) {
            const url = import.meta.env.VITE_API_URL + `/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async(id: Product['id']) => {
    try {
        const url = import.meta.env.VITE_API_URL + `/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async(id: Product['id'])=> {
    try {   
        const url = import.meta.env.VITE_API_URL + `/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }}