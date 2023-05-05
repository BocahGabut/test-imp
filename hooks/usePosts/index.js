import { rootApi } from "@/config";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchPosts = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${rootApi}/posts`,
        })
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const usePosts = () => {
    return useQuery('posts', () => fetchPosts())
}

const fetchPostsSlugId = async (slug, id) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${rootApi}/posts?slug=${slug}&id=${id}`,
        });
        return response.data[0];
    } catch (error) {
        console.error(error);
    }
};

export const usePostsSlugId = (slug, id) => {
    return useQuery(["posts", slug, id], () => fetchPostsSlugId(slug, id));
};

const addPost = async (postData) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${rootApi}/posts`,
            data: postData,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const useAddPost = () => {
    const queryClient = useQueryClient();

    return useMutation(addPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
}

const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`${rootApi}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation(deletePost, {
        onSuccess: () => {
            // invalidate posts query when post is deleted
            queryClient.invalidateQueries('posts');
        },
    });
}

const editPost = async (postData) => {
    try {
        const response = await axios.put(`${rootApi}/posts/${postData.id}`, postData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const useEditPost = (setEditData, setShowTable) => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const { mutate } = useMutation(editPost, {
        onSuccess: () => {
            // invalidate posts query when post is edited
            queryClient.invalidateQueries('posts');
            setIsEditing(false);
            alert('Update data successfully!!!')
            setEditData(false)
            setShowTable(true)
        },
    });

    const handleEdit = (postData) => {
        mutate(postData);
    };

    return { isEditing, setIsEditing, handleEdit };
};

export { fetchPosts, useAddPost, useDeletePost, useEditPost, usePosts };

