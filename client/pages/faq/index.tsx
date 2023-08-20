import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faq: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What is the pricing for your product?',
      answer: 'Our pricing plans vary depending on the features and usage. Please visit our pricing page for more details.',
    },
    {
      question: 'How can I contact your support team?',
      answer: 'You can reach out to our support team by emailing support@example.com or using the live chat on our website.',
    },
    {
      question: 'Can I upgrade or downgrade my subscription?',
      answer: 'Yes, you can upgrade or downgrade your subscription at any time from your account settings.',
    },
    {
      question: 'Do you offer a free trial period?',
      answer: 'Yes, we offer a 14-day free trial period for new users to try out our product.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-gray-200 min-h-screen py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="container mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <button
              className="w-full flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
              <svg
                className={`w-6 h-6 transition-transform ${
                  expandedIndex === index ? 'transform rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedIndex === index && (
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default faq;
