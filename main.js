const main = document.getElementById('main')
const sms = document.getElementById('sms');

// search phone
const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    searchBox.value = '';
    if (searchText == '') {
       sms.innerHTML=`
       <h3>Please search your favourite phone by name</h3>`
       main.style.display = 'none'
    } 
    else {
        sms.innerHTML = '';
        main.style.display = 'block'
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(phone => displayPhone(phone.data)); 

    } 
   
}


// display search result
const displayPhone = phones => {
    const displayDiv = document.getElementById('display-phone');
    displayDiv.textContent = '';
    if (phones.length == 0) {
        sms.innerHTML=`
        <h3>This name is not Found.Please search phone by using a valid name</h3>`
    }
    else{
        const first20Phones = phones.slice(0,20);
        first20Phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="card py-4 bg-light">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body text-center">
             <h5 class="card-title">Name: ${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="fw-bold btn btn-secondary">Show Details</button>
            </div>
            </div>
            `;
            displayDiv.appendChild(div); 
        });   
    }
    const empty2 = displayPhoneDetails()
    empty2.textContent = '';
  
}


// search details
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(phone => displayPhoneDetails(phone.data));
}


// display details
const displayPhoneDetails = phone => {
    const detailsDiv = document.getElementById('display-details');
    detailsDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
    <div class="col-lg-5 col-sm-12 d-flex justify-content-center align-items-center"> <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="..."></div>
   

    <div class="card-body col-lg-7 col-sm-12">
    <h4 class="card-title">Name: ${phone.name}</h4>
    <h5 class="card-title">${phone.releaseDate ? phone.releaseDate : 'Released date not found'}</h5>
    <p class="card-text">
    <span class="fw-bolder"> Main Features:</span> <br />
    <span class="fw-bold">Storage: </span> ${phone.mainFeatures.storage} <br />
    <span class="fw-bold"> Display Size: </span>${phone.mainFeatures.displaySize} <br />
    <span class="fw-bold">Chip Set: </span> ${phone.mainFeatures.chipSet} <br />
    <span class="fw-bold">Memory: </span> ${phone.mainFeatures.memory} <br /> <br />

    <span class="fw-bold">sensors: </span> ${phone.mainFeatures.sensors} <br /><br />

    <span class="fw-bolder">Others:</span> <br />
    <span class="fw-bold">WLAN: </span> ${phone.others? phone.others.WLAN : 'not found' } <br />
    <span class="fw-bold">Bluetooth: </span> ${phone.others? phone.others.Bluetooth : 'not found'} <br />
    <span class="fw-bold">GPS: </span> ${phone.others? phone.others.GPS : 'not found'} <br />
    <span class="fw-bold">NFC: </span> ${phone.others? phone.others.NFC : 'not found'} <br />
    <span class="fw-bold">Radio: </span> ${phone.others? phone.others?.Radio : 'not found'} <br />
    <span class="fw-bold">USB: </span> ${phone.others? phone.others?.USB  : 'not found'} <br />

    </p>
   
</div>
  
    `;
    detailsDiv.appendChild(div);
}