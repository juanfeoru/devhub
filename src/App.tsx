import { Route, Routes } from 'react-router';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' />
        <Route path='/resources' />
        <Route path='/favorites' />
        <Route path='/categories' />
      </Route>
    </Routes>
  );
}

export default App;
