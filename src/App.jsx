import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppState } from './context/AppState';
import LandingPage from './components/LandingPage';
import FormContainer from './components/FormContainer';
import CooldownScreen from './components/CooldownScreen';
import HallOfFame from './components/HallOfFame';

export default function App() {
  const { isBlocked, agreedToTC } = useAppState();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cooldown" element={<CooldownScreen />} />
      <Route path="/hall-of-fame" element={<HallOfFame />} />
      <Route
        path="/form"
        element={
          isBlocked ? (
            <Navigate to="/cooldown" replace />
          ) : !agreedToTC ? (
            <Navigate to="/" replace />
          ) : (
            <FormContainer />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
