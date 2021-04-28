import store from './store';
import { addNewTaskAction, changeFilter, setSearchValue } from './actions/toDo';
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

// Change filter
const filterAllButton = document.getElementById('filter-all-button');
const filterActiveButton = document.getElementById('filter-active-button');
const filterCompletedButton = document.getElementById(
  'filter-completed-button'
);

filterAllButton.addEventListener('click', () => {
  store.dispatch(changeFilter('all'));
});

filterActiveButton.addEventListener('click', () => {
  store.dispatch(changeFilter('active'));
});

filterCompletedButton.addEventListener('click', () => {
  store.dispatch(changeFilter('completed'));
});

// Set search value
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
  store.dispatch(setSearchValue(e.target.value));
});

// Elements update
const render = () => {
  // Store
  const {
    toDo: { list, filter, searchValue },
  } = store.getState();

  // Variable elements
  const toDoListEl = document.getElementById('to-do-list');
  const searchWrapperEl = document.getElementById('search-wrapper');
  const filtersWrapperEl = document.getElementById('filters-wrapper');

  // Hide elements
  if (!list.length) {
    searchWrapperEl.classList.add('hide');
    filtersWrapperEl.classList.add('hide');
  } else {
    searchWrapperEl.classList.remove('hide');
    filtersWrapperEl.classList.remove('hide');
  }

  // Delete old tasks
  while (toDoListEl.firstChild) {
    toDoListEl.removeChild(toDoListEl.firstChild);
  }

  // Render tasks
  const searchFilter = (taskObject) => {
    if (searchValue) {
      const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      };
      const newSearchValue = escapeRegExp(searchValue);
      const regExp = new RegExp(newSearchValue, 'gi');

      if (regExp.test(taskObject.value)) {
        const newTaskValue = taskObject.value.replace(
          regExp,
          (match) => `<span>${match}</span>`
        );
        const newTaskObject = Object.assign({}, taskObject);
        newTaskObject.value = newTaskValue;
        createToDoItem(newTaskObject);
      }
    } else {
      createToDoItem(taskObject);
    }
  };

  if (filter === 'all') {
    list.forEach((taskObject) => {
      searchFilter(taskObject);
    });
  } else if (filter === 'active') {
    list.forEach((taskObject) => {
      if (!taskObject.check) {
        searchFilter(taskObject);
      }
    });
  } else if (filter === 'completed') {
    list.forEach((taskObject) => {
      if (taskObject.check) {
        searchFilter(taskObject);
      }
    });
  }

  // Update active filter
  const filterButtonsList = document.querySelectorAll('.filter-button');

  filterButtonsList.forEach((button) => {
    const classList = button.classList;
    if (classList.contains(filter) && !classList.contains('current')) {
      classList.add('current');
    }

    if (!classList.contains(filter) && classList.contains('current')) {
      classList.remove('current');
    }
  });

  // Update search input value
  const searchInput = document.getElementById('search-input');

  searchInput.value = searchValue;

  // localStorage update
  localStorage.setItem('my-to-do-list', JSON.stringify(store.getState().toDo));
};

store.subscribe(render);

render();
