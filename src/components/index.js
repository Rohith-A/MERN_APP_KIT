import React from 'react';
import { connect } from 'react-redux'
import { storeData, getUsers , getUsersById, dispDialog} from '../actions/index'
import DisplayDetails from './displayDetails'
import { Dialog } from 'primereact/dialog';
import Loader from './loader'
const URL = 'https://rohith-utility-app.herokuapp.com/userAPI/';

class UserDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = { details: props.details,
            showDialog: false
        }
    }
    componentDidMount() {
        fetch(`${URL}getUser`).then(res => 
            res.json()
        ).then(
            resp => this.props.getUsers(resp)
        )
    }
    showDialog(val) {
        this.setState({showDialog: val})
    }
    handleAPIRequests() {
        
    }

    fetchById(id) {
        debugger
        fetch(`${URL}getUser/${id}`).then(res => 
            res.json()
        ).then(
            resp => this.props.getUsersById(resp)
        )
    }

    render() {
        return (
            <div>
                <button className='addButton' onClick={() => this.props.dispDialog(true)}>Add user</button>
                {/* <h2>{this.printData()}</h2> */}
                {this.props.todos.users.length ? this.props.todos.users.map(val => {
                    return <span><span onClick ={e => this.fetchById(val._id)} className='disp-details' key = {val._id}><p>{val.firstName}</p>
                    &nbsp;<p>{val.lastName}</p>
                    </span> 
                    
                    </span>
                }) : ''}
                {this.props.todos.users.length ? <DisplayDetails mode='view'/> : ''}
                <Dialog header="Add new user" visible={this.props.todos.showDialog} style={{ width: '50vw' }} modal={true} onHide={() => this.props.dispDialog(false)}>
                <DisplayDetails mode='addNew'/>
                </Dialog>
                {/* {!this.props.todos.users.length ?
                <Loader /> : ''}            */}
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
        getUsersById: (data) => dispatch(getUsersById(data)),
        dispDialog: (data) => dispatch(dispDialog(data)),
    }
}
const Comp = connect(mapStateToProps, mapDispatchToProps)(UserDetails);
export default Comp
