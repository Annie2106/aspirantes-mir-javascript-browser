let tasks = [];

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function createTaskElement(id, title, completed) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const deleteButton = document.createElement('button');

  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.checked = completed;
  checkbox.addEventListener('change', handleCheckTask);

  label.setAttribute('for', id);
  label.textContent = title;

  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', handleDelete);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask(event) {
  event.preventDefault();

  const input = document.getElementById('taskIn');
  const title = input.value.trim();

  if (title === '') {
    return;
  }

  const id = generateId();
  const completed = false;

  const listItem = createTaskElement(id, title, completed);
  const list = document.getElementById('taskList');
  list.appendChild(listItem);

  tasks.push({
    id,
    title,
    completed
  });

  input.value = '';
}

function handleCheckTask(event) {
  const checkbox = event.target;
  const listItem = checkbox.parentNode;
  const label = listItem.querySelector('label');
  const taskId = checkbox.id;

  listItem.classList.toggle('is-completed');
  label.classList.toggle('is-completed');

  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
  });
}

function handleDelete(event) {
  const deleteButton = event.target;
  const listItem = deleteButton.parentNode;
  const list = listItem.parentNode;
  const taskId = listItem.querySelector('input').id;

  list.removeChild(listItem);

  tasks = tasks.filter((task) => task.id !== taskId);
}

function deleteAllDone() {
  const list = document.getElementById('taskList');

  tasks = tasks.filter((task) => !task.completed);

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  tasks.forEach((task) => {
    const listItem = createTaskElement(task.id, task.title, task.completed);
    list.appendChild(listItem);
  });
}

function filterTasks(filter) {
  const list = document.getElementById('taskList');

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  let filteredTasks = [];

  if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filter === 'uncompleted') {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else {
    filteredTasks = tasks;
  }

  filteredTasks.forEach((task) => {
    const listItem = createTaskElement(task.id, task.title, task.completed);
    list.appendChild(listItem);
  });
}

