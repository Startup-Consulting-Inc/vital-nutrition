import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, type Html5QrcodeResult } from 'html5-qrcode';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const SCANNER_ID = 'barcode-scanner-video';

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasScanned = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode(SCANNER_ID);
    scannerRef.current = scanner;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 150 },
      aspectRatio: 1.777,
    };

    scanner
      .start(
        { facingMode: 'environment' },
        config,
        (decodedText: string, _result: Html5QrcodeResult) => {
          if (hasScanned.current) return;
          hasScanned.current = true;
          onScan(decodedText);
        },
        undefined
      )
      .then(() => {
        setIsScanning(true);
      })
      .catch((err) => {
        console.error('Barcode scanner failed:', err);
        setError(
          err?.message?.includes('Permission')
            ? 'Camera permission denied. Please allow camera access and try again.'
            : 'Could not start barcode scanner. Make sure your device has a camera.'
        );
      });

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl">
        <div className="p-4 border-b border-deep/5 flex items-center justify-between">
          <h3 className="text-sm font-medium text-deep">Scan Barcode</h3>
          <button
            onClick={onClose}
            className="text-deep/40 hover:text-deep transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {error ? (
            <div className="p-4 rounded-xl bg-[#d95c39]/5 border border-[#d95c39]/15 text-center">
              <p className="text-sm text-[#d95c39] font-medium mb-1">Scanner Error</p>
              <p className="text-xs text-deep/60">{error}</p>
            </div>
          ) : (
            <>
              <div
                id={SCANNER_ID}
                className="w-full rounded-xl overflow-hidden bg-black"
                style={{ minHeight: 220 }}
              />
              {!isScanning && (
                <div className="flex items-center justify-center py-8">
                  <div className="w-5 h-5 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
                  <span className="ml-2 text-sm text-deep/60">Starting camera...</span>
                </div>
              )}
              <p className="text-xs text-deep/50 text-center mt-3">
                Point your camera at a product barcode. Data powered by Open Food Facts.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
