import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthError() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRetry = () => {
    void navigate("/login");
  };

  const handleGoHome = () => {
    void navigate("/");
  };

  return (
    <div className="h-screen py-16 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full text-center transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Animated Error Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Pulsing background circle */}
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-2 bg-red-200 rounded-full animate-pulse"></div>

            {/* Error icon */}
            <div className="relative w-full h-full bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h1
            className={`text-3xl font-bold text-gray-800 transform transition-all duration-500 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Authentication Failed
          </h1>

          <p
            className={`text-gray-600 leading-relaxed transform transition-all duration-500 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            We encountered an issue while trying to sign you in. This could be
            due to:
          </p>

          <ul
            className={`text-sm text-gray-500 space-y-2 text-left bg-white p-4 rounded-lg shadow-sm transform transition-all duration-500 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Invalid credentials or expired session</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Network connectivity issues</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Third-party authentication service error</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div
          className={`space-y-3 transform transition-all duration-500 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <button
            onClick={handleRetry}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Try Again
          </button>

          <button
            onClick={handleGoHome}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md active:scale-95"
          >
            Go to Homepage
          </button>
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[Array.from(Array(6))].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-red-200 rounded-full opacity-30 animate-float-${i % 3}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(90deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(270deg); }
        }
        .animate-float-0 { animation: float-0 3s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 4s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 3.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default AuthError;
