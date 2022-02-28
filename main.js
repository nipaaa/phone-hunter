// search phone
const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(phone => displayPhone(phone.data));

    searchBox.value = '';
}


// display search result
const displayPhone = phones => {
    const displayDiv = document.getElementById('display-phone');
    displayDiv.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add = 'col'
        div.innerHTML = `<div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
         <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">${phone.brand}</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="mx-auto btn btn-secondary">Show Details</button>
        </div>
        `
        displayDiv.appendChild(div);
    });
}


// search details
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
}