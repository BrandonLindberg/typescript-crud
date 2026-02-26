const createInput = document.getElementById('create-text');
const createQuantity = document.getElementById('create-quantity');
const updateInput = document.getElementById('update-text');
const updateQuantity = document.getElementById('update-quantity');
const deleteInput = document.getElementById('delete-text');
const form = document.getElementById('input-form');
const output = document.getElementById('output');
const itemList = document.getElementById('list');
output.innerHTML = `<p class="place-holder-text">placeholder</p>`;
document.getElementById('delete-button')?.addEventListener('click', () => deleteItem());
document.getElementById('update-button')?.addEventListener('click', () => updateItem());
document.getElementById('create-button')?.addEventListener('click', () => createItem());
async function createItem() {
    const inputText = createInput?.value;
    const inputQuantity = parseInt(createQuantity?.value);
    if (inputText && inputQuantity >= 1) {
        try {
            const reponse = await fetch(`http://localhost:3000/items/insert/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: inputText, quantity: inputQuantity }),
            });
            output.innerHTML = `<p class="success-text">Item added successfully</p>`;
        }
        catch {
            console.log("There was an error attempting to fetch 'createItem'.");
        }
        await readAll();
        form.reset();
    }
    else {
        output.innerHTML = `<p class="error-text">Input is invalid</p>`;
    }
}
;
async function updateItem() {
    const updateText = updateInput?.value;
    const updateCount = parseInt(updateQuantity?.value);
    if (updateText && updateCount >= 0) {
        try {
            const query = await fetch('http://localhost:3000/items/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: updateText, quantity: updateCount }),
            });
            output.innerHTML = `<p class="success-text">Item updated successfully</p>`;
        }
        catch {
        }
        await readAll();
        form.reset();
    }
    else {
        output.innerHTML = `<p class="error-text">Input is invalid</p>`;
    }
}
;
async function deleteItem() {
    const deleteText = deleteInput?.value;
    if (deleteText) {
        try {
            const query = await fetch(`http://localhost:3000/items/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: deleteText }),
            });
            output.innerHTML = `<p class="success-text">Item deleted successfully</p>`;
        }
        catch {
            console.log("There was an error attempting to fetch 'deleteItem'.");
        }
        await readAll();
        form.reset();
    }
    else {
        output.innerHTML = `<p class="error-text">Input is invalid</p>`;
    }
}
;
async function readAll() {
    try {
        const query = await fetch(`http://localhost:3000/items/getall`);
        const response = await query.json();
        if (itemList) {
            itemList.innerHTML = "";
            const html = response.map((item) => `<li>${item.name} - ${item.quantity}</li>`).join("");
            itemList.innerHTML = html;
        }
    }
    catch {
    }
}
;
document.addEventListener('DOMContentLoaded', function () {
    readAll();
});
