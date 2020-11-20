import React from 'react';

const emojis = ['🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩'];
const date_in_seconds = Date.now()/1000;

const Header = (props) => {
  const {name, ip_address, device, emoji, last_seen_at, visits} = props.attributes;

  return (
    <div className="wrapper">
      <h1><p>{emojis[emoji]}</p></h1>
      <div>
        <div className="userName">User Name: {name}</div>
        <div className="totalViews">Visits: {visits}</div>
        <div className="UserIp">IP-address: {ip_address}</div>
        <div className="UserDevice">Device: {device}</div>
      </div>
    </div>
  )
}

export default Header;
