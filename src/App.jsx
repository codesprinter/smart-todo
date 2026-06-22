import { useState } from 'react'
import { CheckCircle2, Sparkles, Layers, ShieldCheck, ArrowRight } from 'lucide-react'

function App() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <CheckCircle2 className="feature-icon" size={24} style={{ color: 'var(--primary)' }} />,
      title: "Task Management",
      description: "Organize, prioritize, and complete your daily goals with absolute ease."
    },
    {
      icon: <Layers className="feature-icon" size={24} style={{ color: 'var(--primary)' }} />,
      title: "Sleek Interface",
      description: "Carefully designed UI with smooth glassmorphism effects and animations."
    },
    {
      icon: <ShieldCheck className="feature-icon" size={24} style={{ color: 'var(--primary)' }} />,
      title: "Local Persistence",
      description: "Your tasks are stored automatically and safely in your local browser storage."
    }
  ];

  return (
    <div className="app-wrapper">
      {/* Background glow effects */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <header className="app-header">
        <div className="header-container">
          <div className="logo-group">
            <Sparkles className="logo-icon" size={24} />
            <span className="logo-text">AetherTodo</span>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="github-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="badge">
            <span className="badge-pulse"></span>
            <span>React JS Project Ready</span>
          </div>
          <h1 className="hero-title">
            Simplify Your Flow with <span className="gradient-text">AetherTodo</span>
          </h1>
          <p className="hero-subtitle">
            A premium, high-performance To-Do application template built using React JS, Vite, and custom CSS variables.
          </p>
          <div className="cta-group">
            <button className="btn btn-primary">
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary">
              <span>Documentation</span>
            </button>
          </div>
        </section>

        <section className="features-grid">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`feature-card glass-panel interactive-hover ${hoveredCard === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 AetherTodo. Built with React JS & Vite. Designed for peak productivity.</p>
      </footer>
    </div>
  )
}

export default App
