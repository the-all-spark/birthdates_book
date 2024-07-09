window.addEventListener('load',filters);

function filters() {
    console.log("Фильтры готовы к использованию!");

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
        name: "Имя 5", nickname: "Ник 5", category: "job", media: "Telegram,",
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
        id: 10, day: 15, month: 4, year: 1971,
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
        id: 14, day: 26, month: 4, year: 2004,
        name: "", nickname: "ник 14", category: "others", media: "Viber, Telegram",
        links: "", phone: "", email: "", addinfo: "из фитнес-клуба"
    },

    15: {
        id: 15, day: 4, month: 6, year: 2003,
        name: "Имя 15", nickname: "", category: "family", media: "Viber, Telegram",
        links: "", phone: "+000-00-000-00-15", email: "", addinfo: ""
    },

    16: {
        id: 16, day: 18, month: 7, year: 1989,
        name: "", nickname: "Ник 16", category: "others", media: "Viber",
        links: "", phone: "+000-00-000-00-16", email: "", addinfo: "из бассейна"
    },

    17: {
        id: 17, day: 22, month: 7, year: 2001,
        name: "Имя 17", nickname: "Ник 17", category: "friends", media: "Viber",
        links: "", phone: "+000-00-000-00-17", email: "", addinfo: ""
    },

};