import { createProduct } from "../../entities/product/types/createProduct.types"
import { setModalWindowStatus } from "../../store/slices/windowSlices/windowSlices"
import { AppDispatch } from "../../store/store"

const addProduct = async (productData: createProduct,dispatch: AppDispatch) => {
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })

        const data = await response.json()
        dispatch(setModalWindowStatus())
        window.location.reload()
    } catch (error) {
        console.error(error)
    }
}

export default addProduct