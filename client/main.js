const category = document.querySelector(".category");
const infoBox = document.querySelector(".infoBox");


const baseUrl = "http://localhost:3600"

async function getData() {
    try {
        const res = await fetch(`${baseUrl}/catalog`);
        const data = await res.json();
        render(data);
    } catch (error) {
        console.log(error);
    }
}

async function addDisplay(active) {
    if (active) {
        try {
            const res = await fetch(`${baseUrl}/${active}`);
            const data = await res.json();
            render(data);
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const res = await fetch(`${baseUrl}/phones`);
            const data = await res.json();
            renderDefault(data,`${baseUrl}/phones`);
        } catch (error) {
            console.log(error);
        }
    }
}

async function renderDefault(data) {
    if (data) {
        infoBox.innerHTML = data.map((item) => {
            return `
        <div class="flex flex-col border-2 rounded-md p-4 gap-3 bg-gray-100">
            <img src="${item.img}" alt="" class="w-[250px] items-center justify-center rounded-md bg-black">
            <div class="flex flex-col gap-2">
                <h1 class="font-semibold">${item.title}</h1>
                <h1>${item.rame}</h1>
                <h1>${item.color}</h1>
                <h1 class="font-semibold">${item.price} uzs</h1>
                <div class="flex justify-between">
                    <button class="w-[50px]  rounded-md bg-green-500 text-white"><i class="fa-solid fa-cart-plus"></i></button>
                    <button class="w-[120px] border-red-500 text-red-500 border-2 font-normal rounded-md hover:bg-red-500 hover:text-white">Рассрочку</button>
                </div>
            </div>
        </div>`;
        })
            .join("")
    }
}

async function render(data) {
    category.innerHTML = data.map((item) => {
        return `
        <div class=" p-5 flex flex-col items-center gap-[20px] w-[100%]">
            <img src="${item.img}" class="w-[250px]" alt="">
            <div class="flex flex-col gap-2 text-center font-semibold text-[18px] w-[100%]">
                <div class="min-h-20">
                   <h1>${item.text}</h1>
                    <h1>${item.name}</h1>
                </div>
                <button class="border bg-blue-500 text-white font-semibold w-[100%]">Show more</button>
            </div>
        </div>`
    }).join("")
}

getData()
addDisplay()
