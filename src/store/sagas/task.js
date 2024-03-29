//crear una llamada a una api de tareas, debe crear una tearea en una base de datos
//y lo que devolveremos del sagas es la lista filtrada con el elemento nuevo incluido

//para borrar al contrario, se hace la llamada con el id de la tarea y , lo que hace es , devolver todas las tareas menos la eliminada

import * as types from '../actions/actionTypes';

import { TodoistApi } from "@doist/todoist-api-typescript";
import { put, takeLatest } from 'redux-saga/effects';

import { getListProjectsSuccess, getListProjectsFailed, getListTaskSuccess, getListTaskFailed, deleteTaskSuccess, deleteTaskFailed } from '../actions/task';



// Función para obtener y mostrar los proyectos
function* getProjectsSaga() {
  // Utiliza el token de autenticación de config
  const todoistToken = process.env.REACT_APP_TODOIST_TOKEN;

  const api = new TodoistApi(todoistToken);
  try {
    const projects = yield api.getProjects();
    yield put(getListProjectsSuccess(projects));
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    yield put(getListProjectsFailed(error));
  }
}


function* addTask(action) {
  const todoistToken = process.env.REACT_APP_TODOIST_TOKEN;
  const { selectedProjectId, text } = action.payload;
  const api = new TodoistApi(todoistToken);

  try {
    yield api.addTask({ content: `${text}`, projectId: `${selectedProjectId}` });
    alert('La tarea ha sido añadida correctamente');
    const listTasks = yield api.getTasks();
    yield put(getListTaskSuccess(listTasks));
  } catch (error) {
    alert(error);
  }
}

function* getTaskSaga(action){
  const todoistToken = process.env.REACT_APP_TODOIST_TOKEN;
  // const {  } = action.payload;
  const api = new TodoistApi(todoistToken);

  try{
    const listTasks = yield api.getTasks();
    yield put(getListTaskSuccess(listTasks));
  } catch(error){
    yield put(getListTaskFailed(error));
  }


}

function* deleteTaskSaga(action){
  const todoistToken = process.env.REACT_APP_TODOIST_TOKEN;
   const { idTask } = action.payload;
  const api = new TodoistApi(todoistToken);

  try{
    yield api.closeTask(idTask);
    alert('La tarea ha sido Eliminada correctamente');
    yield put(deleteTaskSuccess(idTask));
  } catch(error){
    yield put(deleteTaskFailed(error));
  }


}



function* tasksagas() {
  yield takeLatest(types.GET_LIST_PROJECTS_START, getProjectsSaga);
  yield takeLatest(types.ADD_TASK, addTask);
  yield takeLatest(types.GET_TASK_LIST_START, getTaskSaga);
  yield takeLatest(types.DELETE_TASK, deleteTaskSaga)
}

export default tasksagas;
