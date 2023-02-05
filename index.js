const box = document.getElementById("box"); //card-text
const title = document.getElementById("title");
const image = document.getElementById("image");
const tabSwitcher = document.getElementById("tab-switcher");

const list = new linkedList();

const data = [
   { title: "Chrome", value: "This is a window that contains Chrome application", url:"https://img.icons8.com/color/256/chrome--v1.png"},
   { title: "VS Code", value: "Window --> VS Code", url:"https://img.icons8.com/color/256/visual-studio-code-2019.png"},
   { title: "Android Studio", value: "This is a window that contains Android Studio application", url:"https://img.icons8.com/color/256/android-studio--v2.png"},
   { title: "Photos", value: "Window --> Photos", url:"https://img.icons8.com/color/256/google-photos.png"},
   { title: "Calendar", value: "This is a window that contains Calendar application", url:"https://img.icons8.com/color/256/calendar--v1.png"},
   { title: "Maps", value: "Window --> Maps", url:"https://www.shutterstock.com/shutterstock/photos/141441646/display_1500/stock-vector-flat-colored-location-icon-141441646.jpg"},
   { title: "Postman", value: "This is a window that contains Postman application", url:"https://img.icons8.com/external-tal-revivo-color-tal-revivo/256/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png"}
];

for (let i in data)
   list.add({id: i});

tabSwitcher.hidden = true;
let tabAble = false;

let point, children, offset;

setState();

document.addEventListener('keydown', function(e) {
    console.log(e);
    if(e.key === "Control"){
       tabAble = true;
       point = list.head;
    }

    if((e.key === "b" || e.key === "v") && tabAble) { // b <- backward, v -> forward
        tabSwitcher.hidden = false;
        let key = e.key;
        let dataSize = data.length;

        children[offset].classList.remove("sel");

        point = key === "v" ? point.next : point.prev;
        offset = key === "v" ? ((offset + 1) % dataSize) : offset ? ((offset-1) % dataSize) : (dataSize-1);
        children[offset].classList.add("sel"); 
    }   
});

document.addEventListener("keyup", function(e) {
    if(e.key === "Control") {
        tabAble = false;
        list.moveToFront(point);
        tabSwitcher.hidden = true;
        setState();
    }
});

function setState() {
    image.src = data[list.head.content.id].url;
    title.innerHTML = data[list.head.content.id].title;
    box.innerHTML = data[list.head.content.id].value;

    tabSwitcher.innerHTML = "";

    let temp = list.head;


    do {
        tabSwitcher.innerHTML += `<li class="list-group-item"><img src="${data[temp.content.id].url}"><p>${data[temp.content.id].title}</p></li>`
        temp = temp.next;

    } while(temp !== list.head);

    children = tabSwitcher.childNodes;
    children[0].classList.add("sel");
    offset = 0; 
}
