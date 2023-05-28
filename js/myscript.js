// -- Получаем все элементы с классом 'b-input__control' и сохраняем их в переменной 'inputs' --
const inputs = document.querySelectorAll('.b-input__control');
// Итерируемся по каждому элементу 'input' в 'inputs'
inputs.forEach(function(input) {
  // Получаем следующий элемент после 'input', который является меткой (label) с классом 'b-input__placeholder'
  const placeholder = input.nextElementSibling;
  // Добавляем обработчик события 'focus' для элемента 'input'
  input.addEventListener('focus', function() {
    // При получении фокуса на 'input' добавляем класс 'input-up' к метке (label), чтобы ее поднять
    placeholder.classList.add('input-up');
  });
  // Добавляем обработчик события 'blur' для элемента 'input'
  input.addEventListener('blur', function() {
    // При потере фокуса на 'input' проверяем, если значение пустое
    if (this.value === '') {
      // Если значение пустое, удаляем класс 'input-up' у метки (label), чтобы ее опустить
      placeholder.classList.remove('input-up');
    }
  });
});

// -- Деактивация родительского поля инпут, если имеется чекбокс который может его выключать. --
// Получаем все элементы чекбоксов внутри блока b-step__item
const checkboxes = document.querySelectorAll('.b-step__item .b-input__checkbox');
// Проходимся по каждому чекбоксу
checkboxes.forEach(function(checkbox) {
  // Находим ближайший родительский блок b-step__item и ищем внутри него элемент с классом b-input__control
  const input = checkbox.closest('.b-step__item').querySelector('.b-input__control');
  // Добавляем обработчик события изменения состояния чекбокса
  checkbox.addEventListener('change', function() {
    // Если чекбокс отмечен, то делаем поле ввода неактивным (disabled), иначе делаем его активным
    if (this.checked) {
      input.disabled = true;
    } else {
      input.disabled = false;
    }
  });
});

// -- Скрипт для выпадающего списка с выбором "пола" --
// Получаем все элементы с классом b-step__item
const stepItems = document.querySelectorAll('.b-step__item');
// Проходимся по каждому элементу b-step__item
stepItems.forEach(function(item) {
  // Находим элементы .b-input__control и .b-input__dropdown внутри текущего b-step__item
  const inputControl = item.querySelector('.b-input__control');
  const dropdown = item.querySelector('.b-input__dropdown');
  // Проверяем, существует ли выпадающий список .b-input__dropdown в текущем b-step__item
  if (dropdown) {
    // Находим все элементы .b-input__dropdown-item внутри текущего .b-input__dropdown
    const dropdownItems = dropdown.querySelectorAll('.b-input__dropdown-item');
    // Добавляем обработчик события клика на .b-input__control
    inputControl.addEventListener('click', function() {
      // При клике, переключаем видимость выпадающего списка .b-input__dropdown
      dropdown.classList.toggle('show');
    });
    // Проходимся по каждому элементу .b-input__dropdown-item
    dropdownItems.forEach(function(dropdownItem) {
      // Добавляем обработчик события клика на .b-input__dropdown-item
      dropdownItem.addEventListener('click', function() {
        // При клике, устанавливаем текст .b-input__control равным тексту .b-input__dropdown-item
        inputControl.textContent = this.textContent;
        // Скрываем выпадающий список .b-input__dropdown
        dropdown.classList.remove('show');
      });
    });
  }
});

// -- Маска для ввода даты рождения --
// Получаем все элементы с классом "date-input"
var inputElements = document.getElementsByClassName('mask__input-date');
// Проходимся по каждому элементу и применяем маску
for (var i = 0; i < inputElements.length; i++) {
  var input = inputElements[i];  
  // Добавляем обработчик события ввода
  input.addEventListener('input', function(event) {
	var value = event.target.value;
	var maskedValue = applyMask(value);
	event.target.value = maskedValue;
  });
}
// Функция для применения маски и ограничения длины
function applyMask(value) {
  // Удаляем все символы, кроме цифр
  var cleanedValue = value.replace(/\D/g, '');  
  // Ограничиваем длину значения до 8 символов
  cleanedValue = cleanedValue.slice(0, 8);  
  // Применяем маску "99.99.9999"
  var maskedValue = '';
  var index = 0;
  for (var j = 0; j < cleanedValue.length; j++) {
	if (j === 2 || j === 4) {
	  maskedValue += '.';
	}
	maskedValue += cleanedValue.charAt(j);
  }  
  return maskedValue;
}

// -- Маска для ввода телефона --
window.addEventListener("DOMContentLoaded", function() {
	// Получаем все элементы с классом "mask__input-phone"
	var inputElements = document.querySelectorAll('.mask__input-phone');
	// Проходимся по каждому элементу и добавляем обработчики событий
	inputElements.forEach(function(input) {
	  var keyCode;  
	  // Функция для применения маски
	  function mask(event) {
		// Если событие является нажатием клавиши, запоминаем код нажатой клавиши
		event.keyCode && (keyCode = event.keyCode);  
		var pos = this.selectionStart;
		// Предотвращаем ввод символов в позиции меньше 3
		if (pos < 3) event.preventDefault();  
		var matrix = "+7 (___) ___ ____",
		  i = 0,
		  def = matrix.replace(/\D/g, ""),
		  val = this.value.replace(/\D/g, ""),
		  new_value = matrix.replace(/[_\d]/g, function(a) {
			return i < val.length ? val.charAt(i++) || def.charAt(i) : a
		  });  
		// Находим позицию первого не заполненного символа в маске
		i = new_value.indexOf("_");
		if (i != -1) {
		  // Если первый не заполненный символ находится в позиции меньше 5, изменяем его позицию на 3
		  i < 5 && (i = 3);
		  // Удаляем все символы после первого не заполненного символа в маске
		  new_value = new_value.slice(0, i);
		}  
		// Создаем регулярное выражение для проверки вводимых значений
		var reg = matrix.substr(0, this.value.length).replace(/_+/g,
		  function(a) {
			return "\\d{1," + a.length + "}"
		  }).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");  
		// Проверяем соответствие значения в поле ввода маске и дополнительным условиям
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58)
		  this.value = new_value;  
		// Если поле ввода теряет фокус и его длина меньше 5, очищаем его значение
		if (event.type == "blur" && this.value.length < 5)
		  this.value = "";  
		// Если поле ввода теряет фокус и его значение пустое, находим элемент "b-input__placeholder"
		// в текущем родительском блоке с классом "b-step__item" и снимаем у него класс "input-up"
		if (event.type == "blur" && this.value === "") {
		  var stepItem = this.closest(".b-step__item");
		  var placeholder = stepItem.querySelector(".b-input__placeholder");
		  if (placeholder) {
			placeholder.classList.remove("input-up");
		  }
		}
	  }  
	  // Добавляем обработчики событий для элемента ввода
	  input.addEventListener("input", mask);
	  input.addEventListener("focus", mask);
	  input.addEventListener("blur", mask);
	  input.addEventListener("keydown", mask);
	});
});

// -- Модальное окно --
document.addEventListener('DOMContentLoaded', function() {
	var addButton = document.querySelector('.b-steps__total-add'); // Кнопка для открытия модального окна
	var modals = document.querySelectorAll('.b-modal'); // Модальные окна
	var modalCloseButtons = document.querySelectorAll('.b-modal-close'); // Кнопки закрытия модальных окон
	var toner = document.querySelector('.b-modal-toner'); // Тонер (затемнение фона)
	var modalWrapper = document.querySelector('.b-modal-wrapper'); // Обертка модального окна
	var inputFields = document.querySelectorAll('input[type="text"].b-input__control'); // Поля ввода текста внутри модального окна
	var addButtonAdd = document.querySelector('.b-modal-button-add'); // Кнопка "Добавить" в модальном окне
  
	// Функция для открытия модального окна
	function openModal(modal) {
	  modal.style.display = 'block'; // Отображаем модальное окно
	  modal.classList.add('zoom-in'); // Добавляем анимацию для появления
	  toner.style.display = 'block'; // Отображаем тонер (затемнение фона)
	  modalWrapper.style.display = 'flex'; // Отображаем обертку модального окна
	}  
	// Функция для закрытия модального окна
	function closeModal(modal) {
	  modal.style.display = 'none'; // Скрываем модальное окно
	  modal.classList.remove('zoom-in'); // Удаляем анимацию
	}  
	// Функция для проверки заполнения полей ввода
	function checkInputFields() {
	  var allFieldsFilled = true;
	  for (var i = 0; i < inputFields.length; i++) {
		var field = inputFields[i];
		if (field.value.trim() === '') { // Проверяем, заполнено ли поле (убираем пробелы и проверяем на пустую строку)
		  field.classList.add('b-input__error'); // Добавляем класс ошибки для поля ввода
		  allFieldsFilled = false; // Устанавливаем флаг, что не все поля заполнены
		} else {
		  field.classList.remove('b-input__error'); // Удаляем класс ошибки, если поле заполнено
		}
	  }
	  return allFieldsFilled; // Возвращаем флаг, указывающий, заполнены ли все поля
	}  
	// Обработчик события клика на кнопку для открытия модального окна
	addButton.addEventListener('click', function() {
	  for (var i = 0; i < modals.length; i++) {
		var modal = modals[i];
		openModal(modal);
	  }
	});  
	// Обработчик события клика на кнопки закрытия модальных окон
	for (var i = 0; i < modalCloseButtons.length; i++) {
	  var button = modalCloseButtons[i];
	  button.addEventListener('click', function(event) {
		var modal = button.closest('.b-modal');
		closeModal(modal);
		modalWrapper.style.display = 'none'; // Скрываем обертку модального окна
		toner.style.display = 'none'; // Скрываем тонер
		event.stopPropagation(); // Останавливаем всплытие события
	  });
	}  
	// Обработчик события клика на тонер
	toner.addEventListener('click', function(event) {
	  modalWrapper.style.display = 'none'; // Скрываем обертку модального окна
	  toner.style.display = 'none'; // Скрываем тонер
	});  
	// Обработчик события клика на обертку модального окна
	modalWrapper.addEventListener('click', function(event) {
	  if (event.target === modalWrapper) { // Проверяем, что клик произошел именно на обертке, а не на содержимом модального окна
		for (var i = 0; i < modals.length; i++) {
		  var modal = modals[i];
		  closeModal(modal);
		}
		modalWrapper.style.display = 'none'; // Скрываем обертку модального окна
		toner.style.display = 'none'; // Скрываем тонер
	  }
	});  
	// Обработчик события клика на кнопку "Добавить" в модальном окне
	addButtonAdd.addEventListener('click', function() {
	  if (checkInputFields()) { // Проверяем, заполнены ли все поля ввода
		for (var i = 0; i < modals.length; i++) {
		  var modal = modals[i];
		  closeModal(modal);
		}
		modalWrapper.style.display = 'none'; // Скрываем обертку модального окна
		toner.style.display = 'none'; // Скрываем тонер
	  }
	});
});

// -- Загрузка изображений в 3 шаге --
// Получаем все кнопки загрузки
var downloadButtons = document.querySelectorAll('.b-step__upload-item-download');

// Обрабатываем каждую кнопку загрузки
downloadButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var item = button.closest('.b-step__upload-item');
    // Создаем input элемент типа file
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    // Обработчик события загрузки изображения
    input.addEventListener('change', function(event) {
      var file = event.target.files[0];
      // Выполняем код для загрузки изображения и дальнейшей обработки
      // После успешной загрузки изображения создаем блоки и кнопки
      var loadedText = document.createElement('p');
      loadedText.className = 'b-step__upload-item-loaded';
      loadedText.textContent = 'Загружено';

      var loadedInfo = document.createElement('div');
      loadedInfo.className = 'b-step__upload-item-loaded-info';

      var infoTitle = document.createElement('p');
      infoTitle.className = 'b-step__upload-item-loaded-info-title';
      infoTitle.textContent = file.name; // Используем имя файла

      var closeButton = document.createElement('button');
      closeButton.className = 'b-step__upload-item-close';
      closeButton.innerHTML = '&#10006;';

      // Обработчик события клика на кнопку "Закрыть"
      closeButton.addEventListener('click', function() {
        // Удаляем блоки loadedText, loadedInfo и closeButton
        loadedText.parentNode.removeChild(loadedText);
        loadedInfo.parentNode.removeChild(loadedInfo);
        button.style.display = 'block'; // Показываем кнопку загрузки
      });
      // Добавляем элементы в блоки
      loadedInfo.appendChild(infoTitle);
      loadedInfo.appendChild(closeButton);
      item.querySelector('.b-step__upload-item-text').appendChild(loadedText);
      item.querySelector('.b-step__upload-item-text').appendChild(loadedInfo);
      // Скрываем кнопку загрузки
      button.style.display = 'none';
    });
    // Запускаем событие клика на input элементе
    input.click();
  });
});

// -- Переключение полей при вводе sms-кода --
// Получаем все элементы <input> с классом 'b-message-agreement-code-item'
var inputSmsCode = document.querySelectorAll('.b-message-agreement-code-item');
// Получаем все элементы <input> с классом 'b-message-agreement-code-item'
var codeItemsContainer = document.querySelector('.b-message-agreement-code-items');

codeItemsContainer.addEventListener('click', function() {
  // Проверяем, пустой ли первый <input>
  if (inputSmsCode[0].value === '') {
    // Устанавливаем фокус на первый <input>
    inputSmsCode[0].focus();
  }
});
// Добавляем обработчик события 'input' для каждого <input>
for (var i = 0; i < inputSmsCode.length; i++) {
  inputSmsCode[i].addEventListener('input', function() {
    var currentInput = this;
    // Проверяем, заполнено ли значение текущего <input> полностью
    if (currentInput.value.length === currentInput.maxLength) {
      // Получаем следующий <input> для переключения
      var nextInput = getNextInput(currentInput);
      if (nextInput) {
        // Устанавливаем фокус на следующий <input>
        nextInput.focus();
      }
    }
    // Проверяем, пустое ли значение текущего <input>
    if (currentInput.value.length === 0) {
      // Получаем предыдущий <input> для переключения
      var prevInput = getPrevInput(currentInput);
      if (prevInput) {
        // Устанавливаем фокус на предыдущий <input>
        prevInput.focus();
      }
    }
  });
  // Добавляем обработчик события 'click' для каждого <input>
  inputSmsCode[i].addEventListener('click', function() {
    var currentInput = this;
    // Проверяем, пустое ли значение текущего <input>
    if (currentInput.value.length === 0) {
      // Устанавливаем фокус на текущий <input>
      currentInput.focus();
    }
  });
}
// Функция для получения следующего <input>
function getNextInput(currentInput) {
  // Получаем индекс текущего <input> в коллекции
  var currentIndex = Array.from(inputSmsCode).indexOf(currentInput);
  // Вычисляем индекс следующего <input>
  var nextIndex = currentIndex + 1;
  // Проверяем, существует ли следующий <input>
  if (nextIndex < inputSmsCode.length) {
    return inputSmsCode[nextIndex];
  }
  return null;
}
// Функция для получения предыдущего <input>
function getPrevInput(currentInput) {
  // Получаем индекс текущего <input> в коллекции
  var currentIndex = Array.from(inputSmsCode).indexOf(currentInput);
  // Вычисляем индекс предыдущего <input>
  var prevIndex = currentIndex - 1;
  // Проверяем, существует ли предыдущий <input>
  if (prevIndex >= 0) {
    return inputSmsCode[prevIndex];
  }
  return null;
}
