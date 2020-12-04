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
    self.update(visits: self.visits+1, last_seen_at: Time.now.to_i)
  end

  def appear
    self.update(online: true)
    users_param = User.all.online.reduce([]) { |s, u| s.push(name: u.name, online: u.online) }
    ActionCable.server.broadcast "activity_channel", status: 'online', users: users_param
  end
  
  def away
    self.update(online: false, last_seen_at: Time.now.to_i)
    users_param = User.all.offline.reduce([]) { |s, u| s.push(name: u.name, online: u.online) }
    ActionCable.server.broadcast "activity_channel", status: 'offline', users: users_param
  end

  self.per_page = 16
end
