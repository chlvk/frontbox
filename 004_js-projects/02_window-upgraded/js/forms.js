const SERVER_URL = '../assets/server.php';
const STATUS_MESSAGE_SHOW_TIME = 3000;
const PHONE_REGEXP = /\D/;

const Messages = {
  LOADING: 'Загрузка...',
  SUCCESS: 'Спасибо! Скоро с вами свяжемся',
  FAILURE: 'Что-то пошло не так'
};

const formNodes = document.querySelectorAll('form');
const inputNodes = document.querySelectorAll('input');
const phoneInputNodes = document.querySelectorAll('input[name="user_phone"]');

const postData = async (url, data) => {
  const statusMessageNode = document.querySelector('.status');
  statusMessageNode.textContent = Messages.LOADING;

  const result = await fetch(url, {
    method: 'POST',
    body: data
  });

  return await result.text();
};

const clearInputs = () => {
  inputNodes.forEach((item) => {
    item.value = '';
  });
};

const bindPhoneInputs = () => {
  phoneInputNodes.forEach((item) => {
    item.addEventListener('input', () => {
      // не делать так в реальных проектах
      item.value = item.value.replace(PHONE_REGEXP, '');
    });
  });
};

const bindForms = () => {
  formNodes.forEach((item) => {
    item.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessageNode = document.createElement('div');
      statusMessageNode.classList.add('status');
      item.append(statusMessageNode);

      const formData = new FormData(item);

      postData(SERVER_URL, formData)
        .then(() => {
          statusMessageNode.textContent = Messages.SUCCESS;
        }).catch(() => {
          statusMessageNode.textContent = Messages.FAILURE;
        }).finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessageNode.remove();
          }, STATUS_MESSAGE_SHOW_TIME);
        });
    });
  });
};

const initForms = () => {
  bindPhoneInputs();
  bindForms();
};

export {initForms};
