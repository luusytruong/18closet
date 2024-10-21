export async function apiFetch(path){
    const response = await fetch(path,{
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const jsonData = await response.json()
    return jsonData
};

const path = [
    'http://localhost/fashion-store/controller/readData.php?table=users',
    'http://localhost/fashion-store/controller/readData.php?table=products',
    'http://localhost/fashion-store/controller/readData.php?table=categorys',
    'http://localhost/fashion-store/controller/readData.php?table=orders',
]


const showArea = document.querySelector('#get textarea')
const formGet = document.getElementById('get')
const btnGet = formGet.querySelector('button')

btnGet.addEventListener('click', (e)=>{
    e.preventDefault()

    apiFetch(path[1]).then(data=>{
        console.log(data);
        data.forEach(data => {
            console.log(data.product_name);
            showArea.textContent += data.id
            showArea.textContent += data.product_name
            showArea.textContent += data.category_id
            showArea.textContent += data.description
            showArea.textContent += data.stock_quantity
            showArea.textContent += data.price
                
        });
    }).catch(error=>{
        console.error('error', error);
    })
})