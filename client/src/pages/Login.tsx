// import "../assets/css/login.css"
import React, { ChangeEvent, useRef, useState } from "react"
import axios from "axios";
import styled from "styled-components";
import { CommentsDollar } from "@styled-icons/fa-solid/CommentsDollar";

type Credentials = {
    email: string,
    password: string,
}

type Tokens = {
    token: string,
    refreshToken: string
}

const Login: React.FC = () => {

    const [credentials, setCredentials] = useState<Credentials>({ password: "", email: "" });
    const [errorMessage, setErrorMessage] = useState('');

    const passwordInput = useRef<HTMLInputElement>(null);
    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post<Tokens>("/auth/login", credentials).then((res) => {
            setErrorMessage('');
        }).catch(error => {
            setErrorMessage('* '+error.response.data.errors.msg);
        })
    }

    const checkboxHandle = (e: ChangeEvent<HTMLInputElement>)=>{        
        if(passwordInput.current != null){
            passwordInput.current.type = (passwordInput.current.type==='text') ? 'password': 'text';
        }
    }
    return (
        <>
            <Main>
                <Form>
                    <LogoIcon />

                    <Logo >Money App</Logo>

                    <FormGroup>
                        {/* <i className="fa fa-user"></i> */}
                        {/* <Label htmlFor="username">Username</Label> */}
                        <Input type="email" id="email" placeholder="email" onChange={e => { setCredentials({ ...credentials, email: e.target.value }) }} />
                    </FormGroup>
                    <FormGroup>
                        {/* <i className="fa fa-lock"></i> */}
                        {/* <Label htmlFor="password">Password</Label> */}
                        <Input ref={passwordInput} type="password" id="password" placeholder="password" autoComplete="off" onChange={e => { setCredentials({ ...credentials, password: e.target.value }) }} />

                    </FormGroup>
                    <FormGroup style={{justifyContent: "flex-start"}}>
                        <input onChange={checkboxHandle} type="checkbox" id="showPassword"/>
                        <label htmlFor="showPassword" style={{marginLeft: "10px"}}>Show password</label>
                    </FormGroup>
                    <FormGroup>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </FormGroup>
                    <Button className="login-button" onClick={submit}>Login</Button>
                </Form>

                <Footer>
                    <Owner>@TheZunguze</Owner>
                </Footer>
            </Main>
        </>
    )
}



const Main = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction:  column;
    height: 100vh;
    font-size: 16px;
`

const Form = styled.form`
    position: relative;
    max-width: 300px;
    dispaly:flex;
    align-items: center;
    justify-content:center;
    flex-direction: row;
    padding: 50px 0;
    padding: 20px;
    height: 70vh;
    max-height: 500px;
`
const LogoIcon = styled(CommentsDollar)`

    width: 100px;
    color: #00a94f;
    margin-bottom: 50px;
`
const Logo = styled.h1`
    font-size: 30px;
    margin-bottom: 20px;
`

const FormGroup = styled.div`
text-align: left;
    width: 100%;
    margin-bottom: 10px;
`

const Input = styled.input`
    border-radius: 10px;
    width: 100%;
    background-color: #e9ecef;
    padding: 10px;
    font-size: 16px;

`

const Button = styled.button`
    background-color: #08AEEA;
    background-image: linear-gradient(0deg, #08AE9A 0%, #2AF598 100%);
    color: white;
    border:none;
    font-size: 20px;
    padding: 10px;
    border-radius: 10px;
    margin-top: 15px;
`
const Footer = styled.div`
    border-top: 1px solid gray;
    position: relative;
    font-size: 16px;
`

const Owner = styled.div`
    padding-top: 40px;
    position: relative;
`

const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
`

export default Login;