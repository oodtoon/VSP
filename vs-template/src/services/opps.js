import axios from "axios";
import dayjs from "dayjs";
const baseUrl = "http://localhost:3001/api/opps";

const deserialize = (task) => ({ ...task, date: dayjs(task.date) });

const serialize = (task) => {
  return {
    ...task,
    date: `${task.date.$M + 1}-${task.date.$D}-${task.date.$y}`,
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

export default {
  getAll,
  create,
  updateStatus,
  createTask,
};
