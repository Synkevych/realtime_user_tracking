App.activity = App.cable.subscriptions.create("ActivityChannel", {

  connected: function() {
    this.perform("appear");
  },
  
  unsubscribed: function() {
    this.perform("unsubscribed");
  },

  appear: function(){
  },

  received: function(data) {
    
    let eventType = data.status;
    let onlineUsers = data.users;
    console.log("all users",onlineUsers);
    
    setTimeout(() => {
      onlineUsers.forEach(user => {
      if (user.online && eventType == 'online'){
        this.change_counter(onlineUsers.length, true);
        this.change_card_style(user.name, "#8eff00", "Online")
        }
      else if (document.querySelector(`#${user.name} div:last-child a`).text == 'Online') {
        this.change_counter(onlineUsers.length, false);
        this.change_card_style(user.name, "#efefef", "Offline")
        }
      });
    }, 1000);
    
  },

  change_counter(score, userAdded){
    const oldScore = Number(document.querySelector(`div #user_counter`).innerHTML);
    const newScore = userAdded ? score : oldScore - 1;
    document.querySelector(`div #user_counter`).innerHTML = newScore;
  },

  change_card_style(userName, color, status){
    document.getElementById(userName).style.borderColor = color;
    document.querySelector(`#${userName} div:last-child`).style.backgroundColor = color;
    document.querySelector(`#${userName} div:last-child a`).innerHTML = status;
  }

});
