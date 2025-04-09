import axios from 'axios';
import { Employee, EmployeeFormData } from '../types/Employee';

const API_URL = 'http://localhost:5000/api';

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await axios.get(`${API_URL}/employees/${id}`);
  return response.data;
};

export const createEmployee = async (employee: EmployeeFormData): Promise<Employee> => {
  const response = await axios.post(`${API_URL}/employees`, employee);
  return response.data;
};

export const updateEmployee = async (id: number, employee: Partial<EmployeeFormData>): Promise<Employee> => {
  const response = await axios.put(`${API_URL}/employees/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/employees/${id}`);
};
