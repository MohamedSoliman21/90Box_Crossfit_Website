import React from 'react';

const privacy: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">1. Information Collection</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et hendrerit sem. Morbi ut odio feugiat,
            rutrum tortor in, lobortis urna. Donec sit amet enim nec justo finibus vulputate. Curabitur commodo
            elementum mauris, nec luctus justo lacinia a.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <h2 className="text-xl font-semibold mb-4">2. Use of Information</h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer venenatis
            volutpat ex non maximus. Etiam ultricies lacus ut nisi luctus, at tincidunt purus condimentum. Vivamus
            pulvinar, enim non efficitur feugiat, tortor neque ullamcorper urna, ac vestibulum turpis elit at dui.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
          <p>
            Quisque laoreet purus et erat semper, ut fermentum neque euismod. Ut dignissim, elit a pellentesque
            ullamcorper, est metus interdum felis, id commodo risus neque eu ex. Sed et nulla eros. Aliquam ultrices
            tortor id fringilla scelerisque. Sed aliquet consequat nisl, nec consequat dui consectetur ut.
          </p>
        </div>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default privacy;
