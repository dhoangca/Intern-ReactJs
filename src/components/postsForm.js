import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../styles/postForm.css';

const PostsForm = (props) => {
    const {modalState, initialValues} = props;

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Hãy nhập tiêu đề'),
        content: Yup.string().required('Hãy nhập nội dung'),
        author: Yup.string().required('Hãy nhập tên tác giả'),
        category: Yup.string().required('Hãy nhập thể loại'),
        featuredImage: Yup.string().required('Hình ảnh không được để trống'),
    });

    return (
        <div className='form-container'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm}) => {
                    resetForm();
                    props.onSubmit(values);
                }}
            >
                <Form className='form'>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <Field type="text" name="title" className="form-control" />
                        <ErrorMessage name="title" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <Field type="text" name="content" className="form-control" />
                        <ErrorMessage name="content" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <Field type="text" name="author" className="form-control" />
                        <ErrorMessage name="author" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="publishDate">Publish Date:</label>
                        <Field type="text" name="publishDate" className="form-control" />
                        <ErrorMessage name="publishDate" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <Field type="text" name="category" className="form-control" />
                        <ErrorMessage name="category" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="featuredImage">Featured Image:</label>
                        <Field type="text" name="featuredImage" className="form-control" />
                        <ErrorMessage name="featuredImage" component="div" className="error-message" />
                    </div>

                    <button type="submit" className="btn btn-primary">{modalState ? 'Add new' : 'Save'}</button>
                </Form>
            </Formik>
        </div>
    )
}

PostsForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default PostsForm;
