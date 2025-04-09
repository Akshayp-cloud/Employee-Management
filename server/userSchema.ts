// models/Employee.ts
import { DataTypes } from 'sequelize';
import db from './postgres';

const Employee = db.define('Employee', {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'employee',
  timestamps: false,
});

export default Employee;
