import { Request, Response } from 'express';
import Employee from './userSchema';

export const getAllEmp = async (_req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error: unknown) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEmpById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json(employee);
  } catch (error: unknown) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addEmp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, designation, departmentId } = req.body;

    if (!name?.trim() || !email?.trim() || !designation?.trim() || !departmentId) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const newEmp = await Employee.create({
      name: name.trim(),
      email: email.trim(),
      designation: designation.trim(),
      departmentId,
    });

    res.status(201).json(newEmp);
  } catch (error: unknown) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateEmp = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }

    const { name, email, designation, departmentId } = req.body;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    const updatedFields: Partial<{
      name: string;
      email: string;
      designation: string;
      departmentId: number;
    }> = {};

    if (typeof name === 'string' && name.trim()) updatedFields.name = name.trim();
    if (typeof email === 'string' && email.trim()) updatedFields.email = email.trim();
    if (typeof designation === 'string' && designation.trim()) updatedFields.designation = designation.trim();
    if (typeof departmentId === 'number') updatedFields.departmentId = departmentId;

    await employee.update(updatedFields);

    res.status(200).json(employee);
  } catch (error: unknown) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEmp = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
