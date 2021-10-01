import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { isLoggedInVar, tokenVar } from "../apollo";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { EditProfile } from "../pages/common/editProfile";
import PodcastDetail from "../pages/common/podcastDetail";
import Podcast from "../pages/common/podcasts";
import { CreateEpisode } from "../pages/host/add-episode";
import { CreatePodcast } from "../pages/host/create-podcast";
import { EditPodcast } from "../pages/host/edit-podcast";
import { UserRole } from "../__generated__/globalTypes";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Podcast />
  </Route>,
  <Route key={2} path="/podcast/:id">
    <PodcastDetail />
  </Route>
]

const HostRoutes = [
  {path:"/edit-podcast/:id", component: <EditPodcast />},
  {path:"/add-episode/:id", component: <CreateEpisode />},
  { path: "/add-podcast", component: <CreatePodcast /> },
]

const commonRoutes = [
  { path: "/edit-profile", component: <EditProfile /> },
];

export const LoggedInRoute = () => {
  const {loading, error, data} = useMe()
  if(loading || error || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-widest">Loading...</span>
      </div>
    )
  }
  return (
    <Router>
      <Header />
      <Switch>
        {ClientRoutes}
        {data.me.role === UserRole.Host &&
          HostRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}

      </Switch>
    </Router>
  )
//   return (<Router>
//     <Switch>
//       <Route exact path="/">
//         <div>you are logged in</div>
//         <button
//           className="p-2 bg-yellow-500 rounded"
//           onClick={() => {
//             localStorage.removeItem(LOCALSTORAGE_TOKEN);
//             tokenVar("");
//             isLoggedInVar(false);
//           }}
//         >
//           log out
//         </button>
//       </Route>
//     </Switch>
//   </Router>
// )
}
