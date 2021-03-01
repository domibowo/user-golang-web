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

    const loadData = () =>{
        const {setLoading,fetchComplete} = props
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
        const {handleEdit,history} = props

        handleEdit(id)

        history.replace("/user/form")

    }

    const generateTableRow = () =>{
        const {content,isLoading} = props
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
                        <th scope="row">{index+1}</th>
                        <td>{user.name}</td>
                        <td>{user.birth_date}</td>
                        <td>{user.identity_number}</td>
                        <td>{user.job}</td>
                        <td>{user.education}</td>
                        <td>
                            <Button type="button" color="info">Info</Button>
                        </td>
                        <td>
                            <Button type="button" color="warning" className="shadow"
                                    onClick={()=>handleEditButton(user.id)}
                            >Edit</Button>
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
                        <Link to="/form">
                            <Button color="primary" className="shadow"><Icon icon="fas plus"></Icon> Add</Button>
                        </Link>
                    </Col>
                    <Col md={{size:7,offset:2}}>
                        <h3>User(s) List</h3>
                    </Col>
                </Row>
            </CardHeader>
            <Table striped hover responsive className="m-0">
                <thead>
                    <tr>
                        <th width="5%">No.</th>
                        <th>Nama</th>
                        <th>Tanggal Lahir</th>
                        <th>NIK</th>
                        <th>Pekerjaan</th>
                        <th>Pendidikan Terakhir</th>
                        <th colSpan={2} width="15%" className="text-center">Aksi</th>
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