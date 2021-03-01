import {
    FETCH_COMPLETE,
    HANDLE_EDIT,
    HANDLE_INPUT, RESET_FORM,
    SET_LOADING,
    SUBMIT_COMPLETE
} from "../actions/UserAction";

const defaultValue = {
    id: "",
    name: "",
    birth_date: "",
    identity_number: "",
    job: "",
    education: ""
}

const initialState = {
    form:{...defaultValue},
    content:[],
    isLoading: true
}

export default function UserReducer (state = initialState,action) {
    const {type,payload} = action
    switch (type) {
        case SET_LOADING:
            return {...state, isLoading: true}
        case HANDLE_INPUT:
            const {form} = state
            const {inputName,inputValue} = payload
            form[inputName] = inputValue
            return {...state,form:{...form}}
        case HANDLE_EDIT:
            const editedForm = state.content.find((user) => user.id === payload)
            return {...state,form: {...editedForm}}
        case SUBMIT_COMPLETE:
            return {...state,form: {...defaultValue},isLoading: false}
        case FETCH_COMPLETE:
            console.log(state.content)
            return {...state,isLoading: false, content: [...payload]}
        case RESET_FORM:
            return {...state,form: {...defaultValue}}
        default:
            return {...state}
    }
}