document.addEventListener('DOMContentLoaded',()=>{
    dmImg()
})
export function dmImg(){

    const imgs = Array.from(document.querySelectorAll('img'))
    
    imgs.map(img=>{
        img.addEventListener('mousedown', (e)=>{
            e.preventDefault()
        })
    })
}