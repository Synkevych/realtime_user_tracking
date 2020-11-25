class ActivityChannel < ApplicationCable::Channel

  def subscribed
    stream_from "activity_channel"
  end
 
  def unsubscribed
    current_user.away
    current_user.update(online: false)
    ActionCable.server.broadcast "activity_channel", status: 'offline', users: User.all.offline
  end
  
  def appear
    current_user.appear
    current_user.update(online: true)
    ActionCable.server.broadcast "activity_channel", status: 'online', users: User.all.online
  end
end
