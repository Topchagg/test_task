import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../shared/button/button'
import ProductForm from '../../forms/product/productForm'
import ProductPreview from '../../entities/product/productPreview'
import ModalWindow from '../../shared/modalWindow/modalWindow'

import { product } from '../../entities/product/types/product.types'

import { RootState } from '../../store/store'
import { setModalWindowForm, setModalWindowStatus, setModalWindowTitle, setOnSubmitText } from '../../store/slices/windowSlices/windowSlices'
import { setIdOfProduct, setIsUpdate } from '../../store/slices/windowSlices/productFormSlice'

import './ui/main.css'

const MainSection = () => {
    const [products, setProducts] = useState<product[]>([]); 
    const [sortOption, setSortOption] = useState<string>('name'); 

    const isModalWindowOpen = useSelector((state: RootState) => state.test.isModalWindowOpen);
    const component = useSelector((state: RootState) => state.test.modalWindowForm);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            });
    }, []);

    const sortProducts = (products: product[]) => {
        return [...products].sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name || '');  
            } else if (sortOption === 'count') {
                return a.count - b.count;
            }
            return 0;
        });
    };

    const sortedProducts = products.length > 0 ? sortProducts(products) : [];

    const onCreateProduct = () => {
        dispatch(setModalWindowForm("productForm"));
        dispatch(setModalWindowTitle("Create product"));
        dispatch(setOnSubmitText(null));
        dispatch(setIsUpdate(false));
        dispatch(setIdOfProduct(null));
        dispatch(setModalWindowStatus());
    };

    return (
        <>
            {(isModalWindowOpen && component === "productForm") && <ModalWindow Component={ProductForm} />}

            <div className="title-48 text-center pt-30">
                Product list
            </div>

            <div className="sort-dropdown">
                <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                    <option value="name">Sort by Name</option>
                    <option value="count">Sort by Count</option>
                </select>
            </div>

            <div className="title-48">
                {sortedProducts.length === 0 ? (
                    <div>No products available</div>
                ) : (
                    sortedProducts.map(product => (
                        <ProductPreview key={product.id} name={product.name} imageUrl={product.imageUrl} id={product.id} count={product.count} />
                    ))
                )}
            </div>

            <div onClick={() => onCreateProduct()}>
                <Button text='Add new product' />
            </div>
        </>
    );
};

export default MainSection;
