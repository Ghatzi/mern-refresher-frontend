import { Route, Routes } from 'react-router-dom';
import DashLayout from './components/DashLayout';
import Layout from './components/Layout';
import Public from './components/Public';
import { ROLES } from './config/roles';
import Login from './features/auth/Login';
import PersistLogin from './features/auth/PersistLogin';
import Prefetch from './features/auth/Prefetch';
import RequireAuth from './features/auth/RequireAuth';
import Welcome from './features/auth/Welcome';
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNote';
import NotesList from './features/notes/NotesList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import UsersList from './features/users/UsersList';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Dan D. Repairs');

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* end private routes */}
      </Route>
    </Routes>
  );
}

export default App;
