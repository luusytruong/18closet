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
    'http://localhost/fashion-store/controller/getData.php?table=users',
    'http://localhost/fashion-store/controller/getData.php?table=products',
    'http://localhost/fashion-store/controller/getData.php?table=categorys',
    'http://localhost/fashion-store/controller/getData.php?table=orders',
]

apiFetch(path[1]).then(data=>{
    console.log(data);
}).catch(error=>{
    console.error('error', error);
})

