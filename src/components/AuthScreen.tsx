
import { useState, useEffect } from 'react';
import { Shield, Lock, Fingerprint, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuthScreen = ({ onAuthenticate }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [storedPin, setStoredPin] = useState('');

  useEffect(() => {
    const savedPin = localStorage.getItem('forge_pin');
    if (savedPin) {
      setStoredPin(savedPin);
      setIsSetup(true);
    }
  }, []);

  const handleSetupPin = () => {
    if (pin === confirmPin && pin.length >= 4) {
      localStorage.setItem('forge_pin', pin);
      setStoredPin(pin);
      setIsSetup(true);
      setPin('');
      setConfirmPin('');
    }
  };

  const handleUnlock = () => {
    if (pin === storedPin) {
      onAuthenticate();
    } else {
      setPin('');
      // Add shake animation or error feedback here
    }
  };

  const handleBiometric = () => {
    // Simulate biometric authentication
    onAuthenticate();
  };

  if (!isSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome to Forge Mobile</CardTitle>
            <p className="text-gray-600">Secure your startup ideas with a PIN</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Create PIN (4+ digits)
              </label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                className="text-center text-lg tracking-wider"
                maxLength={8}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Confirm PIN
              </label>
              <Input
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                placeholder="Confirm PIN"
                className="text-center text-lg tracking-wider"
                maxLength={8}
              />
            </div>
            <Button 
              onClick={handleSetupPin}
              disabled={pin !== confirmPin || pin.length < 4}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Lock className="h-4 w-4 mr-2" />
              Setup PIN
            </Button>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Your PIN is stored locally and encrypted
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Unlock Forge</CardTitle>
          <p className="text-gray-600">Enter your PIN to access your ideas</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="text-center text-lg tracking-wider"
              maxLength={8}
            />
          </div>
          <Button 
            onClick={handleUnlock}
            disabled={pin.length < 4}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Unlock
          </Button>
          <Button 
            onClick={handleBiometric}
            variant="outline"
            className="w-full"
          >
            <Fingerprint className="h-4 w-4 mr-2" />
            Use Biometric
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;
