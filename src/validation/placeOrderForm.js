import * as yup from 'yup';
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const schema = yup.object({
  name: yup.string().required('Name is required').max(30, 'Max length exceeded'),
  email: yup.string().required('Email is required').email('Not a valid email address'),
  address: yup.string().required('Address is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
});

export default schema;
