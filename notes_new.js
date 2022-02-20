const list = document.querySelector('.list');
const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector('.clearBtn');
const noteInput = document.querySelector('.note');
let itemsArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

itemsArray.forEach(item => {
    liMaker(item);
});

function addStuff() {
    const note = noteInput.value;

    if (note.length === 0) return;

    itemsArray.push(note);
    localStorage.setItem('notes', JSON.stringify(itemsArray));

    liMaker(note);

    noteInput.value = "";
}

function liMaker(note) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Delete note ';
    btn.className = 'deleteBtn';
    btn.addEventListener("click", (e) => deleteNote(e));

    const li = document.createElement('li');
    li.textContent = `${note} `;
    li.id = 'mynote';
    li.appendChild(btn);

    list.appendChild(li);
}

function deleteNote(e) {
    const parent = e.target.parentNode;
    parent.remove();

    // достаем значения li из списка ul и перезаписать их в массив itemsArray
    let text = list.textContent.trim();
    let newArray = text.split(' ');
    let newArrayClean = newArray.filter((e) => e != 'Delete' && e != 'note'); // убираем текст от кнопок!
    itemsArray = [];
    itemsArray = newArrayClean.map((item) => item);
    localStorage.removeItem('notes');
    localStorage.setItem('notes', JSON.stringify(itemsArray));
}

function clearList() {
    list.innerHTML = "";
    localStorage.removeItem('notes');
    itemsArray = [];
}

addBtn.addEventListener("click", addStuff);
clearBtn.addEventListener("click", clearList);

// добавить валидацию при добавлении заметки