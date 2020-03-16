module.exports = {
  validation: {
    requiredField: 'Обязательное поле для заполнения',
    toShort: 'Минимальное количество символов 2',
    toLong: 'Максимальное количество символов 30',
    url: '— не правильным форматом для url-адреса',
    email: '— не прафильный формат для email-адреса',
    toShortPassword: 'Минимальная длинна пароля 8 символов'
  },
  clientErrors: {
    mailAlreadyExists: 'Такой Email уже существует',
    authorization: 'Требуется авторизация',
    authentication: 'Неправильные почта или пароль',
    resourceNotFound: 'Запрашиваемый ресурс не найден'
  },
  success: {
    removeCard: 'Пост успешно удален!'
  }
};
