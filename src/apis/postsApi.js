import axiosClient from "../services/axiosClient";

const postsApi =  {
    getAll: () => {
        return axiosClient.get('/posts');
    },
    create: (dataPost) => {
        return axiosClient.post('/posts', dataPost);
    },
    update: (id, dataPost) => {
        return axiosClient.put(`/posts/${id}`, dataPost);
    },
    remove: (id) => {
        return axiosClient.delete(`/posts/${id}`);
    },
}

export default postsApi;