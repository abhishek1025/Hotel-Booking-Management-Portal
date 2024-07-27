import { IconButton, Typography, Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaUserCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteRequest, getRequest } from '../../../utils/apiHandler';
import { formatImageUrl } from '../../../utils';
import AddStaffDialog from './AddStaffDialog';
import EditStaffDialog from './EditStaffDialog';

const StaffTable = () => {
  const {
    data: staffList,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await getRequest({ endpoint: '/staffs' });
      return res?.data || [];
    },
    queryKey: ['staff'],
  });

  const TABLE_HEAD = [
    'Name',
    'Email',
    'Phone',
    'Address',
    'Role',
    'Salary',
    'Status',
    'Actions',
  ];

  const toggleStaffStatus = (id) => async () => {
    const res = await deleteRequest({ endpoint: `/staffs/${id}` });

    if (res.ok) {
      toast.success(res.message);
      refetch();
      return;
    }

    toast.error(res.message);
  };

  if (isLoading) {
    return <Typography variant="h4">Loading ....</Typography>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Typography variant="h4">Staff</Typography>
        <AddStaffDialog onCreate={refetch} />
      </div>

      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-100 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => {
            const { _id, name, email, phone, address, role, salary, isActive } =
              staff;
            const isLast = index === staffList.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={_id}>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <div className="flex items-center gap-x-2">
                    <img
                      src={formatImageUrl(staff.image)}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </div>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {phone}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {address}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {role}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {salary}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color={isActive ? 'green' : 'red'}
                    className="font-normal"
                  >
                    {isActive ? 'Active' : 'Not Working'}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <div className="flex space-x-2">
                    <EditStaffDialog staffData={staff} onUpdate={refetch} />
                    {isActive ? (
                      <IconButton
                        variant="text"
                        className="text-xl"
                        color="red"
                        size="md"
                        onClick={toggleStaffStatus(_id)}
                      >
                        <FaTrash />
                      </IconButton>
                    ) : (
                      <IconButton
                        variant="text"
                        className="text-xl"
                        color="blue"
                        size="md"
                        onClick={toggleStaffStatus(_id)}
                      >
                        <FaUserCheck />
                      </IconButton>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
