document.addEventListener('DOMContentLoaded',()=>{

    const imgs = Array.from(document.querySelectorAll('img'))
    
    imgs.map(img=>{
        img.addEventListener('mousedown', (e)=>{
            e.preventDefault()
        })
    })
})