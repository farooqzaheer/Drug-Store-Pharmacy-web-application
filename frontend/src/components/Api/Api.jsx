import axios from "axios";
import { useState } from "react";

const Api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getObjects = async (endPoint) => {
  const response = await Api.get(`/${endPoint}/`);
  return response.data;
};

export const getObject = async (endPoint, id) => {
  const response = await Api.get(`/${endPoint}/${id}/`);
  return response.data;
};

export const addObject = async (endPoint, modelObject) => {
  return await Api.post(`/${endPoint}/`, modelObject);
};

export const deleteObject = async (endPoint, { id }) => {
  const response = await Api.delete(`/${endPoint}/${id}/`);
  if (!response.ok) {
    throw new Error("Failed to delete");
  }
  return response.data; // Assuming your backend returns some data on deletion
};
