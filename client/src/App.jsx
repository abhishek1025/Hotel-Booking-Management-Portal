import { Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<div>Hello World</div>} />
    </Routes>
  );
};

export default App;

