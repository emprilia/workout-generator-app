import { createContext, useContext } from 'react';
import { AppState } from './AppState.state';

const AppStateContext = createContext<AppState | null>(null);

export const useAppStateContext = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('App State Context is not available');
    }
    return context;
};

interface AppStateProviderProps {
    children: React.ReactNode;
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
    const appState = new AppState();

    return (
        <AppStateContext.Provider value={appState}>
            {children}
        </AppStateContext.Provider>
    );
};