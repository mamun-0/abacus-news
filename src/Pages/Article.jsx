import axios from "axios";
import { AddArticle } from "../components/Forms/AddArticle";
import { Heading } from "../components/Heading/Heading";

export function Article() {
  async function uploadPhoto(payload) {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
      payload
    );
    return data.data;
  }
  return (
    <div>
      <Heading title="Create An Article" />
      <AddArticle uploadPhoto={uploadPhoto} />
    </div>
  );
}
