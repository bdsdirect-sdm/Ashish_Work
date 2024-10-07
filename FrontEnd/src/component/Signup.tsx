import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const Signup: React.FC = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
    });

    const handleSubmit = async (values: unknown) => {
        try {
            await axios.post('http://localhost:3000/api/signup', values);
            alert('Signup Sucessfully')
            navigate('/login');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert('Email already exists');
        }
    }

    return (
        <div>
            <h2>Signup</h2>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field name="firstName" placeholder="First Name" type="text" />
                    <ErrorMessage name="firstName" />
                    <Field name="lastName" placeholder="Last Name" type="text" />
                    <ErrorMessage name="lastName" />
                    <Field name="email" placeholder="Email" type="text" />
                    <ErrorMessage name="email" />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" />
                    <Field name="confirmPassword" type="password" placeholder="Confirm Password" />
                    <ErrorMessage name="confirmPassword" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <Link to="/login">Already have an account? Login here</Link>
        </div>
    )
}

export default Signup