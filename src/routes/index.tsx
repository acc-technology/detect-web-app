import { Navigate, createBrowserRouter } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import DetectPage from '../pages/DetectPage';
import HistoryPage from '../pages/HistoryPage';
import MapPage from '../pages/MapPage';
import UploadPage from '../pages/UploadPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    errorElement: <Navigate to="/upload" />,
    children: [
      { index: true, element: <Navigate to="/upload" /> },
      { path: 'upload', element: <UploadPage /> },
      { path: 'detect/:imageId', element: <DetectPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'map', element: <MapPage /> },
    ],
  },
]);

export default router;
