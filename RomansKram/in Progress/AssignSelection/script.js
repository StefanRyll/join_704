let as = document.getElementById('assignSelection')

function test(){
    as.innerHTML = `
        <button id="btn">Klick</button>
    `
    let btn = document.getElementById('btn')
    btn.addEventListener('click', function(){
        console.log('Hallo Welt')
    })
}
test()