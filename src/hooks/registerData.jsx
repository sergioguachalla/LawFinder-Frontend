import {useRegisterUserStore } from '../store/userRegistrationStore';

const RegisterUser = () => {
   const formData = useRegisterUserStore((state) => state.formData);
   console.log(formData);
   }
