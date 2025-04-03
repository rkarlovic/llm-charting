import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Terms from './Terms';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path = "/" element = {<Register />} />
            <Route path="/terms" element={<Terms />} />
        </Routes>
    );
};

export default AppRoutes;