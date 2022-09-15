import axios from "axios";
export async function History( stocks,price, userId, idpurchase) {

  const PATH = "http://localhost:3001"

  const result = await axios({
    method: "post",
    url: `${PATH}/orders`,
    data: { stocks,price, userId, idpurchase}, // email
    headers: { "X-Requested-With": "XMLHttpRequest" },
    withCredentials: true,
  }).then((e) => e.data);

  return result;
}
