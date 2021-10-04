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

    fetch('/weather?address=' + encodeURIComponent(locationSearch)).then((response)=>{
    response.json().then((data) =>{
        if (data.error){
            
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }      
    })
})
    
})