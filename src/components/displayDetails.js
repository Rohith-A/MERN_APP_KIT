import React from 'react';
import { connect } from 'react-redux'
import { storeData, getUsers, dispDialog } from '../actions/index'
const edit = require('../assets/icons/edit.png');
const deleteIcon = require('../assets/icons/delete.png');
const viewIcon = require('../assets/icons/view.png');

const URL = 'http://localhost:9000/userAPI/'
class DisplayDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            details: props.details,
            newUser: {},
            mode: 'view'
        }
    }
    setInputValues(field, value) {
        const user = this.state.newUser;
        user[field] = value
        this.setState({ newUser: user })
    }
    addUser() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.newUser)
        };
        const { firstName, lastName, empNo, desig } = this.state.newUser
        if (firstName && lastName && empNo && desig) {
            fetch(URL, requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.props.storeData(data)
                    this.props.dispDialog(false);
                });
        } else {
            this.setState({ warningDisp: true })
        }
    }
    updateUser() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.newUser)
        };
        fetch(`${URL}updateUser/${this.state.newUser._id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.props.getUsers(data)
                this.setState({ mode: 'view' });
            });
    }
    enableEditing() {
        let mode = this.state.mode === 'edit' ? 'view' : 'edit';
        let editUser = this.props.todos.user ? this.props.todos.user :
            this.props.todos.users[0];
        this.setState({ mode: mode, newUser: editUser });
    }
    deleteUser() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const id = this.props.todos.user ?
            this.props.todos.user._id : this.props.todos.users[0]._id
        fetch(`${URL}deleteUser/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => this.props.getUsers(data));
    }
    returnEdit() {
        if (this.state.mode === 'edit') {
            return <div className='edit-details' >
                <span className='editIcons'>
                    <img onClick={() => this.enableEditing('view')} src={viewIcon} style={{'marginLeft': '20px'}} height='15px' width='15px' alt='delete'></img>
                </span>
                {this.state.warningDisp ? <p>Plese enter details</p> : ''}
                <div style={{ 'display': 'flex' }} className='inputFields'>
                    <span>Firstname: </span> <input
                        onChange={e => this.setInputValues('firstName', e.target.value)}
                        value={this.state.newUser ?
                            this.state.newUser.firstName : ''} placeholder='FirstName' type='text'></input>
                </div>
                <div style={{ 'display': 'flex' }} className='inputFields'>
                    <span>Lastname: </span> <input
                        onChange={e => this.setInputValues('lastName', e.target.value)}
                        value={this.state.newUser ?
                            this.state.newUser.lastName : ''} placeholder='LastName' type='text'></input>
                </div>
                <div style={{ 'display': 'flex' }} className='inputFields'>
                    <span>Empno: </span><input
                        onChange={e => this.setInputValues('empNo', e.target.value)}
                        value={this.state.newUser ?
                            this.state.newUser.empNo : ''} placeholder='EmpNo' type='text'></input>
                </div>
                <div style={{ 'display': 'flex' }} className='inputFields'>
                    <span>Designation: </span> <input
                        onChange={e => this.setInputValues('desig', e.target.value)}
                        value={this.state.newUser ?
                            this.state.newUser.desig : ''} placeholder='Designation' type='text'></input>
                </div>
                <button className='addButton' onClick={() => this.updateUser('edit')}>Save</button>
            </div>
        }
        return ''
    }
    render() {
        return (
            <div >
                {(this.props.todos.user || this.props.todos.users.length) && this.props.mode === 'view' &&
                    this.state.mode === 'view' ? <div className='edit-details'>
                        <span className='editIcons'>
                            <img onClick={() => this.enableEditing('edit')} src={edit} height='25px' width='25px' alt='edit' style={{ 'marginTop': '-3px' }}></img>
                            <img onClick={() => this.deleteUser()} src={deleteIcon} height='15px' width='15px' alt='delete'></img>
                        </span>
                        <p>Firstname: {this.props.todos.user ?
                            this.props.todos.user.firstName : this.props.todos.users[0].firstName}</p>
                        <p>Lastname: {this.props.todos.user ?
                            this.props.todos.user.lastName : this.props.todos.users[0].lastName}</p>
                        <p>Empno: {this.props.todos.user ?
                            this.props.todos.user.empNo : this.props.todos.users[0].empNo}</p>
                        <p>Designation: {this.props.todos.user ?
                            this.props.todos.user.desig : this.props.todos.users[0].desig}</p>
                    </div> : this.returnEdit()}
                {this.props.mode === 'addNew' ? <div className='add-new-user' >
                    {this.state.warningDisp ? <p>Plese enter details</p> : ''}
                    <div style={{ 'display': 'flex' }} className='inputFields'>
                        <span>Firstname: </span> <input
                            onChange={e => this.setInputValues('firstName', e.target.value)}
                            value={this.state.newUser ?
                                this.state.newUser.firstName : ''} placeholder='FirstName' type='text'></input>
                    </div>
                    <div style={{ 'display': 'flex' }} className='inputFields'>
                        <span>Lastname: </span> <input
                            onChange={e => this.setInputValues('lastName', e.target.value)}
                            value={this.state.newUser ?
                                this.state.newUser.lastName : ''} placeholder='LastName' type='text'></input>
                    </div>
                    <div style={{ 'display': 'flex' }} className='inputFields'>
                        <span>Empno: </span><input
                            onChange={e => this.setInputValues('empNo', e.target.value)}
                            value={this.state.newUser ?
                                this.state.newUser.empNo : ''} placeholder='EmpNo' type='text'></input>
                    </div>
                    <div style={{ 'display': 'flex' }} className='inputFields'>
                        <span>Designation: </span> <input
                            onChange={e => this.setInputValues('desig', e.target.value)}
                            value={this.state.newUser ?
                                this.state.newUser.desig : ''} placeholder='Designation' type='text'></input>
                    </div>
                    <button className='addButton' onClick={() => this.addUser()}>Add User</button>
                </div> : ''}
                {this.props.mode === 'edit' ? <div className='add-new-user' >
                    {this.state.warningDisp ? <p>Plese enter details</p> : ''}
                    <div style={{ 'display': 'flex' }} className='inputFields'>
                        <span>Firstname: </span> <input
                            onChange={e => this.setInputValues('firstName', e.target.value)}
                            value={this.state.newUser ?
                                this.state.newUser.firstName : ''} placeholder='FirstName' type='text'></input>
                    </div>
                    <div style={{ 'display': 'flex' }} className='inputFields'>
                        <span>Lastname: </span> <input
                            onChange={e => this.setInputValues('lastName', e.target.value)}
                            value={this.state.newUser ?
                                this.state.newUser.lastName : ''} placeholder='LastName' type='text'></input>
                    </div>
                    <div style={{ 'display': 'flex' }} className='inputFields'>
                        <span>Empno: </span><input
                            onChange={e => this.setInputValues('empNo', e.target.value)}
                            value={this.state.newUser ?
                                this.state.newUser.empNo : ''} placeholder='EmpNo' type='text'></input>
                    </div>
                    <div style={{ 'display': 'flex' }} className='inputFields'>
                        <span>Designation: </span> <input
                            onChange={e => this.setInputValues('desig', e.target.value)}
                            value={this.state.newUser ?
                                this.state.newUser.desig : ''} placeholder='Designation' type='text'></input>
                    </div>
                    <button className='addButton' onClick={() => this.addUser()}>Add User</button>
                </div> : ''}
            </div>
        )
    };
}
// const appState = getVisibleTodos();

const mapStateToProps = appState => {
    return {
        todos: appState
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storeData: (data) => dispatch(storeData(data)),
        getUsers: (data) => dispatch(getUsers(data)),
        dispDialog: (data) => dispatch(dispDialog(data)),
    }
}
const DispComp = connect(mapStateToProps, mapDispatchToProps)(DisplayDetails);
export default DispComp
