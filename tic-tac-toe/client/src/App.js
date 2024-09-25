import { useState } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import Joingame from "./components/joingame/Joingame";
import { Chat } from "stream-chat-react";

function App() {
  const api_key = "37ggxk6j4vus";
  const cookies = new Cookies();

  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("username");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        // console.log(user);
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <Joingame />
          <button onClick={logout}>Logout</button>
        </Chat>
      ) : (
        <>
          <Register setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
