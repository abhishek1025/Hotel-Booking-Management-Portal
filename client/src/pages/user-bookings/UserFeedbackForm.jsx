import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Typography,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { getRequest, postRequest } from '../../utils/apiHandler';

const UserFeedbackForm = () => {
  const [formData, setFormData] = useState({
    room: '',
    rating: '',
    comment: '',
  });
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRequest({ endpoint: '/rooms' });
        if (response.ok) {
          setRooms(response.data);
        } else {
          setError('Failed to fetch rooms');
        }
      } catch (error) {
        setError('An error occurred while fetching rooms');
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await postRequest({
        endpoint: '/feedbacks',
        data: formData,
      });

      if (response.ok) {
        toast.success('Feedback submitted successfully!');
        setFormData({ room: '', rating: '', comment: '' });
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(
        'An error occurred while submitting your feedback. Please try again.'
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-[110px]">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      {error && <Typography className="text-red-500 mb-4">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Select
            name="room"
            label="Room Number"
            value={formData.room}
            onChange={(value) => {
              handleChange({
                target: {
                  name: 'room',
                  value: value,
                },
              });
            }}
            required
          >
            {rooms.map((room) => (
              <Option key={room._id} value={room._id}>
                {room.roomNumber}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <Select
            name="rating"
            label="Rating"
            value={formData.rating}
            onChange={(value) => {
              handleChange({
                target: {
                  name: 'rating',
                  value: value,
                },
              });
            }}
            required
          >
            <Option value="1">1 - Poor</Option>
            <Option value="2">2 - Fair</Option>
            <Option value="3">3 - Good</Option>
            <Option value="4">4 - Very Good</Option>
            <Option value="5">5 - Excellent</Option>
          </Select>
        </div>
        <div className="mb-4">
          <Textarea
            name="comment"
            label="Comment"
            value={formData.comment}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <Button type="submit" variant="gradient" color="blue">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default UserFeedbackForm;
