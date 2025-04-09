import express from 'express';
import { 
  addEmp, 
  getAllEmp, 
  getEmpById, 
  updateEmp, 
  deleteEmp 
} from './userController';

const router = express.Router();

router.post('/employees', addEmp);
router.get('/employees', getAllEmp);
router.get('/employees/:id', getEmpById);
router.put('/employees/:id', updateEmp);
router.delete('/employees/:id', deleteEmp);

export default router;