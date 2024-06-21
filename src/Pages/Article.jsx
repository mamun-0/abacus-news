import axios from "axios";
import { AddArticle } from "../components/Forms/AddArticle";
import { Heading } from "../components/Heading/Heading";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>Add Article</title>
      </Helmet>
      <Heading title="Create An Article" />
      <AddArticle uploadPhoto={uploadPhoto} />
    </div>
  );
}
