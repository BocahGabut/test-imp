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
import { useAddPost, usePosts } from '@/hooks/usePosts';
import { useForm } from 'react-hook-form';

const CreatePost = ({ setShowTable }) => {
    const { mutate, isLoading } = useAddPost();
    const { data } = usePosts()
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = (values) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const formData = {
                    'id': data.length + 1,
                    'title': values.title,
                    'slug': titleToSlug(values.title),
                    'content': values.description,
                    'tag': values.tags,
                    'created_at': new Date().toISOString(),
                    'updated_at': new Date().toISOString(),
                    'authorId': '1',
                }
                resolve()
                mutate(formData, {
                    onSuccess: (data) => {
                        alert('Save data successfully!!!')
                        setShowTable(true)
                    },
                    onError: (error) => {
                        console.log(error)
                        alert('Shomething went wrong')
                    }
                })
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
                            type="text" />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="tags" isInvalid={errors.tags}>
                        <FormLabel>Tags</FormLabel>
                        <Input
                            {...register('tags', {
                                required: 'This is required',
                            })}
                            type="text" />
                        <FormHelperText>Use <b>,</b> for next Tags</FormHelperText>
                        <FormErrorMessage>
                            {errors.tags && errors.tags.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="description" isInvalid={errors.description}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            {...register('description', {
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

export default CreatePost