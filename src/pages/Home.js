import React from "react";
import "../design/Home.css";

function Home() {
  const features = [
    {
      icon: "♙",
      title: "HR Management",
      description: "Manage your employees and build a stronger team.",
      link: "/employees",
    },
    {
      icon: "▥",
      title: "Reports & Analytics",
      description: "Turn business data into powerful insights.",
      link: "/reports",
    },
    {
      icon: "▣",
      title: "Project Management",
      description: "Organize projects, track progress and deliver.",
      link: "/projects",
    },
    {
      icon: "＄",
      title: "Financial Overview",
      description: "Monitor revenue, expenses and company growth.",
      link: "/finance",
    },
  ];

  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-label">
            WELCOME TO OMNICORE
          </span>

          <h1>
            Drive Growth.
            <br />
            <span>Together.</span>
          </h1>

          <p>
            Powerful tools. Smarter insights.
            A stronger business.
          </p>

          <a href="/dashboard" className="hero-button">
            Explore Platform <span>→</span>
          </a>
        </div>

        <div className="hero-decoration">O</div>
        <div className="hero-bottom-line"></div>
      </section>

      {/* ABOUT SECTION */}
      <section className="home-about-section">

        <div className="about-text">
          <span className="section-label">
            ABOUT OMNICORE
          </span>

          <h2>
            Innovation. Efficiency.
            <span> Real Impact.</span>
          </h2>

          <p>
            Omnicore is your all-in-one business management
            platform, designed to streamline operations,
            improve productivity and help your company
            achieve more.
          </p>

          <div className="about-line"></div>

          <div className="about-highlight">
            <span>✦</span>
            <p>Smarter management. Stronger results.</p>
          </div>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
            alt="Elegant modern business office"
          />
          <div className="image-caption">
            <span>OMNICORE</span>
            <p>Where business meets innovation</p>
          </div>
        </div>

      </section>

      {/* STATISTICS */}
      <section className="home-stats">

        <div className="stat-item">
          <div className="stats-icon">♙</div>
          <div>
            <strong>12K+</strong>
            <span>Active Users</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stats-icon">▥</div>
          <div>
            <strong>98%</strong>
            <span>Satisfaction Rate</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stats-icon">↗</div>
          <div>
            <strong>250%</strong>
            <span>Growth YoY</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stats-icon">◇</div>
          <div>
            <strong>99.9%</strong>
            <span>System Uptime</span>
          </div>
        </div>

      </section>

      {/* QUICK ACCESS */}
      <section className="home-features-section">

        <div className="features-heading">
          <div>
            <span className="section-label">
              EXPLORE OUR PLATFORM
            </span>
            <h2>Everything in One Place</h2>
          </div>

          <span className="features-number">01 — 04</span>
        </div>

        <div className="home-quick-links">
          {features.map((feature, index) => (
            <a
              href={feature.link}
              className="home-feature-card"
              key={feature.title}
            >
              <div className="feature-card-top">
                <div className="feature-icon gold">
                  {feature.icon}
                </div>
                <span className="feature-number">
                  0{index + 1}
                </span>
              </div>

              <div className="feature-card-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-link">
                  Explore More <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <strong>OMNICORE MANAGEMENT</strong>
        <span>© 2026 All Rights Reserved</span>
        <span>Building a smarter tomorrow.</span>
      </footer>

    </div>
  );
}

export default Home;
