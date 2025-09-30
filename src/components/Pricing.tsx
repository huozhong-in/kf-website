export const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: [
        { text: "50 AI requests per day", included: true },
        { text: "File scanning & monitoring", included: true },
        { text: "Dynamic tagging system", included: true },
        { text: "Multi-modal search", included: true },
        { text: "Basic co-reading agent", included: true },
        { text: "Priority support", included: false },
        { text: "Advanced agents", included: false }
      ],
      buttonText: "Get Started",
      buttonClass: "btn btn-outline",
      featured: false
    },
    {
      name: "VIP",
      price: "$19",
      period: "/month",
      features: [
        { text: "Unlimited AI requests", included: true },
        { text: "All Free features", included: true },
        { text: "Advanced co-reading agent", included: true },
        { text: "Custom agents (beta)", included: true },
        { text: "Priority support", included: true },
        { text: "Early access to features", included: true },
        { text: "Export & integration API", included: true }
      ],
      buttonText: "Upgrade to VIP",
      buttonClass: "btn btn-primary",
      featured: true,
      badge: "Most Popular"
    },
    {
      name: "Team/Enterprise",
      price: "Soon",
      period: "",
      features: [
        { text: "Everything in VIP", included: true },
        { text: "Team knowledge sharing", included: true },
        { text: "Centralized admin panel", included: true },
        { text: "SSO & advanced security", included: true },
        { text: "Custom deployment options", included: true },
        { text: "Dedicated support", included: true },
        { text: "Custom integrations", included: true }
      ],
      buttonText: "Join Waitlist",
      buttonClass: "btn btn-outline",
      featured: false
    }
  ]

  return (
    <section id="pricing" className="section">
      <h2 className="section-title">Choose Your Plan</h2>
      <p className="section-subtitle">Start free, upgrade when you need more power</p>
      
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
            {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
            <h3>{plan.name}</h3>
            <div className="pricing-price">{plan.price}<span>{plan.period}</span></div>
            <ul className="pricing-features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>
                  <span className={feature.included ? "check" : "cross"}>
                    {feature.included ? "✓" : "✗"}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>
            <a href="#" className={plan.buttonClass}>{plan.buttonText}</a>
          </div>
        ))}
      </div>
    </section>
  )
}