var mode = document.getElementById('mode');
var modeVal = document.querySelector('#mode p');
var modeIcon = document.querySelector('#mode i');
var SectionMode = document.querySelector('.dark-mode');
var innerbody = document.querySelector('#innerbody');
var select = document.getElementById('region');
var search_bar = document.querySelector('.search-bar');
var fullbody = document.querySelector('.body');
var body = document.querySelector('body');
var back = document.querySelector('.back');
var content_img = document.querySelector('.content-img img');
var nativName = document.querySelector('.nativeName');
var content_pop = document.querySelector('.content-pop');
var content_region = document.querySelector('.content-region');
var sub = document.querySelector('.sub-region');
var content_cap = document.querySelector('.content-cap');
var top = document.querySelector('.top');
var content_cur = document.querySelector('.content-cur');
var langs = document.querySelector('.langs');
var border_countries = document.querySelector('.border-countries');
var country_name=document.querySelector(".country-name");



// function of theme 
mode.addEventListener('click', function () {
    var value = modeVal.innerHTML;

    if (value == 'Dark mode') {
        modeVal.innerHTML = "Light mode";
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        SectionMode.classList.remove('dark-mode');
        SectionMode.classList.add('light-mode');
        body.style.background = 'hsl(0, 0%, 95%)'
    }
    else if (value == 'Light mode') {
        modeVal.innerHTML = "Dark mode";
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
        SectionMode.classList.remove('light-mode');
        SectionMode.classList.add('dark-mode');
        body.style.background = 'hsl(207, 26%, 17%)';
    }

})

//  function of display needed data
async function display(url) {
    var divs = ``;
    var data = await fetch(url);
    var countryBody = await data.json();

    for (var i = 0; i < countryBody.length; i++) {
        divs += `<div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 p-3">
        <div class="w-100 h-100 country-info  ">
            <div class="country-img">
                <img src="${countryBody[i].flags.svg}" class="w-100" alt="">
            </div>
            <div>
                <p class="country-name fw-bold  p-2 ">${countryBody[i].name.official}</p>
                <p class="p-2">Population: <span class="population-num">${countryBody[i].population}</span></p>
                <p class=" p-2 ">Region: <span>${countryBody[i].region}</span></p>
                <p class=" p-2 ">Capital: <span>${countryBody[i].capital}</span></p>

            </div>
        </div>
    </div>`
    }
    if (innerbody != null) {
        innerbody.innerHTML = divs;
    }
}


//  function to display all available data in json file
async function displayAll() {
    display('https://restcountries.com/v3.1/all');
}
if (select != null) {
    select.addEventListener('change', function () {
        var selection = select.value;
        display(`https://restcountries.com/v3.1/region/${selection}`);
    })
}

// function of search on a country
if (search_bar != null) {
    search_bar.addEventListener('keyup', function () {
        var searchWord = search_bar.value;
        if (searchWord != '') {
            display(`https://restcountries.com/v3.1/name/${searchWord}`);
        } else {
            displayAll();
        }


    })
}

displayAll();

//  function to return to main page
if (back != null) {
    back.addEventListener('click', function () {
        window.open('index.html', '_self');
    })
}


// function to fill data in content page
async function completeData(capitalname) {
    var data = await fetch(`https://restcountries.com/v3.1/capital/${capitalname}`);
    var databody = await data.json();
    content_img.setAttribute('src', `${databody[0].flags.svg}`);

    country_name.innerHTML=databody[0].name.official;
    native = databody[0].name.nativeName;

    const val = native[Object.keys(native)[0]];
    nativName.innerHTML = val.official;

    content_pop.innerHTML = databody[0].population;
    content_region.innerHTML = databody[0].region;
    sub.innerHTML = databody[0].subregion;
    content_cap.innerHTML = databody[0].capital;
    var topc = databody[0].tld[0]
    document.querySelector('.top').innerHTML = topc;

    currency = databody[0].currencies;
    const val2 = currency[Object.keys(currency)[0]];
    content_cur.innerHTML = val2.name;

    languages = databody[0].languages;
    var val3 = '';
    for (const key of Object.keys(languages)) {
        val3 += languages[key] + " ,";
    }
    langs.innerHTML = val3

    border_countries.innerHTML = '';
    borders = databody[0].borders;
    for (const key of Object.keys(borders)) {

        border_countries.innerHTML += `
        <div class="mx-2 p-1">
                                ${borders[key]}
                            </div>
        `;
    }


}

if (content_img != null) {
    completeData(localStorage.getItem('c'));
}

if (innerbody != null) {
    innerbody.addEventListener('click', function (e) {
        var taregetObj = e.target;
        if (taregetObj.parentNode.parentNode != fullbody) {
            console.log(taregetObj.parentNode.parentNode.children[1].children[3].children[0].innerHTML);
            var val = taregetObj.parentNode.parentNode.children[1].children[3].children[0].innerHTML;
            localStorage.setItem('c', val);
            window.open('content.html', "_self");
            if (content_img != null) {
                completeData(localStorage.getItem('c'));
            }

        }


    })
}



