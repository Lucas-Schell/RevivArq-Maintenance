import React from 'react'
import Page from 'views/Page'

import UserListCards from 'components/UserListCards'
import UserDialogBox from 'components/DialogBoxes/UserDialogForm'

class UserListPage extends Page {
    authenticated = () => {
        return (
            <div>
                <h3>Listagem de Usuários</h3>
                <UserDialogBox />
                <UserListCards />
            </div>
        )
    }

    unauthenticated = () => {
        return (
            <div className="container">
                <p>
                    Você precisa estar logado para visualizar a lista de
                    usuários!
                </p>
            </div>
        )
    }
}

export default UserListPage;
