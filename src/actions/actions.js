import postsApi from '../apis/postsApi';
import * as types from './types';

export const getAllPosts = async (dispatch) => {
    try {
        const response = await postsApi.getAll();

        dispatch({
            type: types.GET_POST,
            payload: response,
        });
        return response;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addPosts = (dataPost) => async (dispatch) => {
    try {
        const response = await postsApi.create(dataPost);

        dispatch({
            type: types.ADD_POST,
            payload: response,
        });
        return response;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updatePosts = (dataPost) => async (dispatch) => {
    const id = dataPost.id;
    try {
        await postsApi.update(id, dataPost);

        dispatch({
            type: types.UPDATE_POST,
            payload: dataPost,
        });
        return dataPost;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deletePosts = (id) => async (dispatch) => {
    try {
        await postsApi.remove(id);

        dispatch({
            type: types.DELETE_POST,
            payload: id,
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
};


