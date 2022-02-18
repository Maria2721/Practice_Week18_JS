document.addEventListener("DOMContentLoaded", function (event) {
    let username = localStorage.getItem('username');
    if (username != null) {
        document.getElementById("author").value = username;
    }

    // здесь можно отобразить комментарий в поле textarea

    /* if (localStorage.getItem('usercomment') != null) {
        let usercomment = localStorage.getItem('usercomment');
        let lastjscomment = JSON.parse(usercomment);
        document.getElementById("newComments").value = lastjscomment;
    } */

    if (username != null && localStorage.getItem('usercomment') != null) {
        let usercomment = localStorage.getItem('usercomment');
        let lastjscomment = JSON.parse(usercomment);
        document.getElementById("container").innerHTML += `<span>${username}: </span><span>${lastjscomment}</span><br>`;
    }

    if (localStorage.getItem('userimage') != null) {
        userPhoto.src = localStorage.getItem('userimage');
    }
});

function sendMessage(author, spamComment) {
    document.getElementById("container").innerHTML += `<span>${author}: </span><span>${spamComment}</span><br>`;
}

function checkMessage() {
    document.getElementById("errorMessage").innerHTML = '';
    let author = document.getElementById("author").value;
    let comment = document.getElementById("newComments").value;
    let spamComment = checkSpam(comment);
    let jscomment = JSON.stringify(spamComment);
    let photo = document.getElementById("userFile").files[0];

    if (photo != undefined) {
        userPhoto.src = URL.createObjectURL(photo);
        localStorage.setItem('userimage', userPhoto.src);
    }

    if (author != '' && spamComment != '') {
        sendMessage(author, spamComment);
        localStorage.setItem('username', author);
        localStorage.setItem('usercomment', jscomment);
    } else if (author == '') {
        document.getElementById("errorMessage").innerHTML += 'Поле Имя не заполнено! <br>';
    } else if (spamComment == '') {
        document.getElementById("errorMessage").innerHTML += 'Поле Комментарий не заполнено! <br>';
    }
    document.getElementById("newComments").value = "";
}

function checkSpam(comment) {
    let comments = comment.split(' ');
    for (let i = 0; i < comments.length; i++) {
        let spam = comments[i].replace(/viagra|xxx/gi, "***");
        comments[i] = spam;
    }
    return comments.join(' ');
}