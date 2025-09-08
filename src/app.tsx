import React, { useState } from 'react';
import { Share2, RotateCcw } from 'lucide-react';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import ShareModal from './components/ShareModal';
import { BuyingProfile } from './types';

function App() {
  const [showShareModal, setShowShareModal] = useState(false);
  
  const [profile, setProfile] = useState<BuyingProfile>({
    communicationStyle: '',
    decisionMaking: '',
    pricePosition: '',
    financingExperience: '',
    creditConfidence: '',
    paymentPriority: '',
    vehiclePriority: '',
    tradeSituation: '',
    concerns: '',
    opportunities: '',
    approachNotes: '',
    timestamp: new Date().toISOString(),
    profileId: Math.random().toString(36).substring(2, 8).toUpperCase()
  });

  const handleChange = (field: keyof BuyingProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setProfile({
      communicationStyle: '',
      decisionMaking: '',
      pricePosition: '',
      financingExperience: '',
      creditConfidence: '',
      paymentPriority: '',
      vehiclePriority: '',
      tradeSituation: '',
      concerns: '',
      opportunities: '',
      approachNotes: '',
      timestamp: new Date().toISOString(),
      profileId: Math.random().toString(36).substring(2, 8).toUpperCase()
    });
  };

  const isProfileComplete = () => {
    return profile.communicationStyle && 
           profile.decisionMaking && 
           profile.pricePosition && 
           profile.creditConfidence;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Customer Buying Profile</h2>
              <p className="text-sm text-gray-600">Profile ID: {profile.profileId}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              <button
                onClick={() => setShowShareModal(true)}
                disabled={!isProfileComplete()}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                  isProfileComplete()
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Share Profile</span>
              </button>
            </div>
          </div>
        </div>

        <ProfileForm profile={profile} onChange={handleChange} />
        
        {!isProfileComplete() && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              💡 Complete the customer's communication style, decision making, price position, and credit confidence to enable sharing.
            </p>
          </div>
        )}
      </div>

      <ShareModal 
        profile={profile}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}

export default App;
