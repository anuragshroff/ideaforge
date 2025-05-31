
import { useState, useEffect } from 'react';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  const saveApiKey = (key: string) => {
    if (key.trim()) {
      setApiKey(key);
      setShowApiKeyInput(false);
      localStorage.setItem('gemini_api_key', key);
    }
  };

  return {
    apiKey,
    setApiKey,
    showApiKeyInput,
    saveApiKey
  };
};
