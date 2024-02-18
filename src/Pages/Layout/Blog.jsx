import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { toast } from "react-toastify";

export default function Blog() {
  const [blog, setBlog] = useState();
  const [categories, setCategories] = useState();
  const [count, setCount] = useState();
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogList();
    fetchCategories();
    fetchRecentPost();
  }, []);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const fetchBlogList = async () => {
    setLoading(true);
    let res = await axios.get("https://restapinodejs.onrender.com/api/allBlog");
    setBlog(res?.data);
    setLoading(false);
    
  };

  const fetchSingleBlogDeetails = async (id) => {
    setLoading(true);
    let res = await axios.get(
      `https://restapinodejs.onrender.com/api/blogdetails/${id}`
    );
    setBlog(res?.data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    let res = await axios.get(
      "https://restapinodejs.onrender.com/api/showallcategory"
    );
    setCategories(res?.data);
  };

  const fetchCategoriesBlog = async (id) => {
    setLoading(true);
    let res = await axios.get(
      `https://restapinodejs.onrender.com/api/category/post/${id}`
    );
    setBlog(res?.data);
    console.log(blog);
    setLoading(false);
  };

  const fetchRecentPost = async (id) => {
    let res = await axios.get(
      "https://restapinodejs.onrender.com/api/letest-post"
    );
    setCount(res?.data);
  };

  const fetchCommentData = async (id) => {
    let res = await axios.get(
      `https://restapinodejs.onrender.com/api/comment/${id}`
    );
    setComment(res?.data);
  };

  const handleCategoryBlog = (id) => {
    fetchCategoriesBlog(id);
  };

  const handleSinglBlogDetails = (id) => {
    fetchSingleBlogDeetails(id);
    fetchCommentData(id);
  };

  const [search, setSearch] = useState({
    search: "",
  });

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (id) => {
    console.log(id, "ksjdnkjsnd");
    id.e.preventDefault();
    const res = await axios.get(
      `https://restapinodejs.onrender.com/api/search/${id.search.search}`,
      search
    );
    setBlog(res);
  };

  console.log(blog);

  const fetchphoto = (id) => {
    return `https://restapinodejs.onrender.com/api/blog/image/${id}`;
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [postComment, setPostComment] = useState("");

  const handleChangeComment = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmitComment = async (id) => {
    id.e.preventDefault();
    console.log(id, "askdjnfkjsndfkj");
    const res = await axios.post(
      `https://restapinodejs.onrender.com/api/blog/${id.id}/comment/create`,
      user
    );
    setComment(res?.data);
    toast("Comment Added Successfully");
  };

  return (
    <div>
      <section id="blog" className="blog">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-8 entries">
              {loading ? (
                <Shimmer />
              ) : Array.isArray(blog?.data) ? (
                blog?.data?.length!==0 ? (
                  blog?.data?.map((item, index) => {
                    return blog?.data.length ? (
                      <article className="entry" data-aos="fade-up">
                        <div className="entry-img " style={{}}>
                          <img
                            src={`${fetchphoto(item._id)}`}
                            alt=""
                            className="img-fluid"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                        <h2 className="entry-title">
                          <Link
                            onClick={() => handleSinglBlogDetails(item._id)}
                            style={{ textDecoration: "none" }}
                          >
                            {item.title}
                          </Link>
                        </h2>
                        <div className="entry-meta">
                          <ul>
                            <li className="d-flex align-items-center">
                              <i className="icofont-user" />{" "}
                              <Link
                                onClick={() => handleSinglBlogDetails(item._id)}
                                style={{ textDecoration: "none" }}
                                href="blog-single.html"
                              >
                                John Doe
                              </Link>
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="icofont-wall-clock" />{" "}
                              <Link
                                onClick={() => handleSinglBlogDetails(item._id)}
                                style={{ textDecoration: "none" }}
                              >
                                <time dateTime={item.createdAt}>
                                  {formatDate(item.createdAt)}
                                </time>
                              </Link>
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="icofont-comment" />{" "}
                              <Link
                                onClick={() => handleSinglBlogDetails(item._id)}
                                style={{ textDecoration: "none" }}
                              >
                                {item.comment_count}Comments
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="entry-content">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.postText
                                .split(/[\s,]+/)
                                .slice(0, 60)
                                .join(" "),
                            }}
                          />

                          <div className="read-more">
                            <a href="blog-single.html">Read More</a>
                          </div>
                        </div>
                      </article>
                    ) : (
                      <p style={{ margin: "100px" }}>No Data Found</p>
                    );
                  })
                ) : 
                  <h1>No Blogs Are Found </h1>
                
              ) : loading ? (
                <Shimmer />
              ) : (
                <div>
                  <article className="entry entry-single" data-aos="fade-up">
                    <div className="entry-img">
                      <img
                        src={`${fetchphoto(blog?.data?._id)}`}
                        alt=""
                        className="img-fluid"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                    <h2 className="entry-title">
                      <a style={{ textDecoration: "none" }}>
                        {blog?.data?.title}
                      </a>
                    </h2>
                    <div className="entry-meta">
                      <ul>
                        <li className="d-flex align-items-center">
                          <i className="icofont-user" />{" "}
                          <Link
                            style={{ textDecoration: "none" }}
                            href="blog-single.html"
                          >
                            John Doe
                          </Link>
                        </li>
                        <li className="d-flex align-items-center">
                          <i className="icofont-wall-clock" />{" "}
                          <Link
                            style={{ textDecoration: "none" }}
                          >
                            <time dateTime={blog?.data?.createdAt}>
                              {formatDate(blog?.data?.createdAt)}
                            </time>
                          </Link>
                        </li>
                        <li className="d-flex align-items-center">
                          <i className="icofont-comment" />{" "}
                          <Link
                            
                            style={{ textDecoration: "none" }}
                          >
                            {blog?.data?.comments.length}Comments
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="entry-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blog?.data?.postText,
                        }}
                      />
                    </div>
                  </article>
                  <div className="reply-form">
                    <h4>Leave a Reply</h4>
                    <p>
                      Your email address will not be published. Required fields
                      are marked *{" "}
                    </p>
                    <form action="">
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <input
                            name="name"
                            value={user.name}
                            onChange={handleChangeComment}
                            type="text"
                            className="form-control"
                            placeholder="Your Name*"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <input
                            name="email"
                            value={user.email}
                            onChange={handleChangeComment}
                            type="text"
                            className="form-control"
                            placeholder="Your Email*"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col form-group">
                          <textarea
                            name="comment"
                            value={user.comment}
                            onChange={handleChangeComment}
                            className="form-control"
                            placeholder="Your Comment*"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleSubmitComment({
                            e: e,
                            id: blog?.data?._id,
                          });
                          setTimeout(() => {
                            fetchCommentData(blog?.data?._id);
                            setUser({
                              name: "",
                              email: "",
                              comment: "",
                            });
                          }, 2000);
                        }}
                      >
                        Post Comment
                      </button>
                    </form>
                  </div>
                  <div className="blog-comments" data-aos="fade-up">
                    <h4 className="comments-count">Comments</h4>
                    {comment?.post?.comment?.comments?.map((i) => {
                      return (
                        <div id="comment-1" className="comment clearfix">
                          <h5>
                            <Link style={{ textDecoration: "none" }}>
                              {i.name.toUpperCase()}
                            </Link>{" "}
                          </h5>
                          <time dateTime={i?.createdAt}>
                            {formatDate(i?.createdAt)}
                          </time>{" "}
                          <p>{i.comment}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {/* End blog entries list */}
            <div className="col-lg-4">
              <div className="sidebar" data-aos="fade-left">
                <h3 className="sidebar-title">Search</h3>
                <div className="sidebar-item search-form">
                  <form action="">
                    <input
                      type="text"
                      name="search"
                      value={search.search}
                      onChange={handleChange}
                    />
                    <button
                      onClick={(e) => {
                        handleSubmit({ e: e, search: search });
                      }}
                    >
                      <i className="icofont-search" />
                    </button>
                  </form>
                </div>
                {/* End sidebar search formn*/}
                <h3 className="sidebar-title">Categories</h3>
                <p onClick={fetchBlogList} style={{ cursor: "pointer" }}>
                  All Blog List
                </p>
                <div className="sidebar-item categories">
                  <ul>
                    {Array.isArray(categories?.data) &&
                      categories?.data?.map((item, id) => {
                        return (
                          <li onClick={() => handleCategoryBlog(item._id)}>
                            <Link style={{ textDecoration: "none" }}>
                              {item.category}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                {/* End sidebar categories*/}
                <h3 className="sidebar-title">Recent Posts</h3>
                <div className="sidebar-item recent-posts">
                  {count?.data?.map((i) => {
                    return (
                      <div className="post-item clearfix">
                        <img src={`${fetchphoto(i._id)}`} alt="" />
                        <h4>
                          <Link
                            onClick={() => handleSinglBlogDetails(i._id)}
                            style={{ textDecoration: "none" }}
                          >
                            {i.title}{" "}
                          </Link>
                        </h4>
                        <time dateTime={i.createdAt}>
                          {formatDate(i.createdAt)}
                        </time>
                      </div>
                    );
                  })}
                </div>
                {/* End sidebar recent posts*/}
              </div>
              {/* End sidebar */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
