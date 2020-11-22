App.activity = App.cable.subscriptions.create("ActivityChannel", {

  connected: function() {
    this.perform("appear")
  },

  disconnected: function() {
    document.location.reload();
  },

  appear: function(){
  },

  received: function(data) {
    
    let userName = data.user_name;
    let eventType = data.status;

    setTimeout(() => {
      if (eventType == 'online'){
        this.change_counter(+1)
        document.getElementById(userName).style.borderColor = "#8eff00";
        document.querySelector(`#${userName} div:last-child`).style.backgroundColor = "#8eff00";
        document.querySelector(`#${userName} div:last-child a`).innerHTML = "Online";
        
      } else {
        this.change_counter(-1);
        document.getElementById(userName).style.borderColor = "#efefef";
        document.querySelector(`#${userName} div:last-child`).style.backgroundColor = "#efefef";
        document.querySelector(`#${userName} div:last-child a`).innerHTML = "Offline";
      }
    }, 1000);
    
  },

  change_counter(new_score){
    let old_score = Number(document.querySelector(`div #user_counter`).innerHTML);
      document.querySelector(`div #user_counter`).innerHTML = old_score + new_score;
  }

});
