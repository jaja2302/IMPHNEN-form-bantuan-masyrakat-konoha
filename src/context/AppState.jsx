import { createContext, useContext, useReducer } from 'react';
import { isBlocked } from '../utils/storage';

const initialState = {
  currentStep: 1,
  answers: {},
  failCount: 0,
  isBlocked: false,
  blockUntil: null,
  refreshPenalty: 0,
  loyaltyStrikes: 0,
  characterClass: null,
  formRotation: 0,
  tcSecretFound: false,
  startTime: null,
  soundEnabled: true,
  agreedToTC: false,
  roulettePosition: null,
  rouletteQuestion: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.id]: action.payload.value },
      };
    case 'SET_FAIL_COUNT':
      return { ...state, failCount: action.payload };
    case 'SET_BLOCKED':
      return { ...state, isBlocked: action.payload };
    case 'SET_LOYALTY_STRIKES':
      return { ...state, loyaltyStrikes: action.payload };
    case 'SET_CHARACTER_CLASS':
      return { ...state, characterClass: action.payload };
    case 'SET_FORM_ROTATION':
      return { ...state, formRotation: action.payload };
    case 'SET_TC_SECRET_FOUND':
      return { ...state, tcSecretFound: action.payload };
    case 'SET_AGREED_TO_TC':
      return { ...state, agreedToTC: action.payload };
    case 'SET_START_TIME':
      return { ...state, startTime: action.payload };
    case 'SET_SOUND_ENABLED':
      return { ...state, soundEnabled: action.payload };
    case 'SET_ROULETTE':
      return {
        ...state,
        roulettePosition: action.payload.position,
        rouletteQuestion: action.payload.question,
      };
    case 'RESET_FORM':
      return {
        ...initialState,
        agreedToTC: state.agreedToTC,
        tcSecretFound: state.tcSecretFound,
        isBlocked: state.isBlocked,
      };
    case 'FULL_RESET':
      return { ...initialState };
    default:
      return state;
  }
}

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const blocked = isBlocked();
  const value = {
    ...state,
    isBlocked: state.isBlocked || blocked,
    dispatch,
  };
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
