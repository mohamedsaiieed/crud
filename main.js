let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mod ="create";
let tmp;


//get total
function getTotal() {
    if(price.value != '') {
        let result =(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green"
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02"
    }
}
//create product
let dataPro;
if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        ads : ads.value,
        taxes : taxes.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase()
    }
//count
if(title.value != '' && price.value != '' && newPro.count < 150){
    if(mod === "create"){
        if(newPro.count>1){
            for(let i=0;i<newPro.count;i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mod = "create";
        submit.innerHTML = "Create"
        count.style.display = "block"
    }
    //clearData()
}
    // save in local storag
    localStorage.setItem('product',JSON.stringify(dataPro))
    clearData();
    showData();
}
//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
//add product
function showData () {
    getTotal();
    let table = '';
    for(let i=0;i<dataPro.length;i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
          </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if(dataPro.length>0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    } else {
        btnDelete.innerHTML = ''
    }
}
showData();
//delete
function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
//delete all
function deleteAll() {
    dataPro.splice(0)
    localStorage.clear()
    showData();
}

//update
function updateData(i){
    title.value =dataPro[i].title
    price.value =dataPro[i].price
    taxes.value =dataPro[i].taxes
    ads.value =dataPro[i].ads
    discount.value =dataPro[i].discount
    category.value =dataPro[i].category
    count.style.display = "none"
    submit.innerHTML = "Update";
    getTotal()
    mod ="update"
    tmp =i
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search
let searchMod = 'title';
let search = document.getElementById("search");
function getSearchMod(id) {
    if(id == 'searchtitle'){
        searchMod = 'title';
        //search.placeholder = "search by title";
    }else {
        searchMod = 'category';
        //search.placeholder = "search by category";
    }
    search.placeholder = "search by " +searchMod;
    search.focus()
    search.value = '';
    showData();
}

function searchData(value){
    let table = '';
    if(searchMod == "title"){
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
        </tr>`
            }
        }
    } else{
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete">delete</button></td>
        </tr>`
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

//right data




























