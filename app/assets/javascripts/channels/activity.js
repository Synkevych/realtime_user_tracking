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
    
    let userId = data.user_id;
    let eventType = data.status;

    setTimeout(() => {
      if (eventType == 'online'){
        document.getElementById(userId).style.borderColor = "#8eff00";
        document.querySelector(`#${userId} div:last-child`).style.backgroundColor = "#8eff00";
      } else {
        document.getElementById(userId).style.borderColor = "#efefef";
        document.querySelector(`${userId}:last-child`).style.backgroundColor = "#efefef";
      }
    }, 800);
    
  },

});
