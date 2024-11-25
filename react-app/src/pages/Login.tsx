import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '../components/Label/Label';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import WebService from '../utility/WebService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PropData {
    signInSuccess: any;
}

interface loginFormInterface {
    email: string;
    password: string;
}

const Login = (props: PropData) => {
    const { handleSubmit, formState: { errors, isValid }, control, watch } = useForm<loginFormInterface>({});
    const watchAllFields = watch();
    const navigate = useNavigate();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^^(?=.*[A-Za-z0-9])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onlogin = (data: loginFormInterface) => {
        WebService.postAPI({ action: "login", body: data, id: "login_btn", })
            .then((res: any) => {
                toast.success(res.message)
                localStorage.setItem("token", res?.token);
                props.signInSuccess();
                navigate('/home')
            })
            .catch((e: any) => { });
    };

    return (
        <>
            <div>Login</div>
            <form onSubmit={handleSubmit(onlogin)}>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "Please Enter Email",
                        pattern: {
                            value: emailRegex,
                            message: "Enter valid email address",
                        }
                    }}
                    render={({
                        field: { onChange, onBlur },
                        fieldState: { isTouched, isDirty }
                    }) => (
                        <div className='mb-4'>
                            <Form.Group className="overlap-label" controlId="email">
                                <Form.Label>Email <span className='text-danger'>*</span></Form.Label>
                                <Form.Control type="text" onChange={onChange} onBlur={onBlur} />
                            </Form.Group>
                            {
                                (errors["email"]?.message || Boolean(errors["email"]?.message) || (isTouched && !watchAllFields.email) || (watchAllFields.email && !emailRegex.test(watchAllFields.email))) &&
                                <div className="login-error">
                                    <Label
                                        title={(errors.email?.message || watchAllFields.email
                                            ? "Enter valid email address"
                                            : "Please Enter Email.")}
                                        modeError={true}
                                    />
                                </div>
                            }
                        </div>
                    )}
                />
                {/* Password */}
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: "Please Enter Password",
                        pattern: {
                            value: passwordRegex,
                            message: "Between 8 to 20 characters and at least one upper case, lower case, number and special character."
                        }
                    }}
                    render={({
                        field: { onChange, onBlur },
                        fieldState: { isTouched }
                    }) => (
                        <div className="mb-3">
                            <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
                            <InputGroup className="overlap-label">
                                <Form.Control type={showPassword ? "text" : "password"} onChange={onChange} onBlur={onBlur} />
                                <InputGroup.Text id="basic-addon2" className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}</InputGroup.Text>
                            </InputGroup>
                            {
                                (errors["password"]?.message || Boolean(errors["password"]?.message) || (isTouched && !watchAllFields.password) || (watchAllFields.password && !passwordRegex.test(watchAllFields.password))) &&
                                <div className="login-error">
                                    <Label
                                        title={(errors.password?.message || watchAllFields.password
                                            ? "Between 8 to 20 characters and at least one upper case, lower case, number and special character." : "Please Enter Password.")}
                                        modeError={true}
                                    />
                                </div>
                            }
                        </div>
                    )}
                />
                <div className="text-center">
                    <Button type='submit'
                        id='login_btn'
                        disabled={!isValid}
                        className="btn btn-brand-1 w-100">Sign in</Button>
                </div>
            </form>
        </>
    )
}

export default Login