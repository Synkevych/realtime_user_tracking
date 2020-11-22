class ActivityChannel < ApplicationCable::Channel
  def subscribed
    stream_from "activity_channel"
  end
 
  def unsubscribed
    current_user.away
  end
 
  def appear
     ActionCable.server.broadcast "activity_channel", user_name: current_user.name, status: 'online'
  end
 
  def away
     ActionCable.server.broadcast "activity_channel", user_name: current_user.name, status: 'offline'
  end
end
