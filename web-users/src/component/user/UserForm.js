import React, { useState } from 'react'
import {HANDLE_INPUT,FETCH_COMPLETE,SUBMIT_COMPLETE,RESET_FORM,SET_LOADING} from '../actions/UserAction'

function UserForm(props) {

    const [isSubmit,setIsSubmit] = useState(false)

    const isValid = () => {
        const {isLoading,form} = props
        return (form.name.trim().length > 0 && form.birth_date.trim().length > 0) || !isLoading
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
        const {history}
    }

    return(

    )
}

function mapStateToProps(state) {
    return {...state}
}

function mapDispatchToProps(dispatch) {
    return {
        handleInput: (inputName,inputValue) => dispatch({type:HANDLE_INPUT, payload: {inputName, inputValue}}),
        reset: () => dispatch({type:RESET_FORM})
    }
}