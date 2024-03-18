/* eslint-disable tailwindcss/no-contradicting-classname */
import PageNav from "../components/PageNav";
import { Button, Link } from "@nextui-org/react";

const Homepage = () => {
  return (
    <>
      <PageNav />
      <main className=" h-[calc(100vh-6rem)] bg-[linear-gradient(rgba(36,42,46,0.8),rgba(36,42,46,0.8)),url('/images/bg.jpg')] bg-cover bg-center px-20 pb-10 pt-24">
        <section className="flex flex-col items-center justify-center gap-24 text-center leading-7 text-slate-100">
          <h1 className="flex flex-col gap-3 text-7xl font-bold">
            <span>ملک از شما</span> <span>فروش از ما</span>
          </h1>
          <h2 className="text-xl">
            آیا می‌خواهید خانه یا ملک خود را بفروشید؟ با پلتفرم مروارید
            می‌توانید این کار را به راحتی و با اطمینان انجام دهید. با امکانات
            کامل و قابل اعتماد این پلتفرم، همه چیز برای شما آماده است. فقط کافی
            است ثبت نام کنید و به دنیایی از فرصت‌های جدید در بازار مسکن وارد
            شوید.
          </h2>
          <div>
            <div className="mb-3">
              <Button
                as={Link}
                href="/signup"
                color="primary"
                size="lg"
                className="m-2 text-xl font-bold"
              >
                همین الان ثبت نام کن!
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl  p-1 px-7">
              <span>حساب کاربری دارید؟</span>
              <Button as={Link} href="/login" className="ms-2" size="sm">
                ورود
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Homepage;
