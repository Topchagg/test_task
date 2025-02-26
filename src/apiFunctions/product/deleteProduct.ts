
const deleteProduct = (id:string) => {
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.ok) {
                alert("Deleted");
                window.location.reload()
            } else {
                alert("something went wrong");
            }
        })
};

export default deleteProduct