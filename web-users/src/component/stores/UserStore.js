import React from "react";
import {createStore} from "redux";
import UserReducer from "../reducers/UserReducer";
import {Provider} from "react-redux";
import {Container} from "reactstrap";
import {Route,Switch} from "react-router-dom";
import UserList from "../user/UserList";
import UserForm from "../user/UserForm";

const userStore = createStore(UserReducer)

export default function UserStore () {

    return(
        <Container fluid>
            <Provider store={userStore}>
                <Switch>
                    <Route exact path="/user" component={UserList}/>
                    <Route path="/user/form" component={UserForm}/>
                </Switch>
            </Provider>
        </Container>

)
}
