let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

const form = document.getElementById("studentForm");

// ADD or UPDATE student
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    regNo: document.getElementById("regNo").value,
    course: document.getElementById("course").value,
    email: document.getElementById("email").value,
    attendance: [],
    grades: [],
    schedule: [],
  };

  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }

  localStorage.setItem("students", JSON.stringify(students));

  form.reset();
  displayStudents();
});

// DISPLAY students
function displayStudents(data = students) {
  const list = document.getElementById("studentList");
  list.innerHTML = "";
data.forEach((student, index) => {
  list.innerHTML += `
    <tr>
      <td>${student.name}</td>
      <td>${student.regNo}</td>
      <td>${student.course}</td>
      <td>${student.email}</td>
      <td>${student.attendance ? student.attendance.length : 0} days</td>
      <td>${student.grades ? student.grades.join(", ") : "-"}</td>
      <td>
        <button class="edit" onclick="editStudent(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>
  `;
});
}

// DELETE
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

// EDIT
function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("regNo").value = student.regNo;
  document.getElementById("course").value = student.course;
  document.getElementById("email").value = student.email;

  editIndex = index;
}

function markAttendance() {
  const reg = document.getElementById("attendanceReg").value;

  const student = students.find(s => s.regNo === reg);

  if (student) {
    const today = new Date().toLocaleDateString();
    student.attendance.push(today);

    localStorage.setItem("students", JSON.stringify(students));
    alert("✅ Attendance marked!");
  } else {
    alert("❌ Student not found");
  }
}

function addGrade() {
  const reg = document.getElementById("gradeReg").value;
  const grade = document.getElementById("gradeValue").value;

  const student = students.find(s => s.regNo === reg);

  if (student) {
    student.grades.push(grade);

    localStorage.setItem("students", JSON.stringify(students));
    alert("✅ Grade added!");
  } else {
    alert("❌ Student not found");
  }
}
``
function addSchedule() {
  const reg = document.getElementById("scheduleReg").value;
  const sched = document.getElementById("scheduleText").value;

  const student = students.find(s => s.regNo === reg);

  if (student) {
    student.schedule.push(sched);

    localStorage.setItem("students", JSON.stringify(students));
    alert("✅ Schedule added!");
  } else {
    alert("❌ Student not found");
  }
}
``


// SEARCH
document.getElementById("search").addEventListener("input", function(e) {
  const value = e.target.value.toLowerCase();

  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(value) ||
    student.regNo.toLowerCase().includes(value)
  );

  displayStudents(filtered);
});

// INITIAL LOAD
displayStudents();
