class ActivityChannel < ApplicationCable::Channel

  def subscribed
    stream_from "activity_channel"
  end
 
  def unsubscribed
    current_user.update(online: true)
    current_user.away
    ActionCable.server.broadcast "activity_channel", status: 'offline', users: User.all.offline
  end
  
  def appear
    current_user.update(online: false)
    current_user.appear
    ActionCable.server.broadcast "activity_channel", status: 'online', users: User.all.online
  end
end
