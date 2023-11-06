import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import * as actions from '../actions/actions';

import PostsList from "../components/postsList";
import PostsForm from "../components/postsForm";

import '../styles/home.css';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts)
    console.log(posts);

    const [showModal, setShowModal] = useState(false);
    const [modalState, setModalState] = useState(true);
    const [postId, setPostId] = useState();

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];

    useEffect(() => {
        dispatch(actions.getAllPosts);
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    const typeOpenModal = (id) => {
        if (typeof id === 'number') {
            setModalState(false);
        } else {
            setModalState(true);
        }
        setPostId(id);
        setShowModal(true);
    }

    const postEdited = useSelector(state => {
        return state.posts.find(post => post.id === postId);
    });

    const initialValues = modalState ?
        {
            title: '',
            content: '',
            author: '',
            publishDate: currentDateString,
            category: '',
            featuredImage: ''
        } : postEdited;

    //add and edit
    const onSubmit = (values) => {
        if (modalState) {
            dispatch(actions.addPosts({
                ...values
            }));
            setShowModal(false)
            alert('add success');
        } else {
            dispatch(actions.updatePosts(values))
            alert('update success');
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        dispatch(actions.deletePosts(id));
        alert('delete success');
    };

    return (
        <>
            <div className="header-container">
                <div className="navbar">
                    navbar
                </div>
            </div>
            <div className="add-button-container">
                <Button variant="primary" onClick={typeOpenModal}>
                    Add a new post
                </Button>
            </div>

            <PostsList
                posts={posts}
                handleDelete={handleDelete}
                typeOpenModal={typeOpenModal}
            />

            <Modal
                show={showModal}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalState ? 'Add a new post' : 'Edit post'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PostsForm
                        modalState={modalState}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Home;