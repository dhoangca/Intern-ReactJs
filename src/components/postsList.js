import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlineEllipsis } from "react-icons/ai";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import '../styles/postList.css';

const PostsList = (props) => {
    const { posts, handleDelete, typeOpenModal } = props;

    const [showDropdown, setShowDropdown] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [showFullContent, setShowFullContent] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const openPostDetail = (id) => {
        setSelectedPostId(id);
        setModalShow(true);
    };

    const handleDeletePost = (id) => {
        handleDelete(id);
    };

    const selectedPost = posts.find(post => post.id === selectedPostId);
    return (
        <>
            <div className="post-list">
                {posts.map((item, index) => {
                    const truncatedContent = showFullContent ? item.content : item.content.substring(0, 50);
                    const readMoreText = showFullContent ? " ...ẩn bớt" : " ...xem thêm";
                    return (
                        <div className="post" key={index}>
                            <span className="modal-synthetic">
                                <div className="dropdown" onClick={toggleDropdown}>
                                    <div className="dropdown-button-container">
                                        <button className="dropdown-button"><AiOutlineEllipsis /></button>
                                    </div>
                                    {showDropdown && (
                                        <div className="dropdown-content">
                                            <button className="link-button" onClick={() => handleDeletePost(item.id)}>Xóa</button>
                                            <button className="link-button" variant="primary" onClick={() => openPostDetail(item.id)}>
                                                Chi tiết
                                            </button>
                                            <button className="link-button" >Báo cáo</button>
                                        </div>
                                    )}
                                </div>
                            </span>
                            <div className="image-container">
                                <img src={item.featuredImage} alt="Blog ca nhan" onClick={() => openPostDetail(item.id)} />
                            </div>
                            <h3>{item.title}</h3>
                            <p className="p-content">
                                {truncatedContent}
                                {item.content.length > 50 && (
                                    <span
                                        className={`read-more-link ${showFullContent ? "hide-content" : "show-content"}`}
                                        onClick={() => setShowFullContent(!showFullContent)}
                                    >
                                        {readMoreText}
                                    </span>
                                )}
                            </p>
                            <div className='author-date'>
                                <div className="left-section">
                                    <div className="icon-container">
                                        <FaRegHeart />
                                    </div>
                                    <p className="author">{item.author}</p>
                                </div>
                                <p className="p-date">{item.publishDate}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Post Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPost && (
                        <>
                            <div className="post-detail">
                                <img src={selectedPost.featuredImage} alt="Blog ca nhan" />
                                <h3>{selectedPost.title}</h3>
                                <p>Post category: {selectedPost.category}</p>
                                <p className="p-content-detail">{selectedPost.content}</p>
                                <div className='author-date-detail'>
                                    <div className="left-section-detail">
                                        <div className="icon-container-detail">
                                            <FaRegHeart />
                                        </div>
                                        <p className="author-detail">{selectedPost.author}</p>
                                    </div>
                                    <p className="p-date-detail">{selectedPost.publishDate}</p>
                                </div>
                            </div>
                            <Modal.Footer>
                                <Button onClick={() => typeOpenModal(selectedPost.id)} variant="warning">Edit</Button>
                                <Button onClick={() => setModalShow(false)}>Close</Button>
                            </Modal.Footer>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}
export default PostsList;