let token = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export const config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};
