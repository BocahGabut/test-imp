import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
    Textarea
} from '@chakra-ui/react';

import { titleToSlug } from '@/config';
import { useEditPost } from '@/hooks/usePosts';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const EditPost = ({ setEditData, dataEdit, setShowTable }) => {
    const { isEditing, setIsEditing, handleEdit } = useEditPost(setEditData,setShowTable);
    const [formData, setFormData] = useState(dataEdit)
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (values) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setFormData((prevData) => ({
                    ...prevData,
                    'updated_at': new Date().toISOString(),
                    'slug': titleToSlug(values.title)
                }));
                handleEdit(formData);
                resolve()
            }, 3000)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4} my='4' mb='7'>
                    <FormControl id="email" isInvalid={errors.name}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            {...register('title', {
                                required: 'This is required',
                                minLength: { value: 10, message: 'Minimum length should be 30' }
                            })}
                            value={formData.title}
                            onChange={handleChange}
                            type="text" />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="tags" isInvalid={errors.tags}>
                        <FormLabel>Tags</FormLabel>
                        <Input
                            {...register('tag', {
                                required: 'This is required',
                            })}
                            value={formData.tag}
                            onChange={handleChange}
                            type="text" />
                        <FormHelperText>Use <b>,</b> for next Tags</FormHelperText>
                        <FormErrorMessage>
                            {errors.tags && errors.tags.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="description" isInvalid={errors.description}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={formData.content}
                            onChange={handleChange}
                            {...register('content', {
                                required: 'This is required',
                                minLength: { value: 175, message: 'Minimum length should be 175' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        isLoading={isSubmitting} type='submit'>
                        Submit Data
                    </Button>
                </Stack>
            </form>
        </>
    )
}

export default EditPost