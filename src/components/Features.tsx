export const Features = () => {
  const features = [
    {
      icon: "🔍",
      title: "Intelligent File Discovery",
      description: "Automatically scans and monitors your authorized folders, creating a living knowledge base that evolves with your work."
    },
    {
      icon: "🏷️",
      title: "Dynamic Tagging System", 
      description: "AI-powered semantic tagging learns from your interactions, making file discovery intuitive and contextual."
    },
    {
      icon: "🎯",
      title: "Multi-Modal Search",
      description: "Search across text, images, audio, and video with state-of-the-art AI models that understand context and meaning."
    },
    {
      icon: "📚",
      title: "Co-Reading Agent",
      description: "Your AI reading companion observes your focus and provides contextual insights from your entire knowledge base."
    },
    {
      icon: "🔐",
      title: "Privacy First",
      description: "Your files stay on your device. Only processed insights are shared with cloud AI, giving you control and peace of mind."
    },
    {
      icon: "⚡",
      title: "Desktop Intelligence",
      description: "Unique desktop agent capabilities that observe and assist across applications, impossible with web-based tools."
    }
  ]

  return (
    <section id="features" className="section">
      <h2 className="section-title">Powerful Features</h2>
      <p className="section-subtitle">Designed for the AI era, built with privacy in mind</p>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}