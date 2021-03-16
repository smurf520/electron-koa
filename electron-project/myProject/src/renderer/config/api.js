// const baseUrl = 'http://39.106.192.104:8080/api'; // 服务器地址
const baseUrl = 'http://localhost:8080/api'; // 本地服务器地址
export default {
  LOGIN: `${baseUrl}/login`,
  REGISTER: `${baseUrl}/register`,
  INSERTFILES: `${baseUrl}/insertFiles`,
  GETFILES: `${baseUrl}/getFiles`,
  UPDATEFILES: `${baseUrl}/updateFiles`,
  UPDATEFILENAME: `${baseUrl}/updateFileName`,
  DELITEM: `${baseUrl}/deleteItem`,
};
