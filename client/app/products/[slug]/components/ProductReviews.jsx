"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Rating, Pagination, CircularProgress } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import styles from "./productDetail.module.css";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const ProductReviews = ({ productId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchReviews = async (pageNum = 1) => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${productId}?page=${pageNum}&limit=5`);
            setReviews(res.data.reviews || []);
            setTotalPages(res.data.totalPages || 1);
            setTotalReviews(res.data.totalReviews || 0);
            setPage(pageNum);
        } catch (err) {
            console.error("Failed to fetch reviews:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (productId) fetchReviews();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("Please login to submit a review.");
            return;
        }
        if (!rating || !comment.trim()) {
            setError("Rating and comment are required.");
            return;
        }

        setError("");
        setSuccess("");
        setSubmitLoading(true);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${productId}`, 
                { rating, comment }, 
                { withCredentials: true }
            );
            setSuccess("Review submitted successfully!");
            setComment("");
            setRating(5);
            fetchReviews(1);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit review.");
        }
        setSubmitLoading(false);
    };

    return (
        <div className={styles.reviewsWrapper}>
            <div className="row g-5">
                <div className="col-lg-5">
                    <div className={styles.reviewFormContainer}>
                        <h4 className={styles.reviewSectionTitle}>Write a Review</h4>
                        <p className={styles.reviewSubtitle}>Share your experience with this product.</p>
                        
                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        {success && <div className="alert alert-success py-2">{success}</div>}

                        <form onSubmit={handleSubmit} className={styles.reviewForm}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Your Rating</label>
                                <div>
                                    <Rating 
                                        value={rating} 
                                        onChange={(e, newValue) => setRating(newValue)} 
                                        icon={<StarRoundedIcon fontSize="large" sx={{color: "var(--color-gold)"}} />}
                                        emptyIcon={<StarRoundedIcon fontSize="large" sx={{color: "rgba(0,0,0,0.1)"}} />}
                                        size="large"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Your Review</label>
                                <textarea 
                                    className="form-control" 
                                    rows="4" 
                                    placeholder="Tell us what you liked or disliked..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    style={{ borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", resize: "none" }}
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="btn w-100 py-3 text-white fw-bold"
                                disabled={submitLoading}
                                style={{
                                    background: "var(--color-primary)",
                                    borderRadius: "12px",
                                    transition: "all 0.3s"
                                }}
                            >
                                {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
                            </button>
                            {!user && <p className="text-muted text-center mt-3" style={{fontSize: "13px"}}>You must be signed in to submit a review.</p>}
                        </form>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className={styles.reviewsListContainer}>
                        <h4 className={styles.reviewSectionTitle}>
                            Customer Reviews <span className="text-muted fs-6 fw-normal">({totalReviews})</span>
                        </h4>

                        {loading ? (
                            <div className="d-flex justify-content-center py-5">
                                <CircularProgress style={{ color: "var(--color-gold)" }} />
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-5">
                                <p className="text-muted mb-0">No reviews yet. Be the first to review this product!</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.reviewsList}>
                                    {reviews.map((rev) => (
                                        <motion.div 
                                            key={rev._id} 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={styles.reviewCard}
                                        >
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className={styles.reviewAvatar}>
                                                        <PersonOutlineRoundedIcon fontSize="small" />
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0 fw-bold">{rev.user?.uname || "Verified Customer"}</h6>
                                                        <span className="text-muted" style={{ fontSize: "12px" }}>
                                                            {new Date(rev.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Rating 
                                                    value={rev.rating} 
                                                    readOnly 
                                                    size="small"
                                                    icon={<StarRoundedIcon fontSize="inherit" sx={{color: "var(--color-gold)"}} />}
                                                    emptyIcon={<StarRoundedIcon fontSize="inherit" sx={{color: "rgba(0,0,0,0.1)"}} />}
                                                />
                                            </div>
                                            <p className={styles.reviewText}>{rev.comment}</p>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-center mt-4">
                                        <Pagination 
                                            count={totalPages} 
                                            page={page} 
                                            onChange={(e, value) => fetchReviews(value)}
                                            sx={{
                                                '& .MuiPaginationItem-root': {
                                                    color: 'var(--color-primary)',
                                                },
                                                '& .Mui-selected': {
                                                    backgroundColor: 'rgba(200, 155, 60, 0.2) !important',
                                                    color: 'var(--color-primary)',
                                                    fontWeight: 'bold',
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;
