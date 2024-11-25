import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '../components/Label/Label';
import CreatableSelect from 'react-select/creatable';
import WebService from '../utility/WebService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { handleSubmit, formState: { errors, isValid }, control, watch } = useForm<any>({});
    const watchAllFields = watch();
    const navigate = useNavigate();
    const [file, setFile] = useState<any>()

    const onSave = (data: any) => {
        if (!file) {
            toast.error('Please upload resume');
            return;
        }
        WebService.postAPI({ action: "user/detail", body: data, id: "save_btn", })
            .then((res: any) => {
                toast.success(res.message);
                navigate('/profile');
            })
            .catch((e: any) => { });
    };

    const onUploadResume = (e: any) => {
        if (e) {
            var allowedExtensions = /(\.(pdf))$/i;
            var fileSize = Math.round(e.target.files[0].size / 1024);
            if (allowedExtensions.test(e.target.files[0].name) === false) {
                toast.error("Please upload image file only pdf");
            } else if (fileSize > 10000) {
                toast.error("file exceeds 10 MB");
            } else {
                WebService.fileUploadAPI({ action: "upload-resume", key: "file", file: e.target.files[0], })
                    .then((res: any) => {
                        toast.success(res.message);
                        setFile(e)
                    })
                    .catch((error: any) => { });
            }
        }
    };

    return (
        <>
            <div>Dashboard</div>
            <form onSubmit={handleSubmit(onSave)}>
                <Controller
                    control={control}
                    name="address"
                    rules={{
                        required: "Please Enter Address"
                    }}
                    render={({
                        field: { onChange, onBlur },
                        fieldState: { isTouched }
                    }) => (
                        <div className='mb-4'>
                            <Form.Group className="overlap-label" controlId="address">
                                <Form.Label>Address <span className='text-danger'>*</span></Form.Label>
                                <Form.Control type="text" onChange={onChange} onBlur={onBlur} />
                            </Form.Group>
                            {
                                (errors["address"]?.message || Boolean(errors["address"]?.message) || (isTouched && !watchAllFields.address)) &&
                                <div className="login-error">
                                    <Label
                                        title={"Please enter address"}
                                        modeError={true}
                                    />
                                </div>
                            }
                        </div>
                    )}
                />

                <Controller
                    control={control}
                    name="skills"
                    rules={{
                        required: "Please Enter Skills"
                    }}
                    render={({
                        field: { onChange, onBlur },
                        fieldState: { isTouched }
                    }) => (
                        <div className='mb-4'>
                            <Form.Group className="overlap-label" controlId="skills">
                                <Form.Label>Add Skills <span className='text-danger'>*</span></Form.Label>
                                <CreatableSelect isMulti options={[]} onBlur={onBlur} onChange={onChange} />
                            </Form.Group>
                            {
                                (errors["skills"]?.message || Boolean(errors["skills"]?.message) || (isTouched && !watchAllFields.skills)) &&
                                <div className="login-error">
                                    <Label
                                        title={"Please enter skills"}
                                        modeError={true}
                                    />
                                </div>
                            }
                        </div>
                    )}
                />

                <input type="file" accept='pdf' onChange={(e: any) => onUploadResume(e)} />
                <div className="text-center mt-3">
                    <Button type='submit'
                        id='save_btn'
                        disabled={!isValid}
                        className="btn btn-brand-1 w-100">Save</Button>
                </div>
            </form>
        </>
    )
}

export default Dashboard