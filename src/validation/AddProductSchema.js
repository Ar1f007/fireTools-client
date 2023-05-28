import * as yup from 'yup';

const productSchema = yup.object({
  productName: yup.string().required('Name is required'),
  description: yup.string().required('Give a description'),
  price: yup
    .number()
    .positive('Give a number greater than 0')
    .required('Add per unit price')
    .typeError('Add per unit price (number)'),
  availableQuantity: yup
    .number()
    .positive('Give a number greater than 0')
    .required('Add stock quantity')
    .typeError('Add stock quantity (number)'),
  minimumOrderQuantity: yup
    .number()
    .positive('Give a number greater than 0')
    .required('Give a minimum order quantity value')
    .typeError('Give a minimum order quantity value (number)'),
  image: yup
    .mixed()
    .test('required', 'You need to provide an image of the product', (value) => {
      // Pass the validation if value is a string
      if (typeof value === 'string') {
        return true;
      }

      return value && value.length;
    })
    .test('fileSize', 'Image size cannot be larger than 2mb', (value) => {
      // Skip the size check if value is a string
      if (typeof value === 'string') {
        return true;
      }

      return value && value[0]?.size <= 2000000;
    }),
  discount: yup
    .mixed()
    .test('is-valid', 'Value should be between 0 to 100', (value) => {
      if (value === undefined || value === null) {
        return true;
      }

      if (value < 0 || value > 100) {
        return false;
      }

      return true;
    })
    .typeError('Add discount value (number)'),
});

export default productSchema;
