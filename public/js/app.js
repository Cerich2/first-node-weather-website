const weatherForm = document.getElementById('location-form')
const input = document.getElementById('input-location')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    //prevent to reload the browser
    e.preventDefault()
    const locationSearch = input.value


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(locationSearch)).then((response)=>{
    response.json().then((data) =>{
        if (data.error){
            
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }      
    })
})
    
})