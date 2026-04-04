import { createBrowserRouter } from 'react-router-dom';
import { GuestRoute } from '../components/common/GuestRoute';
import { HomeRedirect } from '../components/common/HomeRedirect';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LoginPage from '../pages/auth/LoginPage';
import LecturerChairPage from '../pages/lecturer/ChairPage';
import LecturerCommitteePage from '../pages/lecturer/CommitteePage';
import LecturerDashboardPage from '../pages/lecturer/DashboardPage';
import LecturerReviewerPage from '../pages/lecturer/ReviewerPage';
import LecturerSecretaryPage from '../pages/lecturer/SecretaryPage';
import LecturerSupervisorPage from '../pages/lecturer/SupervisorPage';
import LecturerTopicSuggestionPage from '../pages/lecturer/TopicSuggestionPage';
import HeadAssignCommitteePage from '../pages/head/AssignCommitteePage';
import HeadAssignReviewerPage from '../pages/head/AssignReviewerPage';
import HeadDashboardPage from '../pages/head/DashboardPage';
import HeadQuotaPage from '../pages/head/QuotaPage';
import HeadStatisticsPage from '../pages/head/StatisticsPage';
import NotFoundPage from '../pages/shared/NotFoundPage';
import UnauthorizedPage from '../pages/shared/UnauthorizedPage';
import StudentDashboardPage from '../pages/student/DashboardPage';
import StudentProfilePage from '../pages/student/ProfilePage';
import StudentRegisterBcttPage from '../pages/student/RegisterBcttPage';
import StudentRegisterKltnPage from '../pages/student/RegisterKltnPage';
import StudentResultPage from '../pages/student/ResultPage';
import StudentStatusPage from '../pages/student/StatusPage';
import StudentSubmissionPage from '../pages/student/SubmissionPage';
export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: <AuthLayout />,
        children: [{ index: true, element: <LoginPage /> }],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <HomeRedirect /> },
          { path: '/unauthorized', element: <UnauthorizedPage /> },
          {
            path: '/student',
            element: <ProtectedRoute allowedRoles={['STUDENT']} />,
            children: [
              { path: 'dashboard', element: <StudentDashboardPage /> },
              { path: 'profile', element: <StudentProfilePage /> },
              { path: 'register-bctt', element: <StudentRegisterBcttPage /> },
              { path: 'register-kltn', element: <StudentRegisterKltnPage /> },
              { path: 'status', element: <StudentStatusPage /> },
              { path: 'submission', element: <StudentSubmissionPage /> },
              { path: 'result', element: <StudentResultPage /> },
            ],
          },
          {
            path: '/lecturer',
            element: <ProtectedRoute allowedRoles={['LECTURER']} />,
            children: [
              { path: 'dashboard', element: <LecturerDashboardPage /> },
              { path: 'supervisor', element: <LecturerSupervisorPage /> },
              { path: 'reviewer', element: <LecturerReviewerPage /> },
              { path: 'committee', element: <LecturerCommitteePage /> },
              { path: 'chair', element: <LecturerChairPage /> },
              { path: 'secretary', element: <LecturerSecretaryPage /> },
              {
                path: 'topic-suggestions',
                element: <LecturerTopicSuggestionPage />,
              },
            ],
          },
          {
            path: '/head',
            element: <ProtectedRoute allowedRoles={['HEAD_OF_DEPARTMENT']} />,
            children: [
              { path: 'dashboard', element: <HeadDashboardPage /> },
              { path: 'quotas', element: <HeadQuotaPage /> },
              { path: 'assign-reviewer', element: <HeadAssignReviewerPage /> },
              { path: 'assign-committee', element: <HeadAssignCommitteePage /> },
              { path: 'statistics', element: <HeadStatisticsPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
