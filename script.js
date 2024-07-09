window.addEventListener('load',filters);

function filters() {
    console.log("Фильтры готовы к использованию!");

    const dateFilter = document.getElementById('date');   //доступ к фильтру с месяцами

    // Получить текущую дату, месяц, массив опций из фильтра "Выберите месяц"

    let now = new Date();
    let currentMonth = now.getMonth() + 1;
    let optionsArray = Array.from(dateFilter);

        //console.log(`${now} - текущая дата`);
        //console.log(`${currentMonth} - текущий месяц`);

    for (let i in optionsArray) {
        if (currentMonth == (optionsArray[i].index) + 1) {
            optionsArray[i].setAttribute("selected", "");

                //console.log(optionsArray[i].innerHTML);
                //console.log(optionsArray[i]);

            showDates(currentMonth);
            showStatistics(optionsArray[i].innerHTML); //информация для статистики берется из текста ("12 - декабрь")
        }
    };

    // -------- запуск функции при смене опции в фильтре ----------

    dateFilter.onchange = function () {
        console.log("Запуск функции по смене фильтра");

        //получить доступ к строке с предупреждением; если она присутствует (не null) - удалить 
        let warningBlock = document.querySelector(".warning");

        if (warningBlock != null) {
            warningBlock.remove();
        }

        //записать в переменную текущее число строк в таблице
        let rowAmount = document.getElementsByTagName('tr');

        //проверить сколько строк с таблице (если == 1, значит отображается только шапка и надо вывести информацию)
        if (rowAmount.length == 1) {
            showDates(this.value); //вызов функции с текущим значением value
            showStatistics(optionsArray[this.value - 1].innerHTML); //вывод статистики

        } else {
            console.log("Убирается старая инфа");

            let createdBlock = document.querySelector(".results"); //доступ к блоку, в котором содержится выведенная информация
            createdBlock.remove();  //удаление блока

            showDates(this.value);
            showStatistics(optionsArray[this.value - 1].innerHTML);
        }

    }

    // ----------- Функция вывода строк таблицы с информацией, предупреждения ------------
    // (передается значение текущего месяца (цифрой))
    /*
     - определяет возраст (выводит в формате "--- лет"). Слово "год" склоняется
     - категория из элементов объекта в таблице выводится на русском языке
     - отмечаются цветом ближайшие дни рождения 
     - если в объекте присутствует никнейм, к нему добавляются скобки (если нет имени, только никнейм, он выводится без скобок)
     - составляется строка, если месяц рождения совпадает с текущим, увеливается счетчик общего количества строк
     - выводится предупреждение, если строки в результате отсутствуют (иначе запускается сортировка строк)
    */

     function showDates(monthNumber) {

        let header = document.querySelector(".header"); //получить доступ к содержимому thead таблицы

        let htmlTbody = document.createElement("tbody"); //создать элемент tbody
        htmlTbody.className = "results"; //назначать элементу tbody класс results

        //создать переменную с текущей датой
        let currentDate = new Date();

        //создать переменную, которая будет хранить число строк в результате,
        let count = 0;

        //перебрать все элементы объекта persons
        for (let i in persons) {

            //сравнить значение текущего месяца со значением, хранящимся в свойстве month элемента объекта
            if (persons[i].month == monthNumber) {
                //console.log("Вот тут собирается строчка!");

                // ----- вывести год рождения и возраст: -----

                //создать переменную с датой рождения (значения берутся из объекта)
                let birthdayDate = new Date(`${persons[i].year}-${persons[i].month}-${persons[i].day}`);

                let age = currentDate.getFullYear() - birthdayDate.getFullYear();

                let ending; // склонение год (лет)
                let ageInfo; // возраст "цифра год(лет)"

                //если год в объекте - число, тогда рассчитать текущий возраст age:
                if (!isNaN(persons[i].year)) {

                    if (currentDate.getMonth() < birthdayDate.getMonth() ||
                        (currentDate.getMonth() == birthdayDate.getMonth() && currentDate.getDate() < birthdayDate.getDate())) {
                        age--;
                    }

                    //перевести значение переменной возраста (age) в строку, определить последний и предпоследний символ
                    //определить склонение слова (год - года - лет)
                    let ageInString = age.toString();
                    let lastSymbol = +ageInString[ageInString.length - 1];
                    let prevSymbol = parseInt(age / 10);

                    if (prevSymbol == 1) {
                        ending = "лет";
                    } else {
                        switch (lastSymbol) {
                            case 1:
                                ending = "год"; break;
                            case 2:
                            case 3:
                            case 4:
                                ending = "года"; break;
                            default:
                                ending = "лет"; break;
                        }
                    }
                    ageInfo = `(${age} ${ending})`;

                } 
                
                // если значение года - не число (год указан как "19--"), строка "-" или пустая строка ""
                if(isNaN(persons[i].year) || typeof(persons[i].year) === "string") {
                    age = "";
                    ending = "";
                    ageInfo = "";
                    persons[i].year = "..."
                }

                // ----- записать название категории на русском языке -----

                let categoryEN = persons[i].category;
                let categoryRU;

                switch (categoryEN) {
                    case "family":
                        categoryRU = "семья"; break;
                    case "job":
                        categoryRU = "коллеги"; break;
                    case "friends":
                        categoryRU = "друзья"; break;
                    case "others":
                        categoryRU = "знакомые"; break;
                    default:
                        categoryRU = "без категории"; break;
                }

                // ----- отметить ближайшие дни рождения цветом (меньше чем через неделю и день в день) -----

                let daysBeforeBithday = birthdayDate.getDate() - currentDate.getDate();
                let classToMark;

                if (currentDate.getMonth() == birthdayDate.getMonth() && daysBeforeBithday == 0) {
                    classToMark = "birthDay";
                        //console.log(`* ${classToMark} - ДР СЕГОДНЯ!! `);

                } else if (currentDate.getMonth() == birthdayDate.getMonth() && daysBeforeBithday > 0 && daysBeforeBithday < 8) {
                    classToMark = "dateMark";
                        //console.log(`* ${classToMark} - ДР меньше чем через неделю!!`);

                } else {
                    classToMark = "dateNumber";
                        //console.log(`* ${classToMark} - Просто дата.`);
                }

                // ----- добавление скобок к никнейму, если он присутствует в объекте -----
                // если есть никнейм, но нет имени - скобки убираем (никнейм выводится без скобок)

                let nickname = persons[i].nickname;
                let name = persons[i].name;

                let nicknameOutput;

                if (nickname.length !== 0 && name.length !== 0) {
                    nicknameOutput = `(${persons[i].nickname})`;
                } else if (nickname.length !== 0 && name.length == 0) {
                    nicknameOutput = persons[i].nickname;
                } else {
                    nicknameOutput = "";
                }

                // ----- построить строку таблицы, если месяцы совпадают -----

                let rowBlock = `<tr id="number${persons[i].id}">
                                    <td class="${classToMark}">${persons[i].day}</td>
                                    <td class="${classToMark}">${persons[i].month}</td>
                                    <td>${persons[i].year}<br><span class="ageNumber">${ageInfo}</span></td>
                                    <td class="name"><b>${persons[i].name}</b> ${nicknameOutput}</td>
                                    <td class="category">${categoryRU}</td>
                                    <td class="contacts">${persons[i].media} <a href="${persons[i].links}" target=" _blank">${persons[i].links}</a><br><span class="phone">${persons[i].phone}</span></td>
                                    <td class="email">${persons[i].email}</td>
                                    <td class="additional">${persons[i].addinfo}</td>
                                </tr>`

                //добавить строки к элементу tbody
                htmlTbody.insertAdjacentHTML("beforeend", rowBlock);

                //console.log("Строчка собралась!!!");
                count++; //увеличить счетчик строк
            }
        }
        header.after(htmlTbody); //вставить элемент tbody после элемента thead
        console.log(`${count} - число строк выведенной информации`);

        // ----- вывод предупреждения после таблицы, если результат отсутствует, и запуск сортировки строк, если их больше 1 ----- 

        if (count === 0) {
            let infoTable = document.getElementById("infoTable");
            let warning = `<p class="warning">Людей с днями рождения в данном месяце <b>нет</b>. Выберите другой месяц.</p>`;
            infoTable.insertAdjacentHTML("afterend", warning);

        } else if (count > 1) {
            showSortedRows();
        }

    }

    // ----------- Функция сортировки выведенных строк по дате - от меньшей к большей ------------
    /* 
     - получаем доступ к таблице (#infoTable),
     - получаем все строки таблицы и сохраняем их в массив sortedRows,
     - берем все элементы кроме первого (шапки таблицы),
     - сортируем строки (если полученное число > 0, то строки поменяются местами)
     - получаем доступ к тегу tbody, отображаем в нем отсортированные строки (каждый элемент в виде строки <tr>)
    */

    function showSortedRows() {
        console.log("Запуск сортировки строк!");

        let table = document.querySelector("#infoTable");

        let sortedRows = Array.from(table.rows)
            .slice(1)
            .sort((rowA, rowB) => {
                return rowA.cells[0].innerHTML - rowB.cells[0].innerHTML;
            });

        table.tBodies[0].append(...sortedRows);
    }

    // ------- Функция отображения исходной статистики по текущему месяцу (данные поступают в формате "12 - декабрь") ------
    /*
     - очищаем входные данные (убираем число, оставляем название месяца)
     - получаем доступ к элементу с классом monthName, куда будет добавляться название месяца, 
        и элементу с классом personAmount с количеством человек, у которых ДР в текущем месяце
     - считаем количество строк в результате (элементов массива) (кроме первой строки - шапки таблицы)
     - проверяем длину содержимого (наличие) в строке количества человек. 
        - Если оно равно нулю (т.е. данные еще не были выведены), выводим количество человек и текущий месяц.
        - Если значение больше нуля (данные были выведены ранее), очищаем предыдущий вывод статистики и обновляем информацию.
     - запускаем функцию, которая выводит корректное склонение слова "человек" в зависимости от количества людей
    */

    function showStatistics(monthStr) {
        console.log("Запуск просчета статистики");

        let monthName = monthStr.slice(5); //с 5го индекса и до конца строки
        //console.log(monthStr);  //12 - декабрь
        //console.log(monthName); //декабрь

        let statMonthPlace = document.querySelector(".monthName");
        let statPersonAmountPlace = document.querySelector('.personAmount');

        let rowAmount = Array.from(document.getElementsByTagName("tr"))
            .slice(1)
            .length;

        if (statPersonAmountPlace.textContent.length == 0) {
            statMonthPlace.prepend(monthName);
            statPersonAmountPlace.prepend(rowAmount);

        } else {
            statMonthPlace.innerHTML = "";
            statPersonAmountPlace.textContent = "";

            statMonthPlace.prepend(monthName);
            statPersonAmountPlace.prepend(rowAmount);
        }

        correctPersonWord(rowAmount); //функция принимает количество рядов (человек) в результате
    }

    // -------------- Функция склонения слова "человек" в статистике в зависимости от количества людей в результате ------------------ 
    /*
     (принимает количество строк в результате, т.е. количество человек)
     - получаем доступ к элементу для вывода слова,
     - объявляем новую переменную personWord,
     - склоняем слово человек
     - если элемент уже содержит какую-то информацию, очищаем его и обновляем данные
    */

    function correctPersonWord(rowAmount) {
        let personPlace = document.querySelector(".personWord");
        let personWord;

        if (rowAmount == 1 || (rowAmount % 10) == 1) {
            personWord = "человека";
        } else {
            personWord = "человек";
        }

        personPlace.textContent = "";
        personPlace.prepend(personWord);
    }

}

//--------------- Данные для таблицы - в объекте persons ------------------

let persons = {
    0: {
        id: 0, day: 11, month: 10, year: 2000,
        name: "Имя", nickname: "", category: "job", media: "Viber",
        links: "", phone: "+000-00-000-00-00", email: "email@gmail.com", addinfo: "сидим рядом"
    },

    1: {
        id: 1, day: 27, month: 10, year: 1991,
        name: "Имя 1", nickname: "Ник 1", category: "friends", media: "VK",
        links: "https://vk.com/name1", phone: "", email: "", addinfo: ""
    },

    2: {
        id: 2, day: 13, month: 1, year: 1978,
        name: "Имя 2", nickname: "", category: "family", media: "Telegram",
        links: "@name2", phone: "", email: "", addinfo: "любит розы"
    },

    3: {
        id: 3, day: 4, month: 5, year: 1984,
        name: "Имя 3", nickname: "", category: "family", media: "Telegram",
        links: "", phone: "+000-00-000-00-03", email: "", addinfo: ""
    },

    4: {
        id: 4, day: 18, month: 5, year: 1998,
        name: "Имя 4", nickname: "Ник 4", category: "friends", media: "VK",
        links: "https://vk.com/nickname4", phone: "+000-00-000-00-04", email: "email4@gmail.com", addinfo: "живет в Барселоне"
    },

    5: {
        id: 5, day: 6, month: 5, year: 1993,
        name: "Имя 5", nickname: "Ник 5", category: "job", media: "Telegram",
        links: "@name5", phone: "+000-00-000-00-05", email: "", addinfo: ""
    },

    6: {
        id: 6, day: 21, month: 8, year: 1968,
        name: "Имя 6", nickname: "", category: "friends", media: "Telegram, Viber, VK",
        links: "https://vk.com/name6", phone: "+000-00-000-00-06", email: "email6@gmail.com", addinfo: "любит машины"
    },

    7: {
        id: 7, day: 11, month: 8, year: 1973,
        name: "Имя 7", nickname: "", category: "job", media: "Viber",
        links: "", phone: "+000-00-000-00-07", email: "email7@gmail.com", addinfo: ""
    },

    8: {
        id: 8, day: 17, month: 11, year: 1984,
        name: "Имя 8", nickname: "", category: "friends", media: "",
        links: "", phone: "+000-00-000-00-08", email: "", addinfo: ""
    },

    9: {
        id: 9, day: 15, month: 2, year: 1981,
        name: "Имя 9", nickname: "", category: "job", media: "Viber",
        links: "", phone: "+000-00-000-00-09", email: "email9@gmail.com", addinfo: ""
    },

    10: {
        id: 10, day: 19, month: 4, year: "-",
        name: "Имя 10", nickname: "", category: "job", media: "Viber",
        links: "", phone: "+000-00-000-00-10", email: "email10@gmail.com", addinfo: ""
    },

    11: {
        id: 11, day: 18, month: 2, year: 1979,
        name: "Имя 11", nickname: "Ник 11", category: "friends", media: "",
        links: "", phone: "+000-00-000-00-11", email: "", addinfo: ""
    },

    12: {
        id: 12, day: 15, month: 4, year: 1979,
        name: "Имя 12", nickname: "Ник 12", category: "friends", media: "Viber",
        links: "", phone: "+000-00-000-00-12", email: "email12@gmail.com", addinfo: ""
    },

    13: {
        id: 13, day: 31, month: 9, year: 1968,
        name: "Имя 13", nickname: "", category: "family", media: "Viber",
        links: "", phone: "+000-00-000-00-13", email: "", addinfo: ""
    },

    14: {
        id: 14, day: 26, month: 4, year: "200-",
        name: "", nickname: "Ник 14", category: "others", media: "Viber, Telegram",
        links: "", phone: "", email: "", addinfo: "из фитнес-клуба"
    },

    15: {
        id: 15, day: 4, month: 6, year: 2003,
        name: "Имя 15", nickname: "", category: "family", media: "Viber, Telegram",
        links: "", phone: "+000-00-000-00-15", email: "", addinfo: ""
    },

    16: {
        id: 16, day: 22, month: 7, year: "",
        name: "", nickname: "Ник 16", category: "others", media: "Viber",
        links: "", phone: "+000-00-000-00-16", email: "", addinfo: "из бассейна"
    },

    17: {
        id: 17, day: 9, month: 7, year: 2000,
        name: "Имя 17", nickname: "Ник 17", category: "friends", media: "Viber",
        links: "", phone: "+000-00-000-00-17", email: "email17@gmail.com", addinfo: ""
    },

};