import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardLayout } from './layouts';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<div>Dashboard</div>} />
      </Route>
    </Routes>
  );
};

export default App;
