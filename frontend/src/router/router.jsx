import { createBrowserRouter,Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/Home'
import PleaseLogin from '../pages/PleaseLogin';

import Login from '../pages/guest/Login';
import Register from '../pages/guest/Register';

import Account from '../pages/logged_in/Account';
import AccountInformation from '../components/user/account/AccountInformation';
import ChangePasword from '../components/user/account/ChangePassword';

import Task from '../pages/logged_in/Task';
import AllTasks from '../components/user/task/AllTasks';
import TaskDetail from '../components/user/task/TaskDetail';
import CreateTask from '../components/user/task/CreateTask';

import Issue from '../pages/logged_in/Issue';
import AllIssues from '../components/user/issue/AllIssues';
import IssueDetail from '../components/user/issue/IssueDetail';
import CreateIssue from '../components/user/issue/CreateIssue';

import Pomodoro from '../pages/logged_in/Pomodoro';
import Workbench from '../components/user/pomodoro/PomodoroWorkbench';
import AllSessions from '../components/user/pomodoro/AllSessions';
import SessionDetail from '../components/user/pomodoro/SessionDetail';

const router = createBrowserRouter([
    {
        path:'/',
        element:<Home />,
    },
    {
        path:'/please_login',
        element:<PleaseLogin />
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
        element:(
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
        ),
        children:[
            {index:true, element:<AccountInformation />},
            {path:'change_password', element:<ChangePasword />}
        ]
    },
    {
        path:'/task',
        element:(
            <ProtectedRoute>
                <Task />
            </ProtectedRoute>
        ),
        children:[
            {index:true, element:<AllTasks />},
            {path:'detail/:id', element:<TaskDetail />},
            {path:'create', element:<CreateTask />},
        ]
    },
    {
        path:'/issue',
        element:(
            <ProtectedRoute>
                <Issue />
            </ProtectedRoute>
        ),
        children:[
            {index:true, element:<AllIssues />},
            {path:'detail/:id', element:<IssueDetail />},
            {path:'create', element:<CreateIssue />},
        ]
    },
    {
        path:'/pomodoro',
        element:(
            <ProtectedRoute>
                <Pomodoro />
            </ProtectedRoute>
        ),
        children:[
            {index:true, element:<Workbench />},
            {path:'all_sessions', element:<AllSessions />},
            {path:'detail/:id', element:<SessionDetail />}
        ],
    },
]);

export default router;