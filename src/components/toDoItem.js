import { deleteTaskAction, toggleTaskAction } from '../actions/toDo';
import { toggleLockScreen } from '../functions';
import store from '../store';

const createToDoItem = (taskObject) => {
  const { value, check, id } = taskObject;
  const toDoListEl = document.getElementById('to-do-list');

  // Create li
  const task = document.createElement('li');
  task.className = `to-do-item ${check ? ' checked' : ''}`;
  task.setAttribute('id', id);
  toDoListEl.appendChild(task);

  // Create check button
  const checkButton = document.createElement('div');
  checkButton.className = 'check-button';
  const checkButtonIcon = document.createElement('i');
  checkButtonIcon.className = 'fa fa-check';
  checkButton.setAttribute('aria-hidden', true);
  checkButton.appendChild(checkButtonIcon);
  task.appendChild(checkButton);

  // Create value container
  const valueContainer = document.createElement('div');
  valueContainer.className = 'value';
  valueContainer.textContent = value;
  task.appendChild(valueContainer);

  // Create delete button
  const deleteButton = document.createElement('div');
  deleteButton.className = 'delete-button';
  const deleteButtonIcon = document.createElement('i');
  deleteButtonIcon.className = 'fas fa-times';
  deleteButton.setAttribute('aria-hidden', true);
  deleteButton.appendChild(deleteButtonIcon);
  task.appendChild(deleteButton);

  // Functions
  const toggleItem = () => {
    toggleLockScreen();
    task.classList.toggle('checked');
    checkButton.addEventListener('transitionend', () => {
      store.dispatch(toggleTaskAction(id));
      toggleLockScreen();
    });
  };
  const deleteItem = () => {
    toggleLockScreen();
    task.classList.add('delete');
    task.addEventListener('transitionend', () => {
      store.dispatch(deleteTaskAction(id));
      toggleLockScreen();
    });
  };

  // Events
  checkButton.addEventListener('click', toggleItem);
  deleteButton.addEventListener('click', deleteItem);
};

export default createToDoItem;
