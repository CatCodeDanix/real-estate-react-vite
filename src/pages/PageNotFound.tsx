import { Link } from "@nextui-org/react";
import PageNotFoundSvg from "../components/PageNotFoundSvg";
import { useAuth } from "../contexts/AuthContext";

const PageNotFound = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <PageNotFoundSvg />
      <div className="flex flex-col items-center justify-center">
        <p className="mt-12 text-2xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
          صفحه پیدا نشد :(
        </p>
        <Link
          href={isAuthenticated ? "/app" : "/"}
          className="mt-12 flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-gray-100 transition duration-150 hover:bg-blue-700"
          title="صفحه اصلی"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>بازگشت به صفحه اصلی</span>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
