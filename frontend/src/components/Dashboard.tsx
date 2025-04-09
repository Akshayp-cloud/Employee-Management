import React, { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from '../types/Employee';
import { 
  getAllEmployees, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} from '../api/employeeApi';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import EmployeeDetail from './EmployeeDetail';
import Toast from './Toast';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [viewEmployeeId, setViewEmployeeId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsFormVisible(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormVisible(true);
  };

  const handleViewEmployee = (id: number) => {
    setViewEmployeeId(id);
  };

  const handleFormSubmit = async (formData: EmployeeFormData) => {
    try {
      if (selectedEmployee) {
        // Update existing employee
        await updateEmployee(selectedEmployee.id, formData);
        showToast('Employee updated successfully', 'success');
      } else {
        // Create new employee
        await createEmployee(formData);
        showToast('Employee created successfully', 'success');
      }
      
      // Refresh employee list and close form
      await fetchEmployees();
      setIsFormVisible(false);
    } catch (err) {
      showToast('Operation failed', 'error');
      console.error(err);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await deleteEmployee(id);
      await fetchEmployees();
      showToast('Employee deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete employee', 'error');
      console.error(err);
    }
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Employee Management System</h1>
      </header>

      <div className="content">
        <div className="action-bar">
          <button className="btn btn-primary add-btn" onClick={handleAddEmployee}>
            <i className="fas fa-plus"></i> Add Employee
          </button>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading employees...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchEmployees}>Retry</button>
          </div>
        ) : (
          <EmployeeList 
            employees={employees} 
            onEdit={handleEditEmployee} 
            onDelete={handleDeleteEmployee}
            onView={handleViewEmployee}
          />
        )}
      </div>

      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <EmployeeForm
              employee={selectedEmployee || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {viewEmployeeId !== null && (
        <EmployeeDetail
          employeeId={viewEmployeeId}
          onClose={() => setViewEmployeeId(null)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Dashboard;