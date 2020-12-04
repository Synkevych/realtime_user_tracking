App.activity = App.cable.subscriptions.create("ActivityChannel", {

  connected: function() {
    this.perform("appear");
  },
  
  unsubscribed: function() {
    this.perform("unsubscribed");
  },

  received: function(data) {
    
    let eventType = data.status;
    let onlineUsers = data.users;
    // We need a timeout due to waiting for a full page load
    setTimeout(() => {  
      onlineUsers.forEach(user => {
        console.log("user:", user.name, "has status: ", eventType, "all data: ", data);
      if (eventType == 'online'){
        // if user is new and not present on the page
        if (document.getElementById(user.name) == null){
          location.reload()
        }
        this.change_card_style(user.name, "#8eff00", "Online")
        document.getElementById(user.name).classList.add('active');
      }
      else if (document.querySelector(`#${user.name} div:last-child a`).text == 'Online') {
        let time_in_words = this.get_time_in_words(Math.round((Date.now()/1000 - user.away)/60), user.away);
        this.change_card_style(user.name, "#efefef", `Last see ${time_in_words} ago` )
        document.getElementById(user.name).classList.remove('active');
      }
      this.change_counter();
      });
    }, 1000);
    
  },

  change_counter(){
    const newScore = document.getElementsByClassName('active').length;
    document.querySelector(`div #user_counter`).innerHTML = newScore;
  },

  change_card_style(userName, color, status){
    document.getElementById(userName).style.borderColor = color;
    document.querySelector(`#${userName} div:last-child`).style.backgroundColor = color;
    document.querySelector(`#${userName} div:last-child a`).innerHTML = status;
  },

  get_time_in_words(time, last_seen_at){
    if (time == 0)
      return  Math.round(Date.now()/1000 - last_seen_at) + " sec";
    else if (time < 60)
      return time + " min"
    else if (time < 60 * 24)
      return Math.round(time / 60) + " h";
    else if (time < (60 * 24 * 7))
      return Math.round(time / (60 * 24) ) + " d";
    else {
      return "long time";
    }
  }

});
