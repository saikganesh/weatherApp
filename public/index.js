
console.log('Client side javascript has been loaded')

const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit',(event)=> {
    event.preventDefault()
    console.log('Submit event triggered')
}) 