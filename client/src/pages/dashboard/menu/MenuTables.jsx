import { IconButton, Typography } from '@material-tailwind/react';
import { FaTrash } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { deleteRequest, getRequest } from '../../../utils'; // Adjust import paths as needed
import { useQuery } from '@tanstack/react-query';
import AddMenuItemDialog from './AddMenuItemDialog';
import EditMenuItemDialog from './EditMenuItemDialog';

const MenuItemsTable = () => {
  const {
    data: menuItems,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await getRequest({
        endpoint: '/menu-items',
      });

      return res?.data || [];
    },
    queryKey: ['menuItems'],
  });

  const TABLE_HEAD = ['Name', 'Category', 'Price', 'Action'];

  const deleteMenuItem = (id) => async () => {
    const res = await deleteRequest({
      endpoint: `/menu-items/${id}`,
    });

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
        <Typography variant="h4">Menu Items</Typography>
        <AddMenuItemDialog onCreate={refetch} />
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
          {menuItems.map((item, index) => {
            const { name, category, price, _id } = item;
            const isLast = index === menuItems.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={index}>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {category}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    NPR {price}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <div className="flex space-x-2">
                    <EditMenuItemDialog
                      menuItemData={item}
                      onUpdate={refetch}
                    />
                    <IconButton
                      variant="text"
                      className="text-xl"
                      color="red"
                      size="md"
                      onClick={deleteMenuItem(_id)}
                    >
                      <FaTrash />
                    </IconButton>
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

export default MenuItemsTable;
