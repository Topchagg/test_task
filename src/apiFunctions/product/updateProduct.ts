import { product } from "../../entities/product/types/product.types"
import { setModalWindowStatus } from "../../store/slices/windowSlices/windowSlices"

const updateProduct = async (productData: product,dispatch) => {
    try {
        const response = await fetch(`http://localhost:3000/products/${productData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })

        const data = await response.json()
        console.log(data)

        dispatch(setModalWindowStatus())
        window.location.reload()
    } catch (error) {
        console.error(error)
    }
}

export default updateProduct