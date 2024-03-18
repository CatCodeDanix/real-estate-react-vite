/* eslint-disable tailwindcss/enforces-shorthand */
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../contexts/PostsContext";
import { Post } from "../components/AddPostForm";
import Map from "../components/Map";
import EditPostModal from "../components/EditPostModal";

const PostDetails = () => {
  const { posts, deletePost } = usePosts();
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const post: Post = posts.find((post) => post.id == id)!;

  async function handleDelete() {
    const res = confirm("آیا از حذف آگهی اطمینان دارید؟");
    if (res) {
      await deletePost(id!);
      navigate("/app");
    }
  }

  return (
    <>
      <article className="relative z-[1] w-[600px] overflow-hidden rounded-xl shadow-2xl">
        <div className="w-full">
          <img src="/images/bg.jpg" alt="a house to sell" className="w-full" />
        </div>
        <div className=" flex flex-1 flex-col flex-wrap items-center justify-between">
          <div className="w-full">
            <Map
              withMarker={true}
              position={[post.position.lat, post.position.lng]}
              className="h-44 w-full rounded-md"
            />
          </div>
          <Table
            hideHeader
            removeWrapper
            isStriped
            aria-label="details of the property"
            className="w-full rounded-t-none"
          >
            <TableHeader>
              <TableColumn>ردیف</TableColumn>
              <TableColumn>اطلاعات</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>شماره تماس</TableCell>
                <TableCell>{post.phone}</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>آدرس</TableCell>
                <TableCell>{post.address}</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>توضیحات</TableCell>
                <TableCell>{post.description ?? "ندارد"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-stretch">
          <Button
            color="warning"
            className="flex-1 rounded-l-none rounded-t-none"
            onPress={onOpen}
          >
            ویرایش
          </Button>
          <Button
            onClick={handleDelete}
            color="danger"
            className="flex-1 rounded-r-none rounded-t-none"
          >
            حذف
          </Button>
        </div>
      </article>
      <EditPostModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default PostDetails;
