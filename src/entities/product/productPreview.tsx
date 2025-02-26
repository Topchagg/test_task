import { FC, useState } from "react";
import { productList } from "./types/productList.types";
import "./ui/productPreview.css";
import Button from "../../shared/button/button";
import { useDispatch } from "react-redux";
import {
    setModalWindowForm,
    setModalWindowTitle,
    setOnSubmitText,
} from "../../store/slices/windowSlices/windowSlices";
import { Link } from "react-router-dom";
import ModalWindow from "../../shared/modalWindow/modalWindow";
import deleteProduct from "../../apiFunctions/product/deleteProduct";

const ProductPreview: FC<productList> = ({ id, name, imageUrl,count }) => {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(setModalWindowForm(null));
        dispatch(setOnSubmitText("Delete!"));
        dispatch(setModalWindowTitle(`Do you want to delete product with ID ${id}?`));
        setIsDelete(true);
    };

    const onDeleteProduct = () => {
        if(id){
            deleteProduct(id)
            setIsDelete(false)   
        }     
    };

    const handleCancelDelete = () => {
        setIsDelete(false);
    };

    if (isDelete) {
        return (
            <ModalWindow
                onSubmit={onDeleteProduct}
                onDecline={handleCancelDelete}
            />
        );
    }

    return (
        <div className="product-preview-container">
            <Link to={`http://localhost:5173/products/${id}`}>
                <div className="product-preview-wrapper">
                    <div className="image-wrapper">
                        <img src={imageUrl} alt={name} />
                    </div>
                    <div className="title-48">
                        Name: {name} <br/>
                        Count: {count}
                    </div>
                </div>
            </Link>
            <div className="center" onClick={handleDelete}>
                <Button text="Delete" />
            </div>
        </div>
    );
};

export default ProductPreview;
