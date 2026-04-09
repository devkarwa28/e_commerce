"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CalendarMonth,
  Person,
  Search,
  ArrowForward,
  BookmarkBorder,
  AccessTime,
  Email,
  RssFeed,
  LocalPostOffice,
  ArrowRightAlt
} from "@mui/icons-material";
import styles from "./blog.module.css";

const BlogPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);


  const featuredPost = {
    id: 1,
    title: "10 Superfoods to Boost Your Immunity This Season",
    excerpt: "Discover the power of nature's best ingredients. From walnuts to organic honey, we explore how adding simple superfoods to your daily diet can transform your health and vitality.",
    category: "Health & Wellness",
    author: "Dr. Sarah Mitchell",
    date: "Oct 24, 2024",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1471&auto=format&fit=crop"
  };

  const blogPosts = [
    {
      id: 2,
      title: "The Art of Slow Roasting: Why It Matters for Your Nuts",
      excerpt: "Not all roasted nuts are created equal. Learn why our signature slow-roasting process preserves essential oils and maximizes flavor profile.",
      category: "Culinary Tips",
      author: "Chef Julian",
      date: "Oct 20, 2024",
      readTime: "4 min read",
      img: "https://images.unsplash.com/photo-1536530221910-2985141262f1?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Sustainable Sourcing: From Farm to Your Table",
      excerpt: "Join us on a journey across the globe as we partner with ethical farmers to bring you the highest quality organic produce while supporting local communities.",
      category: "Our Journey",
      author: "Elena Rodriguez",
      date: "Oct 18, 2024",
      readTime: "8 min read",
      img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Healthy Snack Ideas for Busy Professionals",
      excerpt: "Elevate your office snack game with these quick, nutritious, and delicious combinations that will keep you focused throughout the workday.",
      category: "Lifestyle",
      author: "Mark Thompson",
      date: "Oct 15, 2024",
      readTime: "5 min read",
      img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Vegan Protein Sources: The Power of Dry Fruits",
      excerpt: "Unlock the protein potential of almonds, cashews, and pistachios. A comprehensive guide for anyone looking to increase plant-based protein intake.",
      category: "Health & Wellness",
      author: "Dr. Sarah Mitchell",
      date: "Oct 12, 2024",
      readTime: "7 min read",
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1384&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "The Ultimate Guide to Storing Your Dry Fruits",
      excerpt: "Keep your snacks fresh for longer. Expert advice on temperature, containers, and humidity control to ensure peak freshness.",
      category: "Food Safety",
      author: "Quality Team",
      date: "Oct 08, 2024",
      readTime: "3 min read",
      img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1471&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Nutrivia's Holiday Gift Guide 2024",
      excerpt: "Give the gift of health. Explore our premium range of luxury gift sets and hampers perfect for the upcoming festive season.",
      category: "Gifting",
      author: "Store Team",
      date: "Oct 05, 2024",
      readTime: "5 min read",
      img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1374&auto=format&fit=crop"
    }
  ];

  const categories = [
    { name: "Health & Wellness", count: 12 },
    { name: "Culinary Tips", count: 8 },
    { name: "Our Journey", count: 5 },
    { name: "Lifestyle", count: 15 },
    { name: "Food Safety", count: 4 },
    { name: "Gifting", count: 7 }
  ];

  return (
    <div className={styles.blogContainer}>
      <head>
        <title>Nutrivia Blog | Insights into Healthy Living</title>
        <meta name="description" content="Explore Nutrivia's blog for the latest insights on superfoods, healthy lifestyle, sustainable sourcing, and culinary tips." />
      </head>

      <section className={styles.hero} ref={heroRef}>
        <motion.div className={styles.heroBg} style={{ y: heroY, opacity: heroOpacity }} />
        <div className={styles.heroOverlay} />
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.heroSubtitle}>Insights & Inspiration</span>
          <h1 className={styles.heroTitle}>The <span className={styles.goldText}>Nutrivia</span> Journal</h1>
          <p className={styles.heroDesc}>
            Your premium guide to a healthier, more vibrant lifestyle. Discover expert tips, ethical sourcing stories, and culinary inspiration.
          </p>
        </motion.div>
      </section>

      <div className="container">
        <section className={styles.featuredSection}>
          <motion.div 
            className={styles.featuredCard}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.featuredImgWrapper}>
              <img src={featuredPost.img} alt={featuredPost.title} className={styles.featuredImg} />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.categoryTag}>{featuredPost.category}</span>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
              
              <div className={styles.postMeta}>
                <div className={styles.metaItem}>
                  <Person sx={{ fontSize: 18 }} /> {featuredPost.author}
                </div>
                <div className={styles.metaItem}>
                  <CalendarMonth sx={{ fontSize: 18 }} /> {featuredPost.date}
                </div>
                <div className={styles.metaItem}>
                  <AccessTime sx={{ fontSize: 18 }} /> {featuredPost.readTime}
                </div>
              </div>
              
              <motion.button 
                className={styles.readMoreBtn}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none', padding: 0 }}
                whileHover={{ gap: '15px' }}
              >
                Continue Reading <ArrowForward sx={{ fontSize: 18 }} />
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* ─── BLOG GRID & SIDEBAR ─── */}
        <section className={styles.blogLoopSection}>
          <div className="row g-5">
            {/* Main Content */}
            <div className="col-lg-8">
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>Latest Stories</h2>
                  <div className={styles.sectionLine}></div>
                </div>
              </div>

              <div className="row g-4">
                {blogPosts.map((post, idx) => (
                  <div className="col-md-6" key={post.id}>
                    <motion.div 
                      className={styles.blogCard}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className={styles.cardImgWrapper}>
                        <img src={post.img} alt={post.title} className={styles.cardImg} />
                        <div className={styles.categoryTag} style={{ position: 'absolute', top: '15px', left: '15px', background: 'rgba(255,255,255,0.9)', marginBottom: 0 }}>
                          {post.category}
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.postMeta} style={{ marginBottom: '0.8rem', fontSize: '0.75rem' }}>
                          <span className={styles.metaItem}><CalendarMonth sx={{ fontSize: 14 }} /> {post.date}</span>
                          <span className={styles.metaItem}><AccessTime sx={{ fontSize: 14 }} /> {post.readTime}</span>
                        </div>
                        <h3 className={styles.cardTitle}>{post.title}</h3>
                        <p className={styles.cardExcerpt}>{post.excerpt}</p>
                        
                        <a href="#" className={styles.readMoreBtn}>
                          Read Full Article <ArrowRightAlt />
                        </a>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Pagination Placeholder */}
              <div className="d-flex justify-content-center mt-5">
                <motion.button 
                  className={styles.subscribeBtn} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Articles
                </motion.button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
                {/* Search */}
                <div className="mb-5">
                  <div className={styles.inputGroup} style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
                    <input type="text" placeholder="Search insights..." className={styles.inputField} />
                    <button className={styles.subscribeBtn} style={{ padding: '8px 12px' }}><Search /></button>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-5">
                  <h4 className={styles.sectionTitle} style={{ fontSize: '1.4rem' }}>Categories</h4>
                  <div className={styles.sectionLine} style={{ width: '40px' }}></div>
                  <ul className={styles.categoryList}>
                    {categories.map((cat, idx) => (
                      <li key={idx} className={styles.categoryItem}>
                        <span>{cat.name}</span>
                        <span className={styles.categoryCount}>{cat.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter Box */}
                <div className={styles.newsletterSection} style={{ padding: '2rem', borderRadius: '20px' }}>
                  <div className={styles.newsletterContent}>
                    <LocalPostOffice sx={{ fontSize: 40, color: 'var(--color-gold)', mb: 2 }} />
                    <h4 style={{ fontSize: '1.5rem', fontWeight: 700, mb: 2 }}>The Nutrivia Letter</h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.8, mb: 3 }}>
                      Weekly health hacks and exclusive recipes delivered to your inbox.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '0.9rem' }} 
                      />
                      <button className={styles.subscribeBtn} style={{ width: '100%' }}>Join Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LARGE NEWSLETTER CTA ─── */}
        <section className={styles.newsletterSection}>
          <div className={styles.decorCircle + ' ' + styles.decor1}></div>
          <div className={styles.decorCircle + ' ' + styles.decor2}></div>
          
          <div className={styles.newsletterContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.newsletterTitle}>Stay Ahead of the Curve</h2>
              <p className={styles.newsletterDesc}>
                Join 10,000+ health enthusiasts who receive our curated wellness newsletter every Tuesday. No spam, just pure goodness.
              </p>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="Enter your email address" className={styles.inputField} />
                <button className={styles.subscribeBtn}>Subscribe Now</button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ─── FOOTER BELT ─── */}
      <div style={{ background: 'var(--color-primary)', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '1.5rem', fontSize: '0.7rem', letterSpacing: '2px', marginTop: '5rem' }}>
        NUTRIVIA DIGITAL BUREAU — COPYRIGHT 2024
      </div>
    </div>
  );
};

export default BlogPage;
