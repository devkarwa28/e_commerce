"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarMonth, 
  AccessTime, 
  Person, 
  ArrowForward, 
  Search,
  Instagram,
  Twitter,
  Facebook,
} from "@mui/icons-material";
import { Box, Container, Typography, Grid, Button, Avatar } from "@mui/material";
import styles from "./blog.module.css";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Nuts & Seeds", "Healthy Living", "Recipes", "Logistics", "Sustainability"];

  const posts = [
    {
      id: 1,
      title: "The Ultimate Guide to Almond Varieties",
      category: "Nuts & Seeds",
      author: "Nutricia Expert",
      date: "Oct 12, 2026",
      readTime: "8 min read",
      excerpt: "Deep dive into the differences between California, Marcona, and Valencia almonds and how each can elevate your culinary creations.",
      img: "https://images.unsplash.com/photo-1508013861974-9f6347163835?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "5 Superfoods to Boost Your Energy Levels",
      category: "Healthy Living",
      author: "Dr. Sarah Miller",
      date: "Oct 08, 2026",
      readTime: "5 min read",
      excerpt: "Discover the nutritional powerhouses that can help you sustain energy throughout the day without the afternoon crash.",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Sustainable Sourcing: Our Journey to Carbon Neutral",
      category: "Sustainability",
      author: "Logistics Team",
      date: "Sep 28, 2026",
      readTime: "12 min read",
      excerpt: "How Nutrivia is leading the way in ethical and sustainable sourcing of premium nuts and dry fruits across more than 50 countries.",
      img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Roasted Pecans with Honey & Rosemary Recipe",
      category: "Recipes",
      author: "Chef Antoine",
      date: "Sep 15, 2026",
      readTime: "6 min read",
      excerpt: "A simple yet elegant appetizer that highlights the crunch and aroma of farm-fresh pecans with local organic honey.",
      img: "https://images.unsplash.com/photo-1596502284988-75059d6402ea?q=80&w=1471&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Impact of Global Trade on Food Quality",
      category: "Logistics",
      author: "Global Director",
      date: "Sep 02, 2026",
      readTime: "15 min read",
      excerpt: "An in-depth look at how temperature-controlled logistics ensure that quality remains constant from the farm to the retail shelf.",
      img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Cashews: The Versatile Nut You Need More Of",
      category: "Nuts & Seeds",
      author: "Nutritionist Leo",
      date: "Aug 20, 2026",
      readTime: "7 min read",
      excerpt: "From creamy sauces to crunchy snacking, explore the diverse ways cashews can transform your pantry staples into gourmet experiences.",
      img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className={styles.blogPageContainer}>
      <Head>
        <title>Blog | Nutrivia Insights & Healthy Living</title>
        <meta name="description" content="Discover the latest in healthy snacking, sustainable sourcing, and artisanal recipes with Nutrivia. Nourish your mind and body." />
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <Container maxWidth="lg">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.heroSubtitle}>Nutrivia Insights</span>
            <h1 className={styles.heroTitle}>Nourish Your Knowledge</h1>
            <Typography variant="body1" sx={{ opacity: 0.8, fontSize: "1.2rem", mb: 4 }}>
              Expert advice, artisanal recipes, and stories from our global sourcing journeys.
            </Typography>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Button size="large" sx={{ color: "#fff" }}><Instagram /></Button>
              <Button size="large" sx={{ color: "#fff" }}><Twitter /></Button>
              <Button size="large" sx={{ color: "#fff" }}><Facebook /></Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Featured & Main Feed */}
      <Container maxWidth="lg" className={styles.featuredContainer}>
        {/* Featured Post */}
        <motion.div 
          className={styles.featuredPost}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop" 
            alt="Featured Post" 
            className={styles.featuredImg}
          />
          <div className={styles.featuredContent}>
            <span className={styles.categoryTag}>Featured Post</span>
            <Typography variant="h2" className={styles.featuredTitle}>
              Decoding the Art of Ethical Sourcing
            </Typography>
            <Typography variant="body1" className={styles.featuredExcerpt}>
              Step into the heart of our farms and discover how Nutrivia maintains the delicate balance between high-volume efficiency and traditional ethical harvesting methods.
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <Avatar sx={{ bgcolor: "var(--color-primary)" }}>NK</Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Nutrivia Editorial Team</Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>Editorial Lead • 15 Min Read</Typography>
              </Box>
            </Box>
            <Button variant="contained" className={styles.subscribeBtn} endIcon={<ArrowForward />}>
              Read Full Story
            </Button>
          </div>
        </motion.div>

        {/* Categories Bar */}
        <Box mt={10}>
          <div className={styles.categoriesBar}>
            {categories.map((cat, i) => (
              <button 
                key={i} 
                className={`${styles.categoryBtn} ${activeCategory === cat ? styles.activeCategory : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search/Stats could go here */}
        </Box>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className={styles.blogGrid}
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredPosts.map((post, idx) => (
              <motion.div 
                key={post.id} 
                className={styles.blogCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={styles.cardImgWrapper}>
                  <img src={post.img} alt={post.title} className={styles.cardImg} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <CalendarMonth fontSize="inherit" /> {post.date}
                    <AccessTime fontSize="inherit" /> {post.readTime}
                  </div>
                  <Typography variant="h5" className={styles.cardTitle}>{post.title}</Typography>
                  <Typography variant="body2" sx={{ color: "var(--color-text-secondary)", mb: 3, lineBreak: "anywhere", height: "60px", overflow: "hidden" }}>
                    {post.excerpt}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: 1 }}>
                      {post.category}
                    </span>
                    <Button variant="text" sx={{ color: "var(--color-primary)", fontWeight: 700 }} endIcon={<ArrowForward />}>
                      Read
                    </Button>
                  </Box>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Newsletter Subscription */}
      <section className={styles.newsletterSection}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Join the Nutrivia Circular</Typography>
            <Typography variant="body1" sx={{ opacity: 0.7, maxWidth: "600px", margin: "0 auto" }}>
              Get the latest insights on nutrition, premium nut culture, and exclusive sustainable living tips delivered straight to your inbox.
            </Typography>
            <div className={styles.newsletterInput}>
              <input type="email" placeholder="Your Email Address" className={styles.inputField} />
              <button className={styles.subscribeBtn}>Join Now</button>
            </div>
            <Typography variant="caption" sx={{ mt: 3, display: "block", opacity: 0.4 }}>
              Zero spam. Just pure, premium knowledge. Unsubscribe anytime.
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Minimal Footer */}
      <Box sx={{ py: 3, textAlign: "center", backgroundColor: "var(--color-bg-dark)", color: "rgba(255,255,255,0.2)" }}>
        <Typography variant="caption">© 2026 Nutrivia Journal. Cultivating Premium Lifestyles.</Typography>
      </Box>
    </div>
  );
};

export default BlogPage;
