//Text
const dataInput = document.querySelector('#data');
//Image Format
const imageFormat = document.querySelector('input[name="format"]:checked');
//Colors
const mainColorPicker = document.querySelector('#color');
const backgroundColorPicker = document.querySelector('#bg-color');

const mainColorValue = document.querySelector('#color-value');
const backgroundColorValue = document.querySelector('#bg-color-value');

const updateColor = (e) => {
  const value = e.target.value;
  mainColorValue.innerText = value;
};
const updateBackgroundColor = (e) => {
  const value = e.target.value;
  backgroundColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
  mainColorPicker.addEventListener('change', updateColor);
  backgroundColorPicker.addEventListener('change', updateBackgroundColor);
};
addColorPickerEventListeners();

//Sliders
const sizeSlider = document.querySelector('#size');
const marginSlider = document.querySelector('#margin');

const sizeValue = document.querySelector('#size-value');
const marginValue = document.querySelector('#margin-value');

const addSliderEventListeners = () => {
  sizeSlider.addEventListener('change', (e) => {
    sizeValue.innerText = `${e.target.value} x ${e.target.value}`;
  });
  marginSlider.addEventListener('change', (e) => {
    marginValue.innerText = `${e.target.value}px`;
  });
};
addSliderEventListeners();

const submitButton = document.querySelector('#cta');

const showInputError = () => {
  dataInput.classList.add('error');
};

const addDataInputEventListener = () => {
  dataInput.addEventListener('change', (e) => {
    if (e.target.value !== '') {
      dataInput.classList.remove('error');
      submitButton.removeAttribute('disabled');
    } else {
      dataInput.classList.add('error');
      submitButton.setAttribute('disabled', true);
    }
  });
};
addDataInputEventListener();

const prepareParameters = (params) => ({
  data: params.data,
  size: `${params.size}x${params.size}`,
  color: params.color.replace('#', ''),
  bgcolor: params.bgColor.replace('#', ''),
  qzone: params.qZone,
  format: params.format,
});

const settingsContainer = document.querySelector('#qr-code-settings');
const resultsContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');

const displayQrCode = (imgUrl) => {
  resultsContainer.classList.add('flipped');
  settingsContainer.classList.add('flipped');
  qrCodeImage.setAttribute('src', imgUrl);
};

const getQrCode = (parameters) => {
  const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
  const urlParams = new URLSearchParams(parameters).toString();

  const fullUrl = `${baseUrl}?${urlParams}`;
  fetch(`${baseUrl}?${urlParams}`).then((response) => {
    if (response.status === 200) {
      displayQrCode(fullUrl);
    }
  });
};

const onSubmit = () => {
  console.log('submit');

  const data = dataInput.value;
  if (!data.length) {
    return showInputError();
  }
  const color = mainColorPicker.value;
  const bgColor = backgroundColorPicker.value;
  const size = sizeSlider.value;
  const qZone = marginSlider.value;
  const format = imageFormat.value;

  const parameters = prepareParameters({
    data,
    color,
    bgColor,
    size,
    qZone,
    format,
  });
  getQrCode(parameters);
};

const addSubmitEventListener = () => {
  submitButton.addEventListener('click', onSubmit);
};
addSubmitEventListener();

const editButton = document.querySelector('#edit');

const addEditButtonEventListener = () => {
  editButton.addEventListener('click', () => {
    resultsContainer.classList.remove('flipped');
    settingsContainer.classList.remove('flipped');
  });
};
addEditButtonEventListener();
