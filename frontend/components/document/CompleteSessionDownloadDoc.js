import { saveAs } from "file-saver";
import axios from "axios";

export const CompleteSessionDownloadDocHandal = async (fileName) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/complete-session/document/${fileName}`,
    { responseType: "arraybuffer" }
  );

  const file = new Blob([Buffer.from(response.data, "binary")], {
    type: "image/png",
  });
  saveAs(file, fileName);
};
