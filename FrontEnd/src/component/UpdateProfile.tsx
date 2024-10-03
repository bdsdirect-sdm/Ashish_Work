
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface UpdateProfileProps {
  token: string;
}


const UpdateProfile : React.FC <UpdateProfileProps> = ({token}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userData, setUserData] = useState<any>({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: ''
      });
    const navigate = useNavigate();
    useEffect(() => {
        axios
          .get('http://localhost:3000/api/profile', { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setUserData(response.data);
          })
          .catch((error) => {
            console.error('Failed to fetch profile data', error);
          });
      }, [token]);


  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    dateOfBirth: Yup.date().required('Required'),
    gender: Yup.string().required('Required'),  
    phoneNumber: Yup.string().required('Required'),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    try {
      await axios.put('http://localhost:3000/api/profile', values, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/profile');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Email already exists or another error occurred');
    }}
  return (
    <div><h2>Update Profile</h2>
    <Formik
      initialValues={{
        firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          dateOfBirth: userData.dateOfBirth || '',
          gender: userData.gender || '',
          phoneNumber: userData.phoneNumber || '',
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name="firstName" placeholder="First Name" type="text"/>
        <ErrorMessage name="firstName" />
        <Field name="lastName" placeholder="Last Name" type="text"/>
        <ErrorMessage name="lastName" />
        <Field name="email" placeholder="Email" type="text"/>
        <ErrorMessage name="email" />
        <Field name="dateOfBirth" type="date" placeholder="Date of Birth" />
        <ErrorMessage name="dateOfBirth" />
        <Field name="gender" as="select" type="text">
          <option>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Field>
        <ErrorMessage name="gender" />
        <Field name="phoneNumber" placeholder="Phone Number" type="text" />
        <ErrorMessage name="phoneNumber" />
        <button type="submit" >Update</button>
      </Form>
    </Formik></div>
  )
}

export default UpdateProfile