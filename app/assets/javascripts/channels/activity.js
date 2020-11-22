App.activity = App.cable.subscriptions.create("ActivityChannel", {

  connected: function(data) {
    this.perform("appear")
  },

  disconnected: function() {
    this.perform("away");
  },

  appear: function(){
  },

  away: function() {
  },

  received: function(data) {
    
    let userName = data.user_name;
    let eventType = data.status;

    setTimeout(() => {
      if (eventType == 'online'){
        document.getElementById(userName).style.borderColor = "#8eff00";
        document.querySelector(`#${userName} div:last-child`).style.backgroundColor = "#8eff00";
        document.querySelector(`#${userName} div:last-child a`).innerHTML = "Online";
      } else {
        document.getElementById(userName).style.borderColor = "#efefef";
        document.querySelector(`${userName}:last-child`).style.backgroundColor = "#efefef";
        document.querySelector(`#${userName} div:last-child a`).innerHTML = "Offline";
      }
    }, 100);
    
  },

});
