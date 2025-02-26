const getProduct = async (id: string | undefined, setProductData: Function, setLoading: Function, setError: Function) => {
    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/products/${id}`)
            if (!response.ok) {
                throw new Error("Product not found")
            }
            const data = await response.json()
            setProductData(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
}

export default getProduct
