const list = document.querySelector('.list');
const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector('.clearBtn');
const noteInput = document.querySelector('.note');
let itemsArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
let notesCount = localStorage.getItem('notesCount') ? JSON.parse(localStorage.getItem('notesCount')) : [];

itemsArray.forEach(item => {
    liMaker(item);
});

function addStuff() {
    const noteText = noteInput.value;

    if (noteText.length === 0) return;

    localStorage.setItem('notesCount', notesCount);

    // создаем объект Note, где id будет порядковым номером записи, а введенный текст будет добавлен в список на экране
    let note = new Note(notesCount, noteText);
    notesCount += 1;
    localStorage.setItem('notesCount', notesCount)

    // itemsArray у нас теперь массив из объектов класса Note, а не из строк
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
    //для создания записи используем текст из объекта
    li.textContent = `${note.text} `;
    li.id = 'mynote';
    //а также идентификационный номер по которому мы сможем определить нужный пункт списка
    li.value = note.id;
    li.appendChild(btn);
    list.appendChild(li);
}

function deleteNote(e) {
    const parent = e.target.parentNode;
    parent.remove();

    localStorage.removeItem('notes');
    //когда мы удаляем запись, мы фильтруем массив и убираем из него объект с таким же индентификационным номером, как и запись на экране
    filteredItemsArray = itemsArray.filter((item) => item.id != parent.value);
    localStorage.setItem('notes', JSON.stringify(filteredItemsArray));
}

function clearList() {
    list.innerHTML = "";
    localStorage.removeItem('notes');
    itemsArray = [];
    localStorage.removeItem('notesCount');
    // notesCount = 1;
}

addBtn.addEventListener("click", addStuff);
clearBtn.addEventListener("click", clearList);