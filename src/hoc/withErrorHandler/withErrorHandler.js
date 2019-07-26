import React, {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props){
            super(props);
            this.respInter = axios.interceptors.response.use(req => req, error => {
                this.setState({error: error});
            });
            this.reqInter = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
        }
        state = {
            error: false,
        }

        closeError = () => {
            this.setState({error: false});
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.respInter);
        }
        render(){
            return (
            <>
                <Modal
                show={this.state.error ? true : false}
                closeModal={this.closeError}
                >
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </>)
        }
    }
}

export default withErrorHandler;