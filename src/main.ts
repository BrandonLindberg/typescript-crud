const createInput = document.getElementById('create-text') as HTMLInputElement;
const createQuantity = document.getElementById('create-quantity') as HTMLInputElement;

const updateInput = document.getElementById('update-text') as HTMLInputElement;
const updateQuantity = document.getElementById('update-quantity') as HTMLInputElement;

const deleteInput = document.getElementById('delete-text') as HTMLInputElement;

const form = document.getElementById('input-form') as HTMLFormElement;
const output = document.getElementById('output')!;
const itemList = document.getElementById('list');

output.innerHTML = `<p class="place-holder-text">placeholder</p>`;

document.getElementById('delete-button')?.addEventListener('click', () => deleteItem());
document.getElementById('update-button')?.addEventListener('click', () => updateItem());
document.getElementById('create-button')?.addEventListener('click', () => createItem());

async function createItem() {

    const inputText: string = createInput?.value;
    const inputQuantity: number = parseInt(createQuantity?.value);

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
};

async function updateItem() {

    const updateText: string = updateInput?.value;
    const updateCount: number = parseInt(updateQuantity?.value);

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
};

async function deleteItem() {

    const deleteText: string = deleteInput?.value;

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
};

async function readAll() {

    try {
        const query = await fetch(`http://localhost:3000/items/getall`);
        const response = await query.json();

        if (itemList) {
            itemList.innerHTML = "";

            const html = response.map((item: { name: string; quantity: number }) => `<li>${item.name} - ${item.quantity}</li>`).join("");

            itemList.innerHTML = html;
        }
    }
    catch {

    }
};

document.addEventListener('DOMContentLoaded', function() {
    readAll();
});