import PD from "./components/MainViews/PD/PD"
import CD from "./components/MainViews/CD/CD"
import CDSelector from "./components/MainViews/CD/CDSelector"
import Login from "./components/Login/Login"
import Uninstall from "./components/MainViews/Uninstall/Uninstall"
import Error from "./components/MainViews/Error/Error"
import ProOrSubscription from "./components/MainViews/Subscription/ProOrSubscription"
import { Navigate } from "react-router-dom"
import About from "./components/MainViews/About"
import OnboardingFlow from "./components/OnboardingFlow/OnboardingFlow"
import ConversionsSelector from "./components/MainViews/Conversions/ConversionsSelector"
import Conversions from "./components/MainViews/Conversions/Conversions"
const routes = [
    {
        path: '/',
        Component: Login,
        protectedRoute: false
    },
    {
        path: '/personal-dictionary',
        Component: PD,
        protectedRoute: true
    },
    {
        path: '/community-dictionaries',
        Component: CDSelector,
        protectedRoute: true
    },
    {
        path: '/community-dictionaries/:selectedCD',
        Component: CD,
        protectedRoute: true
    },
    {
        path: '/conversions',
        Component: ConversionsSelector,
        protectedRoute: true,
    },
    {
        path: '/conversions/:selectedConversion',
        Component: Conversions,
        protectedRoute: true,
    },
    {
        path: '/learn',
        Component: OnboardingFlow
    },
    {
        path: '/about',
        Component: About
    },
    {
        path: '/uninstall',
        Component: Uninstall
    },
    {
        path: '/error',
        Component: Error
    },
    {
        path: '/ai',
        Component: ProOrSubscription,
        protectedRoute: true
    },
    {
        path: '/subscription',
        Component: () => <Navigate to='/ai' replace />
    },
    {
        path: '/pro',
        Component: () => <Navigate to='/ai' replace />
    }
]

export default routes