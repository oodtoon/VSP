import axios from "axios";
import dayjs from "dayjs";
import { serializeDayJsDate } from "../utils/serialize";

const oppsURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/opps"
    : `${process.env.SERVER_URL}/api/opps`;
    
const taskUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/tasks"
    : `${process.env.SERVER_URL}/api/taks`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const deserialize = (task) => ({ ...task, date: dayjs(task.date) });

const serialize = (task) => {
  return {
    ...task,
    date: serializeDayJsDate(task.date),
  };
};

const getAll = () => {
  const request = axios.get(oppsURL);
  return request
    .then((response) => response.data)
    .then((opps) =>
      opps.map((opp) => ({
        ...opp,
        tasks: opp.tasks.map(deserialize),
      }))
    );
};

const getOpp = async (id) => {
  const response = await axios.get(`${oppsURL}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(oppsURL, newObject, config);
  return response.data;
};

const update = async (newObject, id) => {
  const response = await axios.patch(`${oppsURL}/${id}`, newObject);
  return response.data;
};

const updateFullOpp = async (newObject, id) => {
  const response = await axios.put(`${oppsURL}/${id}`, newObject);
  return response.data;
};

const removeOpp = async (id) => {
  const response = await axios.delete(`${oppsURL}/${id}`);
  return response.data;
};

const updateStatus = async (newObject) => {
  const response = await axios.put(
    `${oppsURL}/${newObject.opp}/tasks`,
    newObject
  );
  return response.data;
};

const createTask = async (newObject) => {
  const response = await axios.post(
    `${oppsURL}/${newObject.opp}/tasks`,
    serialize(newObject)
  );
  return response.data;
};

const removeTask = async (id) => {
  const response = await axios.delete(`${taskUrl}/${id}`);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
  updateStatus,
  createTask,
  removeOpp,
  removeTask,
  setToken,
  updateFullOpp,
  getOpp,
};
