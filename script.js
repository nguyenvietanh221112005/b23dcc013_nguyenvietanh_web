class Student {
    constructor(id, fullName, gender, dob, hometown) {
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManagement {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    }

    saveData() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    addStudent(student) {
        this.students.push(student);
        this.saveData();+
        this.displayStudents();
    }

    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.saveData();
        this.displayStudents();
    }

    updateStudent(updatedStudent) {
        const index = this.students.findIndex(student => student.id === updatedStudent.id);
        if (index !== -1) {
            this.students[index] = updatedStudent;
            this.saveData();
            this.displayStudents();
        }
    }

    displayStudents() {
        const tbody = document.querySelector('#studentTable tbody');
        tbody.innerHTML = '';
        this.students.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.fullName}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="editStudent('${student.id}')">Sửa</button>
                    <button onclick="deleteStudent('${student.id}')">Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

const studentManagement = new StudentManagement();
studentManagement.displayStudents();

function addStudent() {
    const id = document.getElementById('studentId').value;
    const fullName = document.getElementById('fullName').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('hometown').value;

    const student = new Student(id, fullName, gender, dob, hometown);
    studentManagement.addStudent(student);
    clearForm();
}

function deleteStudent(id) {
    studentManagement.deleteStudent(id);
}

function editStudent(id) {
    const student = studentManagement.students.find(student => student.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('fullName').value = student.fullName;
        document.getElementById('gender').value = student.gender;
        document.getElementById('dob').value = student.dob;
        document.getElementById('hometown').value = student.hometown;
    }
}

function updateStudent() {
    const id = document.getElementById('studentId').value;
    const fullName = document.getElementById('fullName').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('hometown').value;

    const updatedStudent = new Student(id, fullName, gender, dob, hometown);
    studentManagement.updateStudent(updatedStudent);
    clearForm();
}

function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('gender').value = 'Nam';
    document.getElementById('dob').value = '';
    document.getElementById('hometown').value = '';
}
