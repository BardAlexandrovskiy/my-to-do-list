import store from './store';
import { addNewTaskAction } from './actions/toDo';
import createToDoItem from './components/toDoItem';

// Create new task
const addNewTaskInput = document.getElementById('add-new-task-input');
const addNewTaskButton = document.getElementById('add-new-task-button');

const addNewTask = () => {
  if (addNewTaskInput.value.trim()) {
    store.dispatch(addNewTaskAction(addNewTaskInput.value));
    addNewTaskInput.value = '';
    addNewTaskInput.blur();
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

  // Delete old tasks
  while (toDoListEl.firstChild) {
    toDoListEl.removeChild(toDoListEl.firstChild);
  }

  // Render new tasks
  list.forEach((taskObject) => {
    createToDoItem(taskObject);
  });

  // Search
  if (!list.length) {
    searchWrapperEl.classList.add('hide');
  } else {
    searchWrapperEl.classList.remove('hide');
  }
};

store.subscribe(render);

render();
