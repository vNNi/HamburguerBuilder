import React, {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: false,
        }

        componentWillMount() {
            axios.interceptors.response.use(req => req, error => {
                this.setState({error: error});
            });
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
        }

        closeError = () => {
            this.setState({error: false});
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