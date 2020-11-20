class User < ApplicationRecord
  DEFAULT_TIME = 5*60

  before_create do
    self.last_seen_at = Time.now.to_i unless self.last_seen_at
    self.emoji = rand(62) unless self.emoji
    self.visits = 1 unless self.visits
  end

  scope :filter_by_online, -> { order('last_seen_at').reverse_order }
  scope :online, -> { where("last_seen_at > ?", Time.now.to_i - DEFAULT_TIME) }
  
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

  self.per_page = 8
end
