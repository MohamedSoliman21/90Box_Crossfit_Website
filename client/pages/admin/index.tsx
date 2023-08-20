import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import Dashboard from "@/components/admin/dashboard";
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const Admin = () => {
  return (
    <div className="min-h-screen bg-scheduleBackground bg-cover bg-center flex justify-center items-center">
      {/* <Sidebar /> */}
      <div className="bg-primary flex flex-col w-10/12 h-[75%] rounded">
        <Header />
        <main className="flex-grow p-4">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
