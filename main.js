// search phone
const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    searchBox.value = '';
    if (searchText == '') {
       const sms = document.getElementById('sms');
       sms.innerHTML=`
       <h3>Please search your favourite phone by name</h3>`
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
    if (phones.length == 0) {
        const sms = document.getElementById('sms');
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
             <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="fw-bold btn btn-secondary">Show Details</button>
            </div>
            `;
            displayDiv.appendChild(div);
        });
    }
  
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
    console.log(phone);
    const detailsDiv = document.getElementById('display-details');
    detailsDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('bg-light');
    div.classList.add('py-3');
    div.classList.add('my-5');
    const realeaseDate = phone.realeaseDate;
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body text-center">
    if(realeaseDate == ''){
        <h5 class="card-title">none</h5>  
    }else{
        <h5 class="card-title">${phone.releaseDate}</h5>
    }
      
        <p class="card-text"></p>
       
    </div>
    `;
    detailsDiv.appendChild(div);
}