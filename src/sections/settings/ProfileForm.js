import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Stack } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { dispatch } from '../../redux/store';
import { checkCustomer } from '../../redux/check-customer/methods/post';
import { useSelector } from 'react-redux';

const ProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const getUserId = searchParams.get('userid');
  // sate
  const { info } = useSelector((store) => store.checkCustomer.post);
  const { errorMessage } = useSelector((store) => store.checkCustomer.post);

  //validation rules
  const loginSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email'),
    mobileNumber: Yup.string(),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //submit data to backend
      await dispatch(checkCustomer({ ...data, businessOwnerId: getUserId }));
    } catch (error) {
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (info && info?.id) {
      navigate(`/app/${getUserId}/${info?.id}`);
    }
  }, [info, getUserId]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={3}>
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="mobileNumber" label="Mobile Number" />
        </Stack>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Button
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          sx={{ p: 2, mt: '42px !important' }}
        >
          Send us a message
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
