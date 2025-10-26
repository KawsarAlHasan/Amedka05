import { Button } from "antd";
import React from "react";
import { FaDiscord } from "react-icons/fa";

const VITE_DISCORD_CALLBACK = import.meta.env.VITE_DISCORD_CALLBACK;

function DiscordAuth() {
  const clientId = "1416113786724548620";

  const redirectUri = encodeURIComponent(VITE_DISCORD_CALLBACK);

  const scope = encodeURIComponent("identify email");

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

  return (
    <div>
      <Button
        color="default"
        className="text-center w-full !py-5 !font-semibold !rounded-full"
        href={discordAuthUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaDiscord size={20} /> Sign in with Discord
      </Button>
    </div>
  );
}

export default DiscordAuth;
