

const baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr =document.querySelector(".from select");
const tocurr =document.querySelector(".to select");
const msg = document.querySelector(".msg");
// for(code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of dropdown){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name==="from" && currcode==="USD"){
            newoption.selected = "selected";
        }else  if(select.name==="to" && currcode==="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })

}


const updateflag = (element)=>{
    let currcode = element.value;
    // based on seleting currencycode wwe fetch flace okay
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;  
    let img =  element.parentElement.querySelector("img");
    img.src=newsrc;
};


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateexchangerate();
    
});

const updateexchangerate =async()=>{
    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    // console.log(amval);
    if(amval===""||amval<1){
        amval=1;
        amount.value = "1";
    }

    // console.log(fromcurr.value,tocurr.value);
    // to calculate the exchange rate
    const URL =`${baseurl}/${fromcurr.value.toLowerCase()}.json`;  //we need to request on this url using fetch api
    let response  = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    
    // multipy with exchange rate abouve value with amount
    let finalamount = amount.value*rate;
    msg.innerText =`${amval} ${fromcurr.value}=${finalamount} ${tocurr.value}`;
}


// when document load in starting
window.addEventListener("load",()=>{
    updateexchangerate();
});
