let commentsArray = [];
document.addEventListener("DOMContentLoaded", function (event) {
    commentsArray = localStorage.getItem('usercomment') ? JSON.parse(localStorage.getItem('usercomment')) : [];

    let username = localStorage.getItem('username');
    if (username != null) {
        document.getElementById("author").value = username;
    }

    if (username != null && commentsArray != null) {
        commentsArray.forEach(item => {
            document.getElementById("container").innerHTML += `<span>${username}: </span><span>${item}</span><br>`;
        });
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
    let photo = document.getElementById("userFile").files[0];

    if (photo != undefined) {
        userPhoto.src = URL.createObjectURL(photo);
        localStorage.setItem('userimage', userPhoto.src);
    }

    if (author != '' && spamComment != '') {
        sendMessage(author, spamComment);
        commentsArray.push(spamComment);
        console.log(commentsArray);
        localStorage.setItem('username', author);
        localStorage.setItem('usercomment', JSON.stringify(commentsArray));
        document.getElementById("newComments").value = "";
    } else if (author == '') {
        document.getElementById("errorMessage").innerHTML += 'Поле Имя не заполнено! <br>';
    } else if (spamComment == '') {
        document.getElementById("errorMessage").innerHTML += 'Поле Комментарий не заполнено! <br>';
    }
}

function checkSpam(comment) {
    let comments = comment.split(' ');
    for (let i = 0; i < comments.length; i++) {
        let spam = comments[i].replace(/viagra|xxx/gi, "***");
        comments[i] = spam;
    }
    return comments.join(' ');
}

function deleteMessage() {
    localStorage.removeItem('usercomment');
    document.getElementById("container").innerHTML = "";
    commentsArray = [];
}