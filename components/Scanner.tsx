
import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { verifyLabel } from '../services/geminiService';
import { ScanResult } from '../types';

const Scanner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setImage(base64);
        await performVerification(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const performVerification = async (base64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const scanRes = await verifyLabel(base64);
      setResult(scanRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setLoading(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Water</h2>
        <p className="text-gray-500 mt-2">Check the authenticity of your Trilokneer bottle using AI</p>
      </div>

      <div className="w-full aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden relative group">
        {image ? (
          <img src={image} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <Camera size={48} className="animate-pulse" />
            <span className="text-sm font-medium">Capture bottle label</span>
          </div>
        )}
        
        {loading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-lg font-semibold animate-pulse">Analyzing Label...</p>
            <p className="text-xs text-gray-300 mt-1 italic">Verifying branding and quality marks</p>
          </div>
        )}
      </div>

      <div className="mt-8 w-full space-y-4">
        {!image ? (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-4 bg-[#E1261C] text-white rounded-xl font-bold text-lg shadow-lg shadow-red-200 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Camera size={24} />
            Scan Label
          </button>
        ) : (
          !loading && (
            <button 
              onClick={reset}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <RefreshCw size={24} />
              Rescan
            </button>
          )
        )}
        
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleCapture} 
        />
      </div>

      {result && (
        <div className={`mt-8 w-full p-6 rounded-2xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${result.isGenuine ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-start gap-4">
            {result.isGenuine ? (
              <CheckCircle2 className="text-green-600 shrink-0" size={32} />
            ) : (
              <AlertCircle className="text-red-600 shrink-0" size={32} />
            )}
            <div>
              <h3 className={`text-xl font-bold ${result.isGenuine ? 'text-green-800' : 'text-red-800'}`}>
                {result.isGenuine ? 'Genuine Product' : 'Verification Failed'}
              </h3>
              <p className="text-sm mt-1 text-gray-700 leading-relaxed">
                {result.feedback}
              </p>
              
              {result.details && (
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <DetailItem label="Brand Name" checked={result.details.brandNameFound} />
                  <DetailItem label="Trilokneer Logo" checked={result.details.logoDetected} />
                  <DetailItem label="FSSAI Mark" checked={result.details.fssaiVerified} />
                </div>
              )}

              <div className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Confidence: {(result.confidence * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem: React.FC<{ label: string; checked: boolean }> = ({ label, checked }) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
      <CheckCircle2 size={12} className="text-white" />
    </div>
    <span className={`text-xs ${checked ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{label}</span>
  </div>
);

export default Scanner;
