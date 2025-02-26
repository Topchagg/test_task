import { FC, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { product } from "./types/product.types"
import ProductForm from "../../forms/product/productForm"
import Button from "../../shared/button/button"
import { useDispatch } from "react-redux"
import { setIdOfProduct,setIsUpdate } from "../../store/slices/windowSlices/productFormSlice"

const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>()

    const [productData, setProductData] = useState<product | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isShowUpdateForm,setIsShowUpdateForm] = useState<boolean>(false)

    const dispatch = useDispatch()

    const HandleUpdate = () => {
        dispatch(setIdOfProduct(parseInt(id)))
        dispatch(setIsUpdate(true))
        setIsShowUpdateForm(true)
    }

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/products/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("not found")
                    }
                    return response.json()
                })
                .then((data) => {
                    setProductData(data)  
                    setLoading(false)  
                })
                .catch((err) => {
                    setError(err.message)  
                    setLoading(false)
                })
        }
    }, [id])  

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (productData && !isShowUpdateForm) {
        const { name, imageUrl, count, size, weight } = productData
        return (
            <div>
                <div className="title-48">Name: {name} <br/> Id: {id}</div>
                <img src={imageUrl} alt={name} />
                <div>
                    <div>count: {count}</div>
                    <div>width: {size.width}</div>
                    <div>height: {size.height}</div>
                    <div>weight: {weight}</div>
                </div>
                <div onClick={() => HandleUpdate()}><Button text="Edit"/></div>
            </div>
        )
    }

    if (productData && isShowUpdateForm){
        return(
            <div>
                <ProductForm/>
                <div onClick={() => setIsShowUpdateForm(false)}><Button text="Decline"/></div>
            </div>
        )
    }

    return null
}

export default ProductPage
