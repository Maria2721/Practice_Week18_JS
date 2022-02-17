let errors = [];

function checkValidity(input) {
    let validity = input.validity;

    if (validity.valueMissing) {
        errors.push('Поле ' + input.placeholder + ' не заполнено');
    }

    if (validity.patternMismatch) {
        errors.push('Неверный формат заполнения ' + input.placeholder);
    }

    if (validity.rangeOverflow) {
        let max = input.max;
        errors.push('Максимальное значение не может быть больше чем ' + max);
    }

    if (validity.rangeUnderflow) {
        let min = input.min;
        errors.push('Минимальное значение не может быть больше чем ' + min);
    }
}

function checkAll() {
    errors = [];
    let inputs = document.querySelectorAll("input");
    let name = document.getElementById("inputName").value;
    let date = document.getElementById("inputDate").value;
    let sex = document.querySelector('input[name="genderRadios"]:checked');

    for (let input of inputs) {
        checkValidity(input);
    }

    if (date == "") {
        errors.push("Дата рождения не заполнена");
    } else {
        let userDate = new Date(date);
        let nowDate = new Date();
        if (userDate.getTime() > nowDate.getTime()) {
            errors.push("Дата рождения заполнена некорректно");
        }
    }

    if (sex == null) {
        errors.push("Пол не заполнен.");
    }

    if (errors != '') {
        document.getElementById("errorMessage").innerHTML = errors.join('. <br>');
    } else {
        document.getElementById("errorMessage").innerHTML = '';
        const allInput = document.querySelectorAll('input');
        allInput.forEach(input => {
            input.value = "";
        })
        sex.checked = false;

        alert(`Добро пожаловать, ${name}!`);
    }
}