import { FaUsers } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { IoAddOutline, IoHomeOutline } from 'react-icons/io5';
import { MdArticle, MdDashboard } from 'react-icons/md';

export const SIDEBAR_LINKS = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <MdDashboard className="h-5 w-5" />,
  },

  {
    name: 'Bookings',
    path: '/dashboard/bookings',
    icon: <HiShoppingCart className="h-5 w-5" />,
  },

  {
    name: 'Rooms',
    path: '/dashboard/rooms',
    icon: <MdDashboard className="h-5 w-5" />,
  },

  {
    name: 'Menu Items',
    path: '/dashboard/menu-items',
    icon: <IoAddOutline className="h-5 w-5" />,
  },

  {
    name: 'Staffs',
    path: '/dashboard/staffs',
    icon: <FaUsers className="h-5 w-5" />,
  },
  {
    name: 'Feedbacks',
    path: '/dashboard/feedbacks',
    icon: <MdArticle className="h-5 w-5" />,
  },
];
