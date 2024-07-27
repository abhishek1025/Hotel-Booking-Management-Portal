import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';
import { postRequest } from '../../../utils/apiHandler';
import { toast } from 'react-toastify';

const AddStaffDialog = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const defaultInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    salary: '',
    image: null,
  };
  const [formData, setFormData] = useState(defaultInfo);
  const [apiError, setApiError] = useState('');

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      setFormData(defaultInfo);
      setApiError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    try {
      const apiData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        apiData.append(key, value);
      });

      const res = await postRequest({
        endpoint: '/staffs',
        data: apiData,
      });

      if (res.ok) {
        toast.success(res.message);
        handleOpen();
        onCreate();
        return;
      }

      setApiError(res.message);
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add Staff
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Staff Member</DialogHeader>
        <DialogBody>
          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
          <form className="flex flex-col space-y-4">
            <Input
              type="text"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <Select
              label="Role"
              value={formData.role}
              onChange={handleRoleChange}
              required
            >
              <Option value="Manager">Manager</Option>
              <Option value="Receptionist">Receptionist</Option>
              <Option value="Chef">Chef</Option>
              <Option value="Housekeeping">Housekeeping</Option>
              <Option value="Security">Security</Option>
              <Option value="Maintenance">Maintenance</Option>
            </Select>
            <Input
              type="number"
              name="salary"
              label="Salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
            <Input
              type="file"
              name="image"
              label="Profile Image"
              onChange={handleFileChange}
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Add Staff
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddStaffDialog;
