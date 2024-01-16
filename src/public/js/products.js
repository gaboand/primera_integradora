const socket = io();

const addProductBtn = document.getElementById("addProductBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");

addProductBtn.addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;

    const fsproduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
    };

    try {
        const response = await fetch("/api/fsproducts", {
            method: "POST",
            body: JSON.stringify(fsproduct),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.success) {
            reloadList(data.products);
            alert("Producto agregado con éxito");
        } else {
            throw new Error(data.message || 'Error al agregar producto');
        }
    } catch (error) {
        alert(error.message);
    }

    document.getElementById("addForm").reset();
});


deleteProductBtn.addEventListener("click", async () => {
	const id = document.getElementById("productId");

	await fetch(`/api/products/${id.value}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				reloadList(data.products);
				alert(`Producto ${id.value} eliminado con éxito`);
			}
		})
		.catch((data) => {
			alert(data.message);
		});

	document.getElementById("deleteForm").reset();
});

function reloadList(products) {
	const productList = document.getElementById("productList");

	productList.innerHTML = "";

	products.forEach((product) => {
		const card = document.createElement("div");
		card.classList.add("productCard");
		card.innerHTML = `
            <div class="cardProduct__image">
                <img src=${product.thumbnail} alt=${product.title} />
            </div>
            <div class="cardProduct__info">

                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>${product.price}</p>
                <p>${product.stock}</p>
                <p>${product.code}</p>
                <p>${product.id}</p>
            </div>`;
		productList.appendChild(card);
	});
}