// App.jsx - Main Customer Profiling App for Bolt.new

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentStep, setCurrentStep] = useState('assessment');
  const [customerData, setCustomerData] = useState({
    customerName: '',
    salesperson: '',
    date: new Date().toLocaleDateString(),
    vehicleInterest: '',
    research: '',
    decision: '',
    motivation: '',
    communication: '',
    priceRange: '',
    timeline: '',
    notes: ''
  });
  const [profile, setProfile] = useState(null);
  const [savedProfiles, setSavedProfiles] = useState([]);

  // Load saved profiles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('customerProfiles');
    if (saved) {
      setSavedProfiles(JSON.parse(saved));
    }
  }, []);

  // Save profile to localStorage
  const saveProfile = (profileData) => {
    const newProfile = {
      id: Date.now(),
      ...customerData,
      profile: profileData,
      timestamp: new Date().toISOString()
    };
    const updated = [...savedProfiles, newProfile];
    setSavedProfiles(updated);
    localStorage.setItem('customerProfiles', JSON.stringify(updated));
  };

  const profiles = {
    'Analytical Researcher': {
      type: 'Cross-Comparison Buyer',
      description: 'Data-driven decision maker who values research and comparisons',
      traits: ['Extensive online research', 'Asks technical questions', 'Compares features/specs', 'Values statistics and facts'],
      triggers: ['Cost-benefit analysis', 'Reliability data', 'Detailed comparisons', 'ROI calculations'],
      fiApproach: ['Present clear data and statistics', 'Show repair cost vs. contract cost', 'Provide detailed coverage charts', 'Use phrases like "Based on industry data"', 'Allow time for review'],
      pitch: 'Let me show you the repair cost data for your specific model. Over 5 years, the average [MODEL] owner faces $2,800 in covered repairs. This service contract costs $1,200, potentially saving you $1,600 plus eliminating unexpected expenses.',
      products: ['GAP Insurance', 'Extended Warranty with detailed coverage', 'Maintenance plans with clear ROI'],
      color: '#3498db',
      successRate: '78%'
    },
    'Efficient Decider': {
      type: 'Decided Buyer',
      description: 'Brand loyal, goal-oriented buyer who values efficiency',
      traits: ['Brand loyal', 'Knows what they want', 'Quick decision maker', 'Values competitive advantages'],
      triggers: ['Confirmation of smart choice', 'Efficiency benefits', 'Premium options', 'Time-saving features'],
      fiApproach: ['Keep presentations concise', 'Focus on efficiency and convenience', 'Emphasize premium coverage', 'Avoid lengthy explanations', 'Present as logical next step'],
      pitch: 'You made an excellent choice with this Toyota. Smart buyers like you typically choose our premium coverage to protect their investment. It\'s comprehensive, efficient, and ensures you never worry about unexpected repairs.',
      products: ['Premium service packages', 'Comprehensive coverage', 'Priority service benefits'],
      color: '#e74c3c',
      successRate: '85%'
    },
    'Collaborative Explorer': {
      type: 'Undecided Buyer',
      description: 'Relationship-focused buyer who seeks guidance and collaboration',
      traits: ['Minimal prior research', 'Seeks collaboration', 'Values relationships', 'Influenced by testimonials'],
      triggers: ['Trust and rapport', 'Social proof', 'Emotional reassurance', 'Personal recommendations'],
      fiApproach: ['Build personal connection first', 'Use customer success stories', 'Focus on peace of mind', 'Address concerns personally', 'Take time to build trust'],
      pitch: 'I understand choosing protection can feel overwhelming. Let me share what the Martinez family told me last month - they were so grateful they had coverage when their transmission needed repair. It gave them complete peace of mind knowing their family was protected.',
      products: ['Comprehensive protection plans', 'Roadside assistance', 'Family-focused benefits'],
      color: '#27ae60',
      successRate: '72%'
    },
    'Life Transition Buyer': {
      type: 'Change Buyer',
      description: 'Purchase driven by life events, emotionally invested',
      traits: ['Life event motivated', 'Excited or anxious', 'Situation-focused', 'Time or budget conscious'],
      triggers: ['Safety and security', 'Life situation benefits', 'Emotional support', 'Practical advantages'],
      fiApproach: ['Acknowledge their situation positively', 'Focus on protection during transition', 'Emphasize reliability benefits', 'Tailor to their specific change'],
      pitch: 'Congratulations on your [LIFE EVENT]! This is such an exciting time. The last thing you want during this transition is to worry about unexpected car repairs. This coverage ensures your reliable transportation is completely protected.',
      products: ['Extended warranty', 'Comprehensive roadside assistance', 'Rental car coverage'],
      color: '#f39c12',
      successRate: '68%'
    },
    'Direct Commander': {
      type: 'Driver Personality',
      description: 'Dominant, results-oriented buyer who values control',
      traits: ['Direct communication', 'Results-oriented', 'Values control', 'Impatient with delays'],
      triggers: ['Control and power', 'Avoiding problems', 'Efficiency', 'Status benefits'],
      fiApproach: ['Be direct and confident', 'Focus on control and prevention', 'Present as smart business decision', 'Keep it brief and powerful'],
      pitch: 'Successful people like you don\'t leave things to chance. This coverage puts you in complete control - no surprises, no delays, just immediate authorization for repairs at any of our 1,500+ locations nationwide.',
      products: ['Premium coverage with priority service', 'Executive-level benefits', 'Concierge services'],
      color: '#8e44ad',
      successRate: '82%'
    },
    'Social Connector': {
      type: 'Influencer Personality',
      description: 'Outgoing, image-conscious buyer focused on relationships',
      traits: ['Social and talkative', 'Image conscious', 'Emotional decisions', 'Enjoys interaction'],
      triggers: ['Social benefits', 'Image enhancement', 'Lifestyle fit', 'Recognition'],
      fiApproach: ['Be enthusiastic and personal', 'Focus on social and image benefits', 'Use emotional appeals', 'Connect to lifestyle'],
      pitch: 'You\'ll absolutely love having this coverage! Imagine the confidence you\'ll feel knowing that whatever happens, you\'re completely covered. Your friends will be impressed by how smart you were to get this protection.',
      products: ['Comprehensive packages', 'Premium benefits', 'Social status features'],
      color: '#e67e22',
      successRate: '75%'
    }
  };

  const determineProfile = () => {
    const { research, decision, motivation, communication } = customerData;
    
    // Scoring system for profile determination
    let scores = {
      'Analytical Researcher': 0,
      'Efficient Decider': 0,
      'Collaborative Explorer': 0,
      'Life Transition Buyer': 0,
      'Direct Commander': 0,
      'Social Connector': 0
    };

    // Research behavior scoring
    if (research === 'extensive') {
      scores['Analytical Researcher'] += 3;
      scores['Efficient Decider'] += 1;
    } else if (research === 'some') {
      scores['Efficient Decider'] += 3;
      scores['Direct Commander'] += 2;
    } else if (research === 'minimal') {
      scores['Collaborative Explorer'] += 3;
      scores['Social Connector'] += 2;
    }

    // Decision style scoring
    if (decision === 'analytical') {
      scores['Analytical Researcher'] += 3;
    } else if (decision === 'quick') {
      scores['Efficient Decider'] += 3;
      scores['Direct Commander'] += 2;
    } else if (decision === 'collaborative') {
      scores['Collaborative Explorer'] += 3;
      scores['Social Connector'] += 1;
    }

    // Motivation scoring
    if (motivation === 'life-change') {
      scores['Life Transition Buyer'] += 4;
    } else if (motivation === 'loyalty') {
      scores['Efficient Decider'] += 3;
    } else if (motivation === 'upgrade') {
      scores['Direct Commander'] += 2;
      scores['Social Connector'] += 2;
    }

    // Communication scoring
    if (communication === 'direct') {
      scores['Direct Commander'] += 3;
      scores['Efficient Decider'] += 1;
    } else if (communication === 'social') {
      scores['Social Connector'] += 3;
      scores['Collaborative Explorer'] += 1;
    } else if (communication === 'detail-focused') {
      scores['Analytical Researcher'] += 3;
    } else if (communication === 'reserved') {
      scores['Collaborative Explorer'] += 2;
      scores['Analytical Researcher'] += 1;
    }

    // Find highest scoring profile
    const topProfile = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return profiles[topProfile];
  };

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateProfile = () => {
    const generatedProfile = determineProfile();
    setProfile(generatedProfile);
    setCurrentStep('results');
  };

  const handleSaveProfile = () => {
    if (profile) {
      saveProfile(profile);
      alert('Profile saved successfully!');
    }
  };

  const resetForm = () => {
    setCustomerData({
      customerName: '',
      salesperson: '',
      date: new Date().toLocaleDateString(),
      vehicleInterest: '',
      research: '',
      decision: '',
      motivation: '',
      communication: '',
      priceRange: '',
      timeline: '',
      notes: ''
    });
    setProfile(null);
    setCurrentStep('assessment');
  };

  const AssessmentForm = () => (
    <div className="assessment-form">
      <div className="form-header">
        <h2>🚗 Customer Profile Assessment</h2>
        <p>Quick 2-minute assessment to understand your customer better</p>
      </div>

      <div className="customer-info">
        <div className="form-row">
          <input
            type="text"
            placeholder="Customer Name"
            value={customerData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
          />
          <input
            type="text"
            placeholder="Salesperson"
            value={customerData.salesperson}
            onChange={(e) => handleInputChange('salesperson', e.target.value)}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Vehicle Interest"
            value={customerData.vehicleInterest}
            onChange={(e) => handleInputChange('vehicleInterest', e.target.value)}
          />
          <select
            value={customerData.priceRange}
            onChange={(e) => handleInputChange('priceRange', e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="under-25k">Under $25k</option>
            <option value="25k-35k">$25k - $35k</option>
            <option value="35k-50k">$35k - $50k</option>
            <option value="over-50k">Over $50k</option>
          </select>
        </div>
      </div>

      <div className="question-section">
        <div className="question-group">
          <label>1. How much research did they do before visiting?</label>
          <div className="radio-group">
            {[
              { value: 'extensive', label: 'Extensive - Knows specs, compared models, has notes' },
              { value: 'some', label: 'Some - General idea, knows preferred model' },
              { value: 'minimal', label: 'Minimal - "Just looking," needs guidance' }
            ].map(option => (
              <label key={option.value} className="radio-option">
                <input
                  type="radio"
                  name="research"
                  value={option.value}
                  checked={customerData.research === option.value}
                  onChange={(e) => handleInputChange('research', e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="question-group">
          <label>2. How do they make decisions?</label>
          <div className="radio-group">
            {[
              { value: 'analytical', label: 'Analytical - Needs facts, wants time to process' },
              { value: 'quick', label: 'Quick - "Let\'s get this done," decisive' },
              { value: 'collaborative', label: 'Collaborative - Seeks input, values discussion' }
            ].map(option => (
              <label key={option.value} className="radio-option">
                <input
                  type="radio"
                  name="decision"
                  value={option.value}
                  checked={customerData.decision === option.value}
                  onChange={(e) => handleInputChange('decision', e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="question-group">
          <label>3. What's motivating this purchase?</label>
          <div className="radio-group">
            {[
              { value: 'life-change', label: 'Life Change - New job, family, relocation' },
              { value: 'practical', label: 'Practical - Current car problems, needs replacement' },
              { value: 'upgrade', label: 'Upgrade - Wants better/newer, status-oriented' },
              { value: 'loyalty', label: 'Brand Loyalty - "I always buy Toyota"' }
            ].map(option => (
              <label key={option.value} className="radio-option">
                <input
                  type="radio"
                  name="motivation"
                  value={option.value}
                  checked={customerData.motivation === option.value}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="question-group">
          <label>4. Communication style observed?</label>
          <div className="radio-group">
            {[
              { value: 'direct', label: 'Direct - Confident, assertive, gets to the point' },
              { value: 'social', label: 'Social - Talkative, friendly, asks personal questions' },
              { value: 'reserved', label: 'Reserved - Quiet, thoughtful, listens more' },
              { value: 'detail-focused', label: 'Detail-Focused - Technical questions, wants specifics' }
            ].map(option => (
              <label key={option.value} className="radio-option">
                <input
                  type="radio"
                  name="communication"
                  value={option.value}
                  checked={customerData.communication === option.value}
                  onChange={(e) => handleInputChange('communication', e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="question-group">
          <label>Additional Notes (Optional)</label>
          <textarea
            placeholder="Any specific concerns, questions, or observations..."
            value={customerData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows="3"
          />
        </div>
      </div>

      <button 
        className="generate-btn"
        onClick={generateProfile}
        disabled={!customerData.research || !customerData.decision || !customerData.motivation || !customerData.communication}
      >
        Generate Customer Profile 🎯
      </button>
    </div>
  );

  const ProfileResults = () => (
    <div className="profile-results">
      <div className="profile-header" style={{ backgroundColor: profile.color }}>
        <h2>{profile.type}</h2>
        <p>{profile.description}</p>
        <div className="success-rate">Success Rate: {profile.successRate}</div>
      </div>

      <div className="customer-summary">
        <h3>Customer Summary</h3>
        <div className="summary-grid">
          <div><strong>Name:</strong> {customerData.customerName}</div>
          <div><strong>Salesperson:</strong> {customerData.salesperson}</div>
          <div><strong>Vehicle Interest:</strong> {customerData.vehicleInterest}</div>
          <div><strong>Price Range:</strong> {customerData.priceRange}</div>
        </div>
      </div>

      <div className="profile-section">
        <h3>🔍 Key Personality Traits</h3>
        <ul>
          {profile.traits.map((trait, index) => (
            <li key={index}>{trait}</li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h3>⚡ Primary Triggers</h3>
        <ul>
          {profile.triggers.map((trigger, index) => (
            <li key={index}>{trigger}</li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h3>🎯 F&I Approach Strategy</h3>
        <ul>
          {profile.fiApproach.map((approach, index) => (
            <li key={index}>{approach}</li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h3>🛡️ Recommended F&I Products</h3>
        <div className="product-tags">
          {profile.products.map((product, index) => (
            <span key={index} className="product-tag">{product}</span>
          ))}
        </div>
      </div>

      <div className="pitch-section">
        <h3>💬 Recommended Opening Pitch</h3>
        <div className="pitch-box">
          "{profile.pitch}"
        </div>
      </div>

      {customerData.notes && (
        <div className="notes-section">
          <h3>📝 Additional Notes</h3>
          <p>{customerData.notes}</p>
        </div>
      )}

      <div className="action-buttons">
        <button className="save-btn" onClick={handleSaveProfile}>
          💾 Save Profile
        </button>
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print for F&I
        </button>
        <button className="reset-btn" onClick={resetForm}>
          🔄 New Assessment
        </button>
        <button className="history-btn" onClick={() => setCurrentStep('history')}>
          📊 View History
        </button>
      </div>
    </div>
  );

  const ProfileHistory = () => (
    <div className="profile-history">
      <h2>📊 Customer Profile History</h2>
      <p>Track patterns and improve your F&I success rates</p>
      
      <div className="stats-overview">
        <div className="stat-card">
          <h3>{savedProfiles.length}</h3>
          <p>Total Profiles</p>
        </div>
        <div className="stat-card">
          <h3>{Math.round(savedProfiles.reduce((acc, p) => acc + parseInt(p.profile.successRate), 0) / savedProfiles.length || 0)}%</h3>
          <p>Avg Success Rate</p>
        </div>
      </div>

      <div className="history-list">
        {savedProfiles.map(savedProfile => (
          <div key={savedProfile.id} className="history-item">
            <div className="history-header">
              <h4>{savedProfile.customerName || 'Anonymous Customer'}</h4>
              <span className="profile-type" style={{ backgroundColor: savedProfile.profile.color }}>
                {savedProfile.profile.type}
              </span>
            </div>
            <div className="history-details">
              <p><strong>Vehicle:</strong> {savedProfile.vehicleInterest}</p>
              <p><strong>Salesperson:</strong> {savedProfile.salesperson}</p>
              <p><strong>Date:</strong> {new Date(savedProfile.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => setCurrentStep('assessment')}>
        ← Back to Assessment
      </button>
    </div>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚗 Toyota Customer Intelligence</h1>
        <p>Smart profiling for better F&I results</p>
      </header>

      <main className="app-main">
        {currentStep === 'assessment' && <AssessmentForm />}
        {currentStep === 'results' && <ProfileResults />}
        {currentStep === 'history' && <ProfileHistory />}
      </main>

      <footer className="app-footer">
        <p>Pedersen Toyota Sales Tool • Built for Sales & F&I Teams</p>
      </footer>
    </div>
  );
};

export default App;
