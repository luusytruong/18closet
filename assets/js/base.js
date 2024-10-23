document.addEventListener('DOMContentLoaded',()=>{
    dmImg()
})
function dmImg(){

    const imgs = Array.from(document.querySelectorAll('img'))
    
    imgs.map(img=>{
        img.addEventListener('mousedown', (e)=>{
            e.preventDefault()
        })
    })
}