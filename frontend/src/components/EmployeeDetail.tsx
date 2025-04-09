import React, { useState, useEffect } from 'react';
import { Employee } from '../types/Employee';
import { getEmployeeById } from '../api/employeeApi';

interface EmployeeDetailProps {
  employeeId: number;
  onClose: () => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employeeId, onClose }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const data = await getEmployeeById(employeeId);
        setEmployee(data);
        setError(null);
      } catch (err) {
        setError('Failed to load employee details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

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

  if (loading) {
    return (
      <div className="employee-detail-modal">
        <div className="employee-detail-content">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="employee-detail-modal">
        <div className="employee-detail-content">
          <h2>Error</h2>
          <p>{error || 'Employee not found'}</p>
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-detail-modal">
      <div className="employee-detail-content">
        <div className="modal-header">
          <h2>Employee Details</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="employee-info">
          <div className="avatar">
            <div className="avatar-circle">
              {employee.name.substring(0, 2).toUpperCase()}
            </div>
          </div>
          
          <div className="info-container">
            <div className="info-row">
              <span className="info-label">ID:</span>
              <span className="info-value">{employee.id}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{employee.name}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{employee.email}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Designation:</span>
              <span className="info-value">{employee.designation}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Department:</span>
              <span className="info-value">{getDepartmentName(employee.departmentId)}</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;