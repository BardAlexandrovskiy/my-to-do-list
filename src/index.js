import store from './store';
import { addNewTaskAction } from './actions/toDo';
import createToDoItem from './components/toDoItem';

// Create new task
const addNewTaskInput = document.getElementById('add-new-task-input');
const addNewTaskButton = document.getElementById('add-new-task-button');
const tasksWrapper = document.querySelector('.to-do-list-wrapper');

const addNewTask = () => {
  if (addNewTaskInput.value.trim()) {
    store.dispatch(addNewTaskAction(addNewTaskInput.value));
    addNewTaskInput.value = '';
    addNewTaskInput.blur();
    tasksWrapper.scrollTop = tasksWrapper.scrollHeight;
  }
};

addNewTaskInput.addEventListener('keydown', (key) => {
  if (key.keyCode === 13) {
    addNewTask();
  }
});

addNewTaskButton.addEventListener('click', () => {
  addNewTask();
});

// Elements update
const render = () => {
  // Store
  const {
    toDo: { list },
  } = store.getState();

  // ELements
  const toDoListEl = document.getElementById('to-do-list');
  const searchWrapperEl = document.getElementById('search-wrapper');

  // Search
  if (!list.length) {
    searchWrapperEl.classList.add('hide');
  } else {
    searchWrapperEl.classList.remove('hide');
  }

  // Delete old tasks
  while (toDoListEl.firstChild) {
    toDoListEl.removeChild(toDoListEl.firstChild);
  }

  // Render new tasks
  list.forEach((taskObject) => {
    createToDoItem(taskObject);
  });

  // localStorage update
  localStorage.setItem('my-to-do-list', JSON.stringify(store.getState()));
};

store.subscribe(render);

render();
