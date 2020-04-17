
import React, { Component } from 'react';

import styles from './ChangePicture.module.css';
import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';



class ChangePicture extends Component {

    state = {
        selectedFile: null,
    }

    handleSelectedFile = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);
        const res = await this.props.changePicture(this.state.selectedFile);

        if (!this.props.error && res.status === 'success'){
            this.props.history.push('/auth/settings');

        }
    }

    checkSubmitBtn = () => {
        let check = true;
        if (this.state.selectedFile){
            check = false;
        }
        return check;
    }

    render() {


        return (
            <div className={styles.newArticle}>

                <form className={styles.form} onSubmit={this.handleSubmit}>

                    <h1 className={styles.heading}>Change Profile Picture</h1>

                    <input className={styles.file} style={{display: 'none'}} type="file" onChange={this.handleSelectedFile} ref={imgInput => this.imgInput = imgInput} />

                    <div className={styles.button} onClick={() => this.imgInput.click()}>Choose File</div>
                    
                    <p className={styles.fileName}>{this.state.selectedFile && this.state.selectedFile.name}</p>

                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null }

                    <input className={styles.submit} type="submit" value='Submit' disabled={this.checkSubmitBtn()}/>

                </form>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePicture: (file) => dispatch(authActionCreators.changePicture(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePicture);