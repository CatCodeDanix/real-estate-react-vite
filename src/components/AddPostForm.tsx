import { useRef } from "react";
import CustomInput from "./CustomInput";
import Form, { type FormHandle } from "./Form";
import { Textarea, Button } from "@nextui-org/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export interface FormData {
  phone: string;
  address: string;
  description?: string;
  id?: string;
}

export interface Post extends FormData {
  position: { lat: number; lng: number };
  userId: number;
}

const AddPostForm = () => {
  const addPostForm = useRef<FormHandle>(null);

  const [searchParams] = useSearchParams();
  const { addPost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { theme } = useTheme();

  const darkClassess = theme === "dark" ? "border-3 border-blue-600" : "";

  function handleAddPost(post: unknown) {
    const formData = post as FormData;
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const userId = user ? user.id! : 0;
    console.log("userId is:  ", userId);
    if (lat && lng) {
      const postData: Post = {
        ...formData,
        userId,
        position: { lat: +lat, lng: +lng },
      };
      addPost(postData)
        .then(() => {
          navigate("/app/my-posts");
          console.log("Post added successfully");
        })
        .catch(() => {
          console.error("Somthing went wrong with adding the post!");
        });
    }
  }
  return (
    <div>
      <Form
        onSave={handleAddPost}
        ref={addPostForm}
        className={`m-2 flex w-96 min-w-80 flex-col gap-7 rounded-md px-3 py-7 shadow-2xl ${darkClassess}`}
      >
        <CustomInput
          label="شماره تماس"
          placeholder="لطفاً شماره تماس خود را وارد کنید"
          id="phone"
          type="number"
          className="w-full"
          isRequired
        />
        <CustomInput
          label="آدرس"
          placeholder="لطفاً آدرس دقیق ملک را وارد کنید"
          id="address"
          type="text"
          className="w-full"
          isRequired
        />
        <Textarea
          classNames={{
            label: "right-0 text-lg",
          }}
          variant="bordered"
          label="توضیحات"
          placeholder="لطفاً توضیحات مورد نظر خود را وارد کنید"
          id="description"
          name="description"
          labelPlacement="outside"
          className="col-span-12 -mt-4 mb-6 w-full md:col-span-6 md:mb-0"
        />
        <Button
          type="submit"
          color="primary"
          className="w-full text-medium font-bold"
        >
          ثبت
        </Button>
      </Form>
    </div>
  );
};

export default AddPostForm;
