import React from 'react';
import { Employee } from '../types/Employee';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ 
  employees, 
  onEdit, 
  onDelete,
  onView
}) => {
  const getDepartmentName = (departmentId: number): string => {
    const departments: Record<number, string> = {
      1: 'Engineering',
      2: 'Marketing',
      3: 'Sales',
      4: 'Human Resources',
      5: 'Customer Support'
    };
    
    return departments[departmentId] || 'Unknown Department';
  };

  return (
    <div className="employee-list">
      <h2>Employees</h2>
      
      {employees.length === 0 ? (
        <div className="no-employees">No employees found</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id} className="fadeIn">
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.designation}</td>
                  <td>{getDepartmentName(employee.departmentId)}</td>
                  <td className="actions">
                    <button 
                      className="btn-view" 
                      onClick={() => onView(employee.id)}
                      aria-label="View details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="btn-edit" 
                      onClick={() => onEdit(employee)}
                      aria-label="Edit employee"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this employee?')) {
                          onDelete(employee.id);
                        }
                      }}
                      aria-label="Delete employee"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;