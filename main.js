// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  {
    name: "Иван",
    surname: "Андреевич",
    middleName: "Иванович",
    birthday: new Date(1998, 5, 15),
    startYear: 2017,
    department: "Физика",
  },
  {
    name: "Елена",
    surname: "Борисова",
    middleName: "Александровна",
    birthday: new Date(1999, 8, 28),
    startYear: 2022,
    department: "Математика",
  },
  {
    name: "Алексей",
    surname: "Петров",
    middleName: "Сергеевич",
    birthday: new Date(2000, 2, 10),
    startYear: 2018,
    department: "Информатика",
  },
  {
    name: "Марина",
    surname: "Войтенко",
    middleName: "Сергеевна",
    birthday: new Date(2002, 3, 11),
    startYear: 2022,
    department: "Информатика",
  },
  {
    name: "Алексей",
    surname: "Петров",
    middleName: "Сергеевич",
    birthday: new Date(2005, 9, 9),
    startYear: 2018,
    department: "Программирование",
  },
];

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

// Вынес переменную в область видимости для всего кода для дальнейшей работы со списком     ---    ???!!!!!!!?????! ВОПРОС так можно делать в реальных проектах?
const studentList = document.getElementById("student-list");

function getStudentItem(studentObj) {
  const studentItem = document.createElement("tr");
  studentList.appendChild(studentItem);

  const surnameCell = document.createElement("td");
  surnameCell.textContent =
    studentObj.surname + " " + studentObj.name + " " + studentObj.middleName; // Здесь объединяю ФИО в 1 колонку
  studentItem.appendChild(surnameCell);

  const birthdayCell = document.createElement("td");
  const birthday = studentObj.birthday.toLocaleDateString();
  const age = new Date().getFullYear() - studentObj.birthday.getFullYear(); // Просчитываю возраст студентов от текущей даты отнимаю возраст
  birthdayCell.textContent = `${birthday} (${age} лет)`;
  studentItem.appendChild(birthdayCell);

  const startYearCell = document.createElement("td");
  const endYear = studentObj.startYear + 4;
  const currentYear = new Date().getFullYear();
  const course =
    endYear > currentYear ? currentYear - studentObj.startYear : "закончил";
  startYearCell.textContent = `${studentObj.startYear}-${endYear} (${
    course === "закончил" ? "закончил" : course + " курс"
  })`; // Проверка студента на года обучения с выводом настоящего курса и фразой закончил если студент выпустился
  studentItem.appendChild(startYearCell);

  const departmentCell = document.createElement("td");
  departmentCell.textContent = studentObj.department;
  studentItem.appendChild(departmentCell);

  return studentItem;
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

// Логика рендера всех студентов с использованием цикла forEach.
function renderStudentsTable(studentsArray) {
  studentList.innerHTML = "";
  studentsArray.forEach((student) => {
    const studentItem = getStudentItem(student);
    studentList.appendChild(studentItem);
  });
}
renderStudentsTable(studentsList);

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

const studentForm = document.getElementById("student-form");

// Блок с сообщением об ошибке валидации
const errorMessage = document.getElementById("error-message");
errorMessage.textContent = "";

// Валидация по кнопке
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const surNameInput = document.getElementById("surname");
  const nameInput = document.getElementById("name");
  const middleNameInput = document.getElementById("middleName");
  const birthdayInput = document.getElementById("birthday");
  const startYearInput = document.getElementById("startYear");
  const departmentInput = document.getElementById("department");

  const surname = surNameInput.value.trim();
  const name = nameInput.value.trim();
  const middleName = middleNameInput.value.trim();
  const birthday = new Date(birthdayInput.value);
  const startYear = parseInt(startYearInput.value);
  const department = departmentInput.value.trim();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const minBirthdayDate = new Date(1900, 0, 1);
  const minStartYear = 2000;

  // Переменная для валидации
  let isValid = true;
  // Переменная хранит начальное состояние текста ошибки.
  let errorMessageText = "";

  // Реализация проверок

  // На пустоту
  if (
    surname === "" ||
    name === "" ||
    middleName === "" ||
    birthday === "Invalid Date" ||
    startYear === NaN ||
    department === ""
  ) {
    isValid = false;
    errorMessageText = "Все поля обязательны для заполнения!";
  }
  // Дата рождения по диапазону
  else if (birthday < minBirthdayDate || birthday > currentDate) {
    isValid = false;
    errorMessageText =
      "Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты";
  }
  // Год начала обучения
  else if (startYear < minStartYear || startYear > currentYear) {
    isValid = false;
    errorMessageText =
      "Год начала обучения должен быть в диапазоне от 2000 до текущего года";
  }

  if (isValid) {
    const studentData = {
      surname,
      name,
      middleName,
      birthday,
      startYear,
      department,
    };

    // Добавляем нового студента в массив
    studentsList.push(studentData);

    // Рисуем в списке нового студента
    renderStudentsTable(studentsList);

    // Очистка полей формы добавления студента
    surNameInput.value = "";
    nameInput.value = "";
    middleNameInput.value = "";
    birthdayInput.value = "";
    startYearInput.value = "";
    departmentInput.value = "";

    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = errorMessageText;
  }
});

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Получаем DOM элементы по ID
const fio = document.getElementById("fio");
const birthDate = document.getElementById("birthDate");
const trainingYears = document.getElementById("trainingYears");
const faculty = document.getElementById("faculty");

// Переменная для указания направления
let sortDirection = true;

// Сортировки массива принимает 3 параметра. Массив, по какому критерию и направление сортировки.
const sortUsers = (studentsList, prop, sortDirection) =>
  studentsList.sort((a, b) =>
    sortDirection ? (a[prop] > b[prop] ? 1 : -1) : a[prop] < b[prop] ? 1 : -1
  );

// Сортировка по фамилии
fio.addEventListener("click", () => {
  sortUsers(studentsList, "surname", sortDirection);
  renderStudentsTable(studentsList);
  sortDirection = !sortDirection;
});

// Сортировка по дате рождения
birthDate.addEventListener("click", () => {
  sortUsers(studentsList, "birthDate", sortDirection);
  renderStudentsTable(studentsList);
  sortDirection = !sortDirection;
});

// Сортировка по годам обучения
trainingYears.addEventListener("click", () => {
  sortUsers(studentsList, "startYear", sortDirection);
  renderStudentsTable(studentsList);
  sortDirection = !sortDirection;
});

// Сортировка по факультету
faculty.addEventListener("click", () => {
  sortUsers(studentsList, "department", sortDirection);
  renderStudentsTable(studentsList);
  sortDirection = !sortDirection;
});

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

// Получаю 2ю форму в переменную
const filterForm = document.getElementById("filter-form");

// Функция для фильтрации
function filterStudents(student, filter) {
  return student.filter((student) => {
    const fullName = `${student.surname} ${student.name} ${student.middleName}`;
    const endYear = student.startYear + 4;
    return (
      fullName.toLowerCase().includes(filter.name.toLowerCase()) &&
      student.department
        .toLowerCase()
        .includes(filter.department.toLowerCase()) &&
      (filter.startYear ? student.startYear === filter.startYear : true) &&
      (filter.endYear ? endYear === filter.endYear : true)
    );
  });
}

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const filterName = document.getElementById("filter-name");
  const filterDepartament = document.getElementById("filter-departament");
  const filterStartYear = document.getElementById("filter-startYear");
  const filterEndYear = document.getElementById("filter-endYear");

  const filter = {
    name: filterName.value.trim(),
    department: filterDepartament.value.trim(),
    startYear: filterStartYear.value
      ? parseInt(filterStartYear.value)
      : undefined,
    endYear: filterEndYear.value ? parseInt(filterEndYear.value) : undefined,
  };

  const filteredStudentList = filterStudents(studentsList, filter);
  renderStudentsTable(filteredStudentList);
  console.log(1);
});
