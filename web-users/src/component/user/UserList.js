import React, {useEffect} from "react";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Row,
    Spinner,
    Table
} from "reactstrap";
import {FETCH_COMPLETE, HANDLE_EDIT, SET_LOADING} from "../actions/UserAction";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {getAllUsers} from "../../services/UserService";
import Icon from "../../shared/icons/Icon";

function UserList (props) {

    const {setLoading,fetchComplete,handleEdit,history,content,isLoading} = props;

    const loadData = () =>{
        setLoading()
        getAllUsers()
            .then((content)=>{
                fetchComplete(content)
            })
    }

    useEffect(()=>{
        loadData()
    },[])

    const handleEditButton = (id) =>{
        handleEdit(id)
        history.replace("/user/form")

    }

    const generateTableRow = () =>{
        let rows = (
            <tr>
                <td><Spinner className="text-center" type="grow" aria-colspan={6} color="info"/></td>
            </tr>
        )
        if (!isLoading){
            rows=(
                <tr>
                    <td colSpan={8} className="table-warning text-center"><strong><em>No User(s) yet.</em></strong></td>
                </tr>
            )
        }
        if (content.length>0 && !isLoading){
            rows = content.map((user,index)=>{
                return(
                    <tr key={index}>
                        <th scope="row" className="text-center">{index+1}</th>
                        <td>{user.name}</td>
                        <td className="text-center">{user.birth_date}</td>
                        <td className="text-center">{user.identity_number}</td>
                        <td className="text-center">{user.job}</td>
                        <td className="text-center">{user.education}</td>
                        <td className="text-center">
                            <Button type="button" color="warning" className="shadow"
                                    onClick={()=>handleEditButton(user.id)}
                            ><Icon icon="fas user-edit"/></Button>
                        </td>
                    </tr>
                )
            })
        }
        return rows;
    }

    return (
        <Card className="shadow">
            <CardHeader tag="strong">
                <Row>
                    <Col >
                        <Link to="/user/form">
                            <Button color="primary" className="shadow"><Icon icon="fas plus"></Icon> Add</Button>
                        </Link>
                    </Col>
                    <Col md={{size:7,offset:2}}>
                        <h3>User(s) List</h3>
                    </Col>
                </Row>
            </CardHeader>
            <Table striped hover responsive className="m-0" size="md">
                <thead>
                    <tr>
                        <th width="5%" className="text-center">No.</th>
                        <th className="text-center">Nama</th>
                        <th className="text-center">Tanggal Lahir</th>
                        <th className="text-center">NIK</th>
                        <th className="text-center">Pekerjaan</th>
                        <th className="text-center">Pendidikan Terakhir</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        generateTableRow()
                    }
                </tbody>
            </Table>
        </Card>
    )
}

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        handleEdit: (id) => dispatch({type:HANDLE_EDIT,payload: id}),
        setLoading: () => dispatch({type:SET_LOADING}),
        fetchComplete: (payload) => dispatch({type:FETCH_COMPLETE,payload})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserList))