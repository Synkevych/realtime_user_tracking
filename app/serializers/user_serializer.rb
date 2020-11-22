class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :ip_address, :device, :emoji, :last_seen_at, :visits, :online
end
