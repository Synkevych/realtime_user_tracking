class ActivityChannel < ApplicationCable::Channel

  def subscribed
    stream_from "activity_channel"
  end
 
  def unsubscribed
    current_user.away
  end
  
  def appear
    current_user.appear
  end
end
