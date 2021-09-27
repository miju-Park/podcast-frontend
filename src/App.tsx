import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import { LoggedInRoute } from "./routes/loggedIn";
import { LoggedOutRoute } from "./routes/loggedOut";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="font-mono">
      {isLoggedIn ? <LoggedInRoute /> : <LoggedOutRoute />}
    </div>
  );
}
