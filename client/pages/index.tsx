import Loading from '@/components/Loading';
import { LanguageDirectionContext } from '@/helpers/langDirection';
import classNames from 'classnames'
import { Inter } from 'next/font/google'
import { useContext } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isRTL } = useContext(LanguageDirectionContext);

  return (
    <main className='min-h-screen bg-primary'>
      <div className={classNames(`${isRTL ? 'arabic' : 'english'} bg-primary`)}>
      <header className="bg-pyellow py-8 w-full h-fit">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-primary font-bold">Welcome to 90Box</h1>
          <p className="text-lg text-primary mt-4">Where impossible becomes reality</p>
        </div>
         
      </header>
      <div>
      <video className='w-full h-fit' autoPlay loop muted>
          <source src='http://localhost:3000/Media/home.mp4' type='video/mp4'/>
        </video>
      </div>
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Product Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <img src="/product1.jpg" alt="Product 1" className="w-full h-40 object-cover mb-4" />
              <h3 className="text-xl font-bold">Product 1</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <img src="/product2.jpg" alt="Product 2" className="w-full h-40 object-cover mb-4" />
              <h3 className="text-xl font-bold">Product 2</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <img src="/product3.jpg" alt="Product 3" className="w-full h-40 object-cover mb-4" />
              <h3 className="text-xl font-bold">Product 3</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Service Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold">Service 1</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold">Service 2</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold">Service 3</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}
