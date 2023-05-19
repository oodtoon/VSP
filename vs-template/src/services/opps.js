import axios from "axios";
import dayjs from "dayjs";
import { serializeDayJsDate } from "../utils/serialize";
const baseUrl = "http://localhost:3001/api/opps";
const taskUrl = "http://localhost:3001/api/tasks"

const deserialize = (task) => ({ ...task, date: dayjs(task.date) });

const serialize = (task) => {
  return {
    ...task,
    date: serializeDayJsDate(task.date),
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .then((opps) =>
      opps.map((opp) => ({
        ...opp,
        tasks: opp.tasks.map(deserialize),
      }))
    );
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const update = async (newObject, id) => {
  const response = await axios.patch(`${baseUrl}/${id}`, newObject)
  return response.data
}

const removeOpp = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const updateStatus = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.opp}/tasks`, newObject);
  return response.data;
};

const createTask = async (newObject) => {
  const response = await axios.post(
    `${baseUrl}/${newObject.opp}/tasks`,
    serialize(newObject)
  );
  return response.data;
};

const removeTask = async (id) => {
  const response = await axios.delete(`${taskUrl}/${id}`)
  return response.data
}

export default {
  getAll,
  create,
  update,
  updateStatus,
  createTask,
  removeOpp,
  removeTask
};
