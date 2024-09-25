import React, { useState } from "react";
import Board from "../board/Board";
import {
  Window,
  MentionsList,
  MessageInput,
  MessageList,
} from "stream-chat-react";
import "./Chat.css";

function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count);
  });

  if (!playersJoined) {
    return <div>Waiting for other player to Join....</div>;
  }
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      ></button>
      {result.state === "won" && <div>{result.winner} Won the Game</div>}
      {result.state === "tie" && <div>Game Tied</div>}
    </div>
  );
}

export default Game;
