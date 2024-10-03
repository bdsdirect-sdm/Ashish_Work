import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
    setJwtToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setJwtToken }) => {
    const navigate = useNavigate();
    console.log('i am at login')

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    });


    const handleSubmit = async (values: unknown) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', values);
            localStorage.setItem('jwt', response.data.token);
            setJwtToken(response.data.token);
            navigate('/profile');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert('Invalid credentials');
        }
    }
    return (
        <div><h2>Login</h2>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field name="email" placeholder="Email" type="text" />
                    <ErrorMessage name="email"  />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <Link to="/signup">Don't have an account? Sign up here</Link>
        </div>
    )
}

export default Login