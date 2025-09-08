export interface BuyingProfile {
  // Customer Personality & Communication Style
  communicationStyle: 'direct' | 'friendly' | 'detailed' | 'cautious' | '';
  decisionMaking: 'quick' | 'analytical' | 'consultative' | 'emotional' | '';
  pricePosition: 'budget-focused' | 'value-focused' | 'premium-focused' | 'payment-focused' | '';
  
  // Financing Behavior
  financingExperience: 'first-time' | 'experienced' | 'previous-toyota' | 'refinancing' | '';
  creditConfidence: 'confident' | 'concerned' | 'unsure' | 'rebuilding' | '';
  paymentPriority: 'lowest-payment' | 'shortest-term' | 'flexible' | 'cash-down-heavy' | '';
  
  // Vehicle Preferences
  vehiclePriority: 'reliability' | 'features' | 'fuel-economy' | 'safety' | 'style' | '';
  tradeSituation: 'no-trade' | 'positive-equity' | 'negative-equity' | 'unsure-value' | '';
  
  // Special Notes
  concerns: string;
  opportunities: string;
  approachNotes: string;
  
  // Metadata
  timestamp: string;
  profileId: string;
}
