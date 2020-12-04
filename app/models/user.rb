class User < ApplicationRecord
  DEFAULT_TIME = 5*60

  before_create do
    self.last_seen_at = Time.now.to_i unless self.last_seen_at
    self.emoji = rand(62) unless self.emoji
    self.visits = 1 unless self.visits
  end
  
  validates :name, presence: true, length: { minimum: 3 }
  validates :ip_address, presence: true
  validates :device, presence: true

  scope :filter_by_last_seen, -> { order('last_seen_at').reverse_order }
  scope :online, -> { where(online: true) }
  scope :offline, -> { where(online: false) }
  
  def refresh_activity
    visits = user_online? ? self.visits + 1 :  self.visits
    self.update(visits: visits, last_seen_at: Time.now.to_i)
  end
  
  # if the user was on the page more than five minutes ago update visits
  def user_online?
    last_visit = self.last_seen_at + DEFAULT_TIME
    if Time.now.to_i >= last_visit
     true
    else
     false
    end
  end

  def appear
    self.update(online: true)
    users_param =[{ name: self.name }]
    ActionCable.server.broadcast "activity_channel", status: 'online', users: users_param
  end
  
  def away
    self.update(online: false, last_seen_at: Time.now.to_i)
    users_param = [{ name: self.name, away: self.last_seen_at }]
    ActionCable.server.broadcast "activity_channel", status: 'offline', users: users_param
  end

  self.per_page = 16
end
