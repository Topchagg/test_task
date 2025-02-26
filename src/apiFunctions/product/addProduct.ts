import { createProduct } from "../../entities/product/types/createProduct.types"
import { setModalWindowStatus } from "../../store/slices/windowSlices/windowSlices"

const addProduct = async (productData: createProduct,dispatch) => {
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