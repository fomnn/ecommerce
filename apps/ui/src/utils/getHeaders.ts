export default () => {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", `bearer ${token}`);

  return headers;
};
