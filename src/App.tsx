import { Route, Routes } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import ResourcesPage from './pages/ResourcesPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' />
        <Route path='/resources' element={<ResourcesPage />} />
        <Route path='/favorites' />
        <Route path='/categories' />
      </Route>
    </Routes>
  );
}

export default App;
