import {
  apiDeleteStudents,
  getStudents,
  getStudents2,
  getSingleStudent,
  apiPostStudent,
  apiPutStudent,
} from "./api-calls.js";
const url = "https://63000b629350a1e548e9abfc.mockapi.io/api/v1/students";

const selectSortBy = document.querySelector("select");
const addStudentBtn = document.getElementById("add-student");
// --------------- Spinner ---------------
const bsSpinner = document.getElementById("spinner");
// --------------- Search ---------------
const searchInput = document.getElementById("search");
const searchGlassIcon = document.getElementById("search-glass");
const clearIcon = document.getElementById("clear");
// --------------- Modal ---------------
// const myModalEl = document.getElementById("myModal");
const modalForm = document.getElementById("modalForm");
const delConfirmTxt = document.getElementById("delete-confirmation-text");
const liveToast = document.getElementById("liveToast");
const tableBody = document.querySelector("tbody");
const submitBtn = document.querySelector("#submit");
const modalTitle = document.querySelector(".modal-header h1");
const modalBody = document.querySelector("#myModal .modal-body");
const modalFooter = document.querySelector("#myModal .modal-footer");

window.deleteStudent = deleteStudent;
window.editStudent = editStudent;
window.infoStudent = infoStudent;

let students = [];
let editMode = false;
let selectedStudentId = null;

// async function initApp() {
function initApp() {
  //   bsSpinner.classList.add("d-none");
  //   bsSpinner.classList.remove("d-none");
  bsSpinner.classList.toggle("d-none");

  //   const data = await getStudents();
  //   const data2 = await getStudents2();

  //   getStudents2().then((d) => console.log(d));
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       bsSpinner.classList.toggle("d-none");
  //       students = data;
  //       createStudents(students);
  //     });
  getStudents().then((data) => {
    bsSpinner.classList.toggle("d-none");
    students = data;
    createStudents(students);
  });
  //   setTimeout(() => {}, 2000);

  //   bsSpinner.classList.add("d-none");

  //   getStudents().then((data) => console.log(data));
}

initApp();

function createStudents(students) {
  tableBody.innerHTML = "";

  if (!students.length) {
    // if(!0){}
    tableBody.innerHTML = `
          <tr>
              <td colspan="8">No data found!</td>
          </tr>
      `;
    return;
  }

  for (let student of students) {
    createSingleStudent(student);
  }
}

function createSingleStudent({ id, fname, lname, age, avatar, email, github }) {
  //   const { id, fname, lname, age, avatar, email, github } = student;
  const studentEl = `
            <tr>
                <td>${id}</td>
                <td>
                    <img src="${avatar}" alt="" />
                </td>
                <td>${fname}</td>
                <td>${lname}</td>
                <td>${age}</td>
                <td>${email}</td>
                <td>${github}</td>
                <td>
                <button id="edit" onclick="editStudent(${id})" type="button" class="btn btn-secondary">
                    <i class="bi bi-pencil"></i>
                </button>
                <button id="delete" onclick="deleteStudent(${id})" type="button" class="btn btn-danger">
                    <i class="bi bi-trash"></i>
                </button>
                <button id="info" onclick="infoStudent(${id})" type="button" class="btn btn-primary">
                    <i class="bi bi-info-circle-fill"></i>
                </button>
                </td>
            </tr>
  `;

  tableBody.innerHTML += studentEl;
}

function toggleModal(text, state, attr) {
  const inputElements = modalForm.querySelectorAll("input");

  [...inputElements].forEach((el) =>
    attr ? el.setAttribute("disabled", true) : el.removeAttribute("disabled")
  );

  modalTitle.innerHTML = text;
  const myModalEl = document.getElementById("myModal");
  const modal = bootstrap.Modal.getOrCreateInstance(myModalEl);

  if (state) {
    modal.show();
  } else {
    modal.hide();
  }
}

addStudentBtn.addEventListener("click", () => {
  modalForm.reset();
  //   [...modalForm.querySelectorAll("input")].forEach((el) => (el.value = ""));

  modalFooter.innerHTML = "";
  toggleModal("Add new student", true, false);
  submitBtn.classList.remove("d-none");
});

selectSortBy.addEventListener("change", (e) => {
  console.log(e.target.value);
});

function deleteStudent(id) {
  apiDeleteStudents(id).then((d) => {
    initApp();
  });
  console.log("deleting", id);
}

function infoStudent(id) {
  toggleModal("Student Information", true, true);

  getSingleStudent(id).then((student) => {
    const { fname, lname, email, age, avatar, github } = student;

    // modalForm.avatar.value = avatar;
    modalForm.fname.value = fname;
    modalForm.lname.value = lname;
    modalForm.age.value = age;
    // modalForm.email.value = email;
    modalForm.github.value = github;
  });

  submitBtn.classList.add("d-none");
  modalFooter.innerHTML = "";
}

function editStudent(id) {
  editMode = true;
  selectedStudentId = id;
  toggleModal(`Edit student with id ${id}`, true, false);
  getSingleStudent(id).then((student) => {
    const { fname, lname, email, age, avatar, github } = student;

    modalForm.avatar.value = avatar;
    modalForm.fname.value = fname;
    modalForm.lname.value = lname;
    modalForm.age.value = age;
    modalForm.email.value = email;
    modalForm.github.value = github;
  });

  modalFooter.innerHTML = "";
  submitBtn.classList.remove("d-none");
}

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   const inputElements = e.target.querySelectorAll("input");
  const inputElements = modalForm.querySelectorAll("input");

  console.log(inputElements);
  //   const formData = {
  //     fname: inputElements[0].value,
  //     lname: inputElements[1].value,
  //     age: inputElements[2].value,
  //     email: inputElements[3].value,
  //     github: inputElements[4].value,
  //     avatar: inputElements[5].value,
  //   };

  //   console.log(formData);

  const formData = {};

  //   for (const child of inputElements) {
  //     formData[child.id] = child.value;
  //   }

  [...inputElements].forEach((child) => (formData[child.id] = child.value));
  console.log(formData);

  const fieldsNotEmpty = [...inputElements].every(
    (el) => el.value.trim() !== ""
  );

  if (fieldsNotEmpty) {
    if (editMode) {
      apiPutStudent(selectedStudentId, formData).then((d) => {
        console.log("Student has been updated successfully!");
        initApp();
        editMode = false;
        selectedStudentId = null;
      });
    } else {
      apiPostStudent(formData).then((d) => {
        console.log("New student has been added successfully!");
        initApp();
      });
    }
  } else {
    console.log("Fill out the inputs");
  }

  toggleModal("", false, false);
});
