const form = document.querySelector('.task-form');
document.addEventListener("DOMContentLoaded",()=> {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks) {
        storedTasks.forEach((task) => task.push);
        updateTasksList();
        
    }
})
const tasks = [];
const input = form.querySelector('input[name="task"]'); // Исправлено имя поля ввода
const saveTasks = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
const addTask = () => {
    const taskInput = document.getElementById('task-input');
    const text = taskInput.value.trim(); // Используйте .value и .trim() для получения значения

    if (text) {
        tasks.push({text: text, completed: false}); 
        updateTasksList();
        taskInput.value = ''; // Очистка поля ввода
        updateTasksList();
        saveTasks();
    }
    console.log(tasks); // Для отладки
}

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    saveTasks();
};
const editTask = (index) => {
    const taskInput = document.getElementById('task-input');
    taskInput.value = tasks[index].text;

    tasks.splice(index,1);
    updateTasksList();
    saveTasks();
}
const updateTasksList = ()=> {
    const tasksList = document.querySelector('.tasks-list');
    tasksList.innerHTML = '';

    tasks.forEach((task,index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="task-item">
        <div class="task ${task.completed ? 'completed': ''}">
            <input type="checkbox" class="checkbox"${task.completed ? "checked" : ""}>
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="./img/write 2.png" onclick="editTask(${index})">
            <img src="./img/delete 2.png"onclick="deleteTask(${index})">
        </div>
    </div>
        `;
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));
        // listItem.addEventListener("change", () => toggleTaskComplete(index));
        tasksList.appendChild(listItem);
    });
};

document.querySelector('.task-btn').addEventListener("click", function(e){
    e.preventDefault(); // Предотвращение стандартного поведения кнопки отправки формы
    addTask();
});
