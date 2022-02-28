// search phone
const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    searchBox.value = '';
    if (searchText == '') {
       alert('np')
    } 
    else {
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
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card py-4 bg-light">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body text-center">
         <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">${phone.brand}</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="fw-bold btn btn-secondary">Show Details</button>
        </div>
        `;
        displayDiv.appendChild(div);
    });
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
    div.classList.add('card');
    div.classList.add('bg-light');
    div.classList.add('py-3');
    div.classList.add('my-5');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title">${phone.releaseDate}</h5>
        <p class="card-text"></p>
       
    </div>
    `;
    detailsDiv.appendChild(div);
}