import useSetState from "react-use/lib/useSetState";
import { createContainer } from "unstated-next";
import firebase from "firebase";
import { UserStatistics } from "../services/api/Client";

interface AppState {
  user: firebase.User;
  stats: UserStatistics;
}

const useAppState = () => {
  const [appState, setAppState] = useSetState<AppState>();

  return {
    appState,
    setAppState,
  };
};

export const AppContainer = createContainer(useAppState);
