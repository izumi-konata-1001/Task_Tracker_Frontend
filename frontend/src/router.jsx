import { createBrowserRouter,Navigate } from 'react-router-dom';

import Home from './pages/Home'
import Introduction from './components/guest/Introduction';
import Welcome from './components/user/Welcome';

import Login from './pages/guest/Login';
import Register from './pages/guest/Register';

import Account from './pages/logged_in/Account';
import AccountInformaton from './components/user/Account/AccountInformation';
import ChangePasword from './components/user/account/ChangePassword';

import Task from './pages/logged_in/Task';
import AllTasks from './components/user/task/AllTasks';
import TaskDetail from './components/user/task/TaskDetail';
import CreateTask from './components/user/task/CreateTask';

import Issue from './pages/logged_in/Issue';
import AllIssues from './components/user/issue/AllIssues';
import IssueDetail from './components/user/issue/IssueDetail';
import CreateIssue from './components/user/issue/CreateIssue';

const router = createBrowserRouter([
    {
        path:'/',
        element:<Home />,
        children:[
            {path:'/welcome', element:<Welcome />},
            {path:'/introduction', element:<Introduction />}
        ]
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/account',
        element:<Account />,
        children:[
            {index:true, element:<AccountInformaton />},
            {path:'change_password', element:<ChangePasword />}
        ]
    },
    {
        path:'/task',
        element:<Task />,
        children:[
            {index:true, element:<AllTasks />},
            {path:'detail/:id', element:<TaskDetail />},
            {path:'create', element:<CreateTask />},
        ]
    },
    {
        path:'/issue',
        element:<Issue />,
        children:[
            {index:true, element:<AllIssues />},
            {path:'detail/:id', element:<IssueDetail />},
            {path:'create', element:<CreateIssue />},
        ]
    },
]);

export default router;