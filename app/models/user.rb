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

  scope :filter_by_online, -> { order('last_seen_at').reverse_order }
  scope :online, -> { where(online: true) }
  scope :offline, -> { where(online: false) }
  
  def update_visits
    user_online? ? self.visits = self.visits + 1 : self.visits
  end

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
    ActionCable.server.broadcast "activity_channel", status: 'online', users: User.all.online
  end

  def away
    self.update(online: false)
    ActionCable.server.broadcast "activity_channel", status: 'offline', users: User.all.offline
  end

  self.per_page = 16
end
