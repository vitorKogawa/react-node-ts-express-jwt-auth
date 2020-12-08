import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    RouteProps
} from "react-router-dom"
import Login from './pages/Login'
import Users from './pages/Users'
import { Context, AuthProvider } from './context/AuthProvider'

interface CUSTOM_ROUTE extends RouteProps{
    isPrivate?: boolean
}

const CustomRoute: React.FC<CUSTOM_ROUTE> = ({ isPrivate, ...rest }) => {
    const { loading, authenticate } = useContext(Context)

    if(loading){
        return <h2>Carregando...</h2>
    }

    if(isPrivate && !authenticate){
        return <Redirect to="/login"/>
    }

    return <Route { ...rest } />
}

function Routes(){

    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <CustomRoute path="/login" component={Login} exact/>
                    <CustomRoute isPrivate path="/users" component={Users} exact/>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default Routes