import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {HANDLE_INPUT,SUBMIT_COMPLETE,RESET_FORM,SET_LOADING} from '../actions/UserAction'
import * as Service from '../../services/UserService'
import {Card,CardHeader,CardBody,Form,FormGroup,Label,Input,Button,Col} from 'reactstrap'
import Icon from '../../shared/icons/Icon'

function UserForm(props) {

    const {history,reset,form,submit,handleInput,isLoading, loading} = props

    const isValid = () => {
        return (form.name.trim().length > 0 && form.birth_date && form.identity_number.trim().length > 0 &&
            form.job !== (<option default> ---PILIH--- </option>) && 
            form.education !== (<option default> ---PILIH--- </option>)) || !isLoading
    }


    const optionJob = () => {
        let job =  ['PNS','Wiraswasta','Wirausaha']
        let optJob = []
        for (let i = 0; i < job.length; i++) {
            optJob.push(<option key={i} value={job[i]}>{job[i]}</option>)
        }
        return optJob
    }

    const optionEducation = () => {
        let edu = ['SD','SMP','SMA','Diploma','Sarjana','Magister','Doktor']
        let optEdu = []
        for (let i = 0; i < edu.length; i++) {
            optEdu.push(<option key={i} value={edu[i]}>{edu[i]}</option>)
        }
        return optEdu
    }

    const handleReturn = () => {
        reset()
        history.replace('/user')
    }

    const submitData = async () => {
        if(form.id) return await Service.editUser(form)
        else return await Service.addUser(form)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        console.log(form)
        loading()
        submitData().then((content) => {
            submit(content)
            handleReturn()
        })
    }

    return(
        <Card className="shadow">
            <CardHeader tag="strong" className="text-center">{!form.id ? "Insert New User" : "Edit User"}</CardHeader>
            <CardBody className="p-3">
            <Form onSubmit={(event) => handleSubmit(event)}>
                <FormGroup>
                    <Label for="name">Nama User</Label>
                    <Input type="text" name="name" id="name" value={form.name} onChange={(event) => handleInput('name',event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="birth_date">Tanggal Lahir</Label>
                    <Input type="date" name="birth_date" id="birth_date" value={form.birth_date} onChange={(event) => handleInput('birth_date', event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="identity_number">NIK</Label>
                    <Input type="text" name="identity_number" id="identity_number" value={form.identity_number} onChange={(event) => handleInput('identity_number',event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="job">Pekerjaan</Label>
                    <Input type="select" name="job" id="job" value={form.job} onChange={(event) => handleInput('job', event.target.value)}>
                        <option default> ---PILIH--- </option>
                        {optionJob()}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="education">Pendidikan Terakhir</Label>
                    <Input type="select" name="education" id="education" value={form.education} onChange={(event) => handleInput('education', event.target.value)}>
                        <option default> ---PILIH--- </option>
                        {optionEducation()}
                    </Input>
                </FormGroup>
                <FormGroup row>
                    <Col sm={{ size: 9, offset: 3 }}>
                        <Button type="submit" color="success" disabled={!isValid()}>
                            <Icon icon='fas paper-plane'/> Save User
                        </Button>
                    </Col>
                    <Col>
                        <Button type='reset' color='secondary' onClick={handleReturn}>Return</Button>
                    </Col>
                </FormGroup>
                </Form>
            </CardBody>
        </Card>
    )
}

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        handleInput: (inputName,inputValue) => dispatch({type:HANDLE_INPUT, payload: {inputName, inputValue}}),
        reset: () => dispatch({type:RESET_FORM}),
        submit: () => dispatch({type:SUBMIT_COMPLETE}),
        loading: () => dispatch({type:SET_LOADING})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserForm))