import { useRef } from "react";
import CustomInput from "./CustomInput";
import Form, { type FormHandle } from "./Form";
import { Textarea, Button, ButtonGroup } from "@nextui-org/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { usePosts } from "../contexts/PostsContext";
import { useTheme } from "../contexts/ThemeContext";
import Map from "./Map";
import { type FormData, type Post } from "./AddPostForm";

interface EditPostFormProps {
  onClose: () => void;
}

const EditPostForm = ({ onClose }: EditPostFormProps) => {
  const editPostForm = useRef<FormHandle>(null);

  const params = useParams();
  const [searchParams] = useSearchParams();
  const { posts, editPost } = usePosts();
  const { theme } = useTheme();
  const navigate = useNavigate();

  console.log("poooosts is:   ");
  console.log(posts);

  const post: Post = posts.find((post) => post.id == params.id)!;

  const darkClassess = theme === "dark" ? "border-3 border-blue-600" : "";

  function handleEditPost(newFormData: unknown) {
    const formData = newFormData as FormData;
    const lat = searchParams.get("lat") ?? post.position.lat;
    const lng = searchParams.get("lng") ?? post.position.lng;
    const newPostData: Post = {
      ...formData,
      userId: post.userId,
      position: { lat: +lat, lng: +lng },
      id: post.id,
    };

    editPost(newPostData)
      .then(() => {
        console.log("Post was edited successfuly!");
        navigate(-1);
      })
      .catch(() => {
        console.log("Something went wrong with editing the post!");
      });
  }

  return (
    <div>
      <Form
        onSave={handleEditPost}
        ref={editPostForm}
        className={`flex w-full min-w-80 flex-col gap-7 rounded-md pt-4 ${darkClassess}`}
      >
        <CustomInput
          label="شماره تماس"
          placeholder="لطفاً شماره تماس خود را وارد کنید"
          id="phone"
          type="number"
          className="w-full"
          isRequired
          defaultValue={post.phone}
        />
        <CustomInput
          label="آدرس"
          placeholder="لطفاً آدرس دقیق ملک را وارد کنید"
          id="address"
          type="text"
          className="w-full"
          isRequired
          defaultValue={post.address}
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
          defaultValue={post.description}
        />
        <Map
          withMarker={true}
          editMode={true}
          position={[post.position.lat, post.position.lng]}
          className="h-[300px] w-[400px]"
        />
        <div className="w-full">
          <ButtonGroup className="flex w-full items-center justify-stretch">
            <Button
              color="danger"
              variant="bordered"
              onPress={onClose}
              className="flex-1"
            >
              بستن
            </Button>
            <Button
              type="submit"
              color="primary"
              className="flex-1 text-medium font-bold"
            >
              ثبت
            </Button>
          </ButtonGroup>
        </div>
      </Form>
    </div>
  );
};

export default EditPostForm;
