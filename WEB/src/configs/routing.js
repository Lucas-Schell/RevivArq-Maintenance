import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Views'
import HomePage from 'views/HomePage'
import Page from 'views/Page'
import BlankPage from 'views/BlankPage'
import Email from 'views/Email'
import RecPassword from 'views/RecPassword'
import Erro403 from 'views/Erro403'
import Ticket from '../views/TicketPage'

import AreaAdmin from '../views/AreaAdmin'
import AreaCliente from '../views/AreaCliente'
import SobreNos from '../views/SobreNos'
import FacaPedido from '../views/FacaPedido'
import Reforma from '../views/Reforma'
// Users
import UserEditPage from 'views/UserPages/CreateUpdate'
import UserListPage from 'views/UserPages/List'

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/protected" component={Page} />
            <Route path="/email" component={Email} />
            <Route path="/recpass" component={RecPassword} />
            <Route path="/AreaAdmin" component={AreaAdmin} />
            <Route path="/AreaCliente" component={AreaCliente} />
            <Route path="/SobreNos" component={SobreNos} />
            <Route path="/FacaPedido" component={FacaPedido} />
            <Route path="/Reforma" component={Reforma} />
            <Route path="/Erro403" component={Erro403} />
            <Route path="/ticket" component={Ticket} />

            {/* User Container */}
            <Route exact path="/users" component={UserListPage} />
            <Route exact path="/users/edit" component={UserEditPage} />
            <Route exact path="/users/edit/:id" component={UserEditPage} />
            {/* End of User Container */}

            {/* 404 - Page not Found */}
            <Route component={BlankPage} />

            {/* 403 - ForbiddenAcess */}
            <Route component={Erro403} />
        </Switch>
    )
}
