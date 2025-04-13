const userForm = document.querySelector("#form")
const userName = document.querySelector("#ism")
const userNumber = document.querySelector("#raqam")
const boxWrapper = document.querySelector("#wrapper")



// Get
// Post
// Put
// Delete

const getAPI = "http://localhost:3000/users"

async function renderUsers(url) {
    boxWrapper.innerHTML = "";
    try {
        const res = await fetch(url);
        const data = await res.json();
        data.map(obyektlar => {
            
            boxWrapper.innerHTML +=  
            `
            <li class="w-[700px] mx-auto bg-emerald-200 rounded-[20px] p-[20px] shadow shadow-emerald-950 mb-[20px] flex items-center justify-between">
         <div class="flex items-center gap-[20px]" >
             <span>ID:${obyektlar.id}</span>
            <h2> Name: ${obyektlar.name}</h2>
            <span>Number ${obyektlar.number}</span>
         </div>
            
         <div class="flex items-center gap-[20px]">
         <button>
         <i class="fa-solid fa-pen-to-square fa-2xl"></i>
         </button>
           <button>
         <i class="fa-solid fa-trash fa-2xl"></i>
         </button>
         </div>
            </li>
            `
        })
        
    } catch (error) {
        
        console.error(error);
    }
}
renderUsers(getAPI)

userForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const name = userName.value.trim();
    const number = userNumber.value.trim();

    // Avval hamma foydalanuvchilarni olib, oxirgi IDni topamiz
    const res = await fetch(getAPI);
    const users = await res.json();

    let lastId;

    if (users.length > 0) {
      // Foydalanuvchilar ro'yxati bo'sh emas, oxirgi id ni olish
      lastId = parseInt(users[users.length - 1].id);
    } else {
      // Agar ro'yxat bo'sh bo'lsa, id 0 dan boshlanadi
      lastId = 0;
    }
    
    // Yangi id ni 1 ga oshirib, string qilib olish
    const newId = (lastId + 1).toString();
    

    // POST qilish
    fetch(getAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: newId,
            name: name,
            number: number
        })
    }).then(() => {
        userName.value = "";
        userNumber.value = "";
        renderUsers(getAPI); // yangi foydalanuvchini render qilish
    }).catch(err => console.error(err));
});
