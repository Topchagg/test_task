import { useCreateForm, ReactiveForm, InputField, setGlobalObject, useActionOnSubmit, getFormValues, formIsValid, fieldSettings } from "reactive-fast-form"
import Button from "../../shared/button/button"
import isNumber from "../../functions/validFunctions/isNumber"
import isValidURL from "../../functions/validFunctions/isUrl"
import { useDispatch, useSelector } from "react-redux"
import { setModalWindowStatus } from "../../store/slices/windowSlices/windowSlices"
import { product } from "../../entities/product/types/product.types"
import { RootState } from "../../store/store"
import { createProduct } from "../../entities/product/types/createProduct.types"

const settings: fieldSettings = {
    validClass: "input-field valid-input-field",
    invalidClass: "input-field invalid-input-field",
    dynamicStyles: true
}

const ProductForm = () => {
    const dispatch = useDispatch()

    const isUpdate = useSelector((state:RootState) => state.productForm.isUpdate)
    const id = useSelector((state:RootState) => state.productForm.idOfElement)

    const [form, setForm, trigger] = useCreateForm(['name', 'imageUrl', 'count', 'width', 'height', 'weight'])

    const addProduct = async (productData: createProduct) => {
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

    const updateProduct = async (productData: product) => {
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

    useActionOnSubmit(() => {
        if (formIsValid(form)) {
            const values = getFormValues(form)

            if (isUpdate && id) {
                const correctObject:product = {
                    id: id,
                    name: values['name'],
                    imageUrl: values['imageUrl'],
                    count: values['count'],
                    size: {
                        width:values['width'],
                        height:values['height']
                    },
                    weight: values['weight'],
                    comments: []
                }
                updateProduct(correctObject) 
            } else {
                const correctObject:createProduct = {
                    name: values['name'],
                    imageUrl: values['imageUrl'],
                    count: values['count'],
                    size: {
                        width:values['width'],
                        height:values['height']
                    },
                    weight: values['weight'],
                    comments: []
                }
                addProduct(correctObject) 
            }
        }
    }, trigger)

    return (
        <>
            <ReactiveForm setFunc={setForm} setObject={form}>
                <InputField name="name" placeholder="Enter name" isTrigger {...settings} />
                <InputField name="imageUrl" placeholder="Enter image url" {...settings} allowNull validFunc={isValidURL} />
                <InputField name="count" placeholder="Enter quantity of this product" {...settings} validFunc={isNumber} />
                <InputField name="width" placeholder="Enter width of this product" {...settings} validFunc={isNumber} />
                <InputField name="height" placeholder="Enter height of this product" {...settings} validFunc={isNumber} />
                <InputField name="weight" placeholder="Enter weight of this product" {...settings} validFunc={isNumber} />
            </ReactiveForm>
            <div onClick={() => setGlobalObject(setForm)}>
                <Button text={isUpdate ? "Update product" : "Add product"} />
            </div>
        </>
    )
}

export default ProductForm
