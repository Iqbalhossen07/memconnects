"use client";

import { useState, useEffect } from "react";

interface MathCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export default function MathCaptcha({ onVerify }: MathCaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Generate random numbers between 1 and 10 on mount
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAnswer(val);

    const isCorrect = parseInt(val) === num1 + num2;
    setIsValid(isCorrect);
    onVerify(isCorrect);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="text-gray-500">
          <i className="fas fa-robot text-xl"></i>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Security Check</p>
          <p className="text-xs text-gray-500">Solve this math problem to submit</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-[#6D5795]">{num1} + {num2} =</span>
        <input 
          type="number" 
          value={answer} 
          onChange={handleChange} 
          className={`w-20 border rounded-lg px-3 py-1.5 text-center font-bold outline-none transition ${
            answer === "" ? "border-gray-300 focus:border-[#F2852C]" :
            isValid ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"
          }`}
          placeholder="?"
        />
        {answer !== "" && (
          <div className="w-6 flex justify-center">
            {isValid ? (
              <i className="fas fa-check-circle text-green-500 text-lg"></i>
            ) : (
              <i className="fas fa-times-circle text-red-500 text-lg"></i>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
