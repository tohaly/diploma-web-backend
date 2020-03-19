# Сервер "Diploma-web"

Version: v.0.0.1

## Описание Проекта

Данный сервер разработан на node.js с применением  express.js.

## Как найти

Сервер можной найти по следующим адресам:

#### Бэкэнд

https://api.diploma-web.ml/

https://www.api.diploma-web.ml/

#### Фронтенд

https://diploma-web.ml/

https://www.diploma-web.ml/

## Используемые технологии:

JS, GIT, Eslint, Node.js, express.js.

## Локальный запуск

1. Склонировать репозиторий
2. Доставить отсутствующие модули npm
   ```
       npm install
   ```
3. Запустить локальный сервер
   ```
       npm run dev
   ```

## Внесение изменений

При необходимости, после внесения изменений, запустить тестирование

```
    npm run eslint
```

## API

### `/signup`

- Описание: Создание пользователя на сервере.
- Метод: `POST`;
- Headers:

```
Content-Type: application/json
```

- Параметры:

```
email - почта для регистрации, string;
password - пароль, string;
name: имя пользователя, string.
```

- Пример тела запроса:

```
{
  "email": "admin@gmail.com"
  "password": "p2As&dww0rd",
  "name": "Admin"
}
```

- Пример тела ответа:

```
 {
  "_id": "5e5105023443980914d76c09",
  "email": "admin@gmail.com",
  "name": "Admin",
  }
```

### `/signin`

- Описание: Авторизация пользователя на сервере.
- Метод: `POST`;
- Headers:

```
Content-Type: application/json
```

- Параметры:

```
email - почта для регистрации, string;
password - пароль, string.
```

- Пример тела запроса:

```
{
  "email": "admin@gmail.com",
  "password": "p2As&dww0rd"
}
```

- Пример тела ответа:

```
{
    "message": "Авторизация прошла успешно"
}
```

- Пример `Cookies`

```
jwt=eyJhbGciOi.....GhIXiC0yGI7u-nfRs; path=/; domain=localhost; HttpOnly; Expires=Wed, 25 Mar 2020 14:08:51 GMT;
```

### `/users/me`

- Описание: Получение данных о пользователе
- Метод: `GET`;
- Cookies:

```
jwt=eyJhbGciOi.....GhIXiC0yGI7u-nfRs; path=/; domain=localhost; HttpOnly; Expires=Wed, 25 Mar 2020 14:08:51 GMT;  //Пример токена авторизации
```

- Пример тела ответа:

```
 {
  "_id": "5e724b582c803e14518a03f0",
  "email": "admin@gmail.com",
  "name": "Admin"
}
```

### `/articles`

- Описание: Получение списка статей сохраненных пользователем.
- Метод: `GET`;
- Cookies:

```
jwt=eyJhbGciOi.....GhIXiC0yGI7u-nfRs; path=/; domain=localhost; HttpOnly; Expires=Wed, 25 Mar 2020 14:08:51 GMT;  //Пример токена авторизации
```

- Пример ответа:

```
{
  "data": [
    {
      "_id": "5e724d372c803e14518a03f1",
      "keyword": "world",
      "title": "Coronavirus: UK and US stocks dive despite stimulus plans",
      "text": "The Dow led the declines in the US, falling more than 4%, while the S&P 500 and Nasdaq dropped more than 3%. The FTSE 100 index of top UK firms fell more than 3%, with aerospace, travel and housing firm among the hardest hit.",
      "date": "12.01.2020",
      "source": "BBC",
      "link": "https://bbc.al",
      "image": "https://bbc.al"
    },

    ........................

    ........................

    {
      "_id": "5e724d3a2c803e14518a03f2",
      "keyword": "world",
      "title": "EU warns of Kremlin disinformation efforts to sow 'panic and fear' during coronavirus outbreak",
      "date": "12.01.2020",
      "source": "CNN",
      "link": "https://cnn.al",
      "image": "https://cnn.al",
      "text": "(CNN)Russian state media and pro-Kremlin outlets have deployed a disinformation campaign to sow "panic and fear" in the West amid the coronavirus outbreak, European Union (EU) officials warned in an internal report seen by CNN."
    }
  ]
}
```

### `/articles`

- Описание: Создания пользователя на сервере.
- Метод: `POST`;
- Cookies:

```
jwt=eyJhbGciOi.....GhIXiC0yGI7u-nfRs; path=/; domain=localhost; HttpOnly; Expires=Wed, 25 Mar 2020 14:08:51 GMT;  //Пример токена авторизации
```

- Параметры:

```
keyword - ключевые слова статьи, string;
title - заголовок статьи, string;
date - дата создания статьи, string;
source - ресурс опубликовавший статью, string;
link - ссылка на статью, string;
image - главное изображение статьи, string;
text - текст статьи, string.
```

- Пример тела запроса:

```
{
	"keyword": "world",
	"title": "EU warns of Kremlin disinformation efforts to sow 'panic and fear' during coronavirus outbreak",
	"date": "12.01.2020",
	"source": "CNN",
	"link": "https://cnn.al",
	"image": "https://cnn.al",
	"text": "(CNN)Russian state media and pro-Kremlin outlets have deployed a disinformation campaign to sow "panic and fear" in the West amid the coronavirus outbreak, European Union (EU) officials warned in an internal report seen by CNN."
}
```

- Пример тела ответа:

```
{
  "_id": "5e724f592c803e14518a03f4",
	"keyword": "world",
	"title": "EU warns of Kremlin disinformation efforts to sow 'panic and fear' during coronavirus outbreak",
	"date": "12.01.2020",
	"source": "CNN",
	"link": "https://cnn.al",
	"image": "https://cnn.al",
	"text": "(CNN)Russian state media and pro-Kremlin outlets have deployed a disinformation campaign to sow "panic and fear" in the West amid the coronavirus outbreak, European Union (EU) officials warned in an internal report seen by CNN."
}

```

### `/article/:articleId`

- Описание: Удаляет статью из базы данных.
- Метод: `DELETE`;
- Cookies:

```
jwt=eyJhbGciOi.....GhIXiC0yGI7u-nfRs; path=/; domain=localhost; HttpOnly; Expires=Wed, 25 Mar 2020 14:08:51 GMT;  //Пример токена авторизации
```

- Пример ответа:

```
  {
    "message": "Статья успешно удалена!"
  }
```
